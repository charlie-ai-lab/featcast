import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'user123'
    
    const accounts = await prisma.platformAccount.findMany({
      where: { userId },
    })
    
    const platforms = [
      { platform: 'twitter', connected: accounts.some(a => a.platform === 'twitter') },
      { platform: 'xiaohongshu', connected: accounts.some(a => a.platform === 'xiaohongshu') },
      { platform: 'wechat', connected: accounts.some(a => a.platform === 'wechat') },
    ]
    
    return NextResponse.json({ platforms })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
