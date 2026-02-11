import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { XiaohongshuPlatform } from '@/lib/platforms/xiaohongshu'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const platform = searchParams.get('platform')
  const state = searchParams.get('state')
  
  if (!platform || !state) {
    return NextResponse.json({ error: 'Missing platform or state' }, { status: 400 })
  }
  
  if (platform === 'xiaohongshu') {
    const oauthUrl = XiaohongshuPlatform.getOAuthUrl(state)
    return NextResponse.redirect(new URL(oauthUrl, request.url))
  }
  
  return NextResponse.json({ error: `Unsupported platform: ${platform}` }, { status: 400 })
}

export async function POST(request: NextRequest) {
  try {
    const { userId, platform, accessToken, refreshToken, expiresAt } = await request.json()
    
    await prisma.platformAccount.upsert({
      where: { userId_platform: { userId, platform } },
      create: { userId, platform, accessToken, refreshToken, expiresAt: expiresAt ? new Date(expiresAt) : null },
      update: { accessToken, refreshToken, expiresAt: expiresAt ? new Date(expiresAt) : null },
    })
    
    return NextResponse.json({ success: true, platform })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
