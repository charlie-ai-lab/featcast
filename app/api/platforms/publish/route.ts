import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createPlatform } from '@/lib/platforms'

export async function POST(request: NextRequest) {
  try {
    const { userId, repoId, content, platform, imageUrl, topics } = await request.json()
    
    const account = await prisma.platformAccount.findUnique({
      where: { userId_platform: { userId, platform } }
    })
    
    if (!account) {
      return NextResponse.json({ error: 'Platform not connected' }, { status: 400 })
    }
    
    const platformInstance = createPlatform(platform, {
      id: account.id,
      platform,
      accessToken: account.accessToken,
      refreshToken: account.refreshToken || undefined,
      expiresAt: account.expiresAt || undefined,
    })
    
    const result = await platformInstance.post({ content, imageUrl, topics })
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    
    await prisma.post.create({
      data: {
        repoId, content, imageUrl, platform,
        platformPostId: result.postId,
        platformUrl: result.url,
        status: 'published',
        publishedAt: new Date(),
      },
    })
    
    return NextResponse.json({ success: true, postId: result.postId, url: result.url })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
