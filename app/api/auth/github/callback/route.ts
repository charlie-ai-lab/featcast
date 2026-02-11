import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.redirect(new URL('/settings?error=github_auth_failed', request.url))
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    await prisma.user.upsert({
      where: { id: state || userData.id.toString() },
      create: {
        id: state || userData.id.toString(),
        githubId: userData.id.toString(),
        githubToken: tokenData.access_token,
      },
      update: {
        githubId: userData.id.toString(),
        githubToken: tokenData.access_token,
      },
    })

    return NextResponse.redirect(new URL('/dashboard?connected=github', request.url))
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    return NextResponse.redirect(new URL('/settings?error=internal_error', request.url))
  }
}
