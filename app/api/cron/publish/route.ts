import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCommits, filterCommits } from '@/lib/github'
import { rewriteCommits } from '@/lib/ai'
import { postTweet } from '@/lib/twitter'

export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      where: { enabled: true },
      include: { repo: { include: { user: true } } },
    })

    const results: any[] = []

    for (const schedule of schedules) {
      try {
        const since = schedule.lastRun || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        
        const commits = await getCommits(
          schedule.repo.githubToken!,
          schedule.repo.owner,
          schedule.repo.name,
          since
        )

        const filteredCommits = filterCommits(commits)

        if (filteredCommits.length === 0) {
          results.push({ repo: schedule.repo.fullName, status: 'no_commits' })
          continue
        }

        const tweetContent = await rewriteCommits({
          commits: filteredCommits.map((c) => c.message),
          language: schedule.language as 'zh' | 'en' | 'ja',
          tone: schedule.tone as 'professional' | 'friendly' | 'humor',
        })

        const result = await postTweet(
          schedule.repo.user.twitterToken!,
          schedule.repo.user.twitterSecret!,
          tweetContent
        )

        if (result.success) {
          await prisma.post.create({
            data: {
              repoId: schedule.repo.id,
              scheduleId: schedule.id,
              commitRange: `${filteredCommits[0]?.sha.slice(0, 7)}..${filteredCommits[filteredCommits.length - 1]?.sha.slice(0, 7)}`,
              content: tweetContent,
              tweetId: result.tweetId,
              status: 'published',
              publishedAt: new Date(),
            },
          })

          await prisma.schedule.update({
            where: { id: schedule.id },
            data: { lastRun: new Date() },
          })

          results.push({ repo: schedule.repo.fullName, status: 'published', tweetId: result.tweetId })
        } else {
          results.push({ repo: schedule.repo.fullName, status: 'failed' })
        }
      } catch (error) {
        console.error(`Error: ${schedule.repo.fullName}`, error)
        results.push({ repo: schedule.repo.fullName, status: 'error' })
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
