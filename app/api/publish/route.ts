import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCommits, filterCommits } from '@/lib/github'
import { rewriteCommits } from '@/lib/ai'
import { postTweet } from '@/lib/twitter'

export async function POST(request: NextRequest) {
  try {
    const { repoId } = await request.json()

    const repo = await prisma.repo.findUnique({
      where: { id: repoId },
      include: { user: true },
    })

    if (!repo) {
      return NextResponse.json({ error: 'Repo not found' }, { status: 404 })
    }

    if (!repo.githubToken || !repo.user.twitterToken) {
      return NextResponse.json(
        { error: 'GitHub or Twitter not connected' },
        { status: 400 }
      )
    }

    // Get recent commits
    const commits = await getCommits(
      repo.githubToken,
      repo.owner,
      repo.name,
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    )

    const filteredCommits = filterCommits(commits)

    if (filteredCommits.length === 0) {
      return NextResponse.json({ error: 'No commits to publish' }, { status: 400 })
    }

    // Get schedule for language/tone or use defaults
    const schedule = await prisma.schedule.findFirst({
      where: { repoId, enabled: true },
    })

    const tweetContent = await rewriteCommits({
      commits: filteredCommits.map((c) => c.message),
      language: (schedule?.language || 'en') as 'zh' | 'en' | 'ja',
      tone: (schedule?.tone || 'friendly') as 'professional' | 'friendly' | 'humor',
    })

    const result = await postTweet(
      repo.user.twitterToken,
      repo.user.twitterSecret!,
      tweetContent
    )

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      content: tweetContent,
      tweetId: result.tweetId,
    })
  } catch (error) {
    console.error('Publish error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
