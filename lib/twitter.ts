import { TwitterApi } from 'twitter-api-v2'

export interface TweetResult {
  success: boolean
  tweetId?: string
  error?: string
}

export async function postTweet(
  token: string,
  secret: string,
  content: string,
  mediaId?: string
): Promise<TweetResult> {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_CLIENT_ID!,
      appSecret: process.env.TWITTER_CLIENT_SECRET!,
      accessToken: token,
      accessSecret: secret,
    })

    const tweetPayload: any = {
      text: content,
    }

    if (mediaId) {
      tweetPayload.media = { media_ids: [mediaId] }
    }

    const tweet = await client.v2.tweet(tweetPayload)

    return {
      success: true,
      tweetId: tweet.data.id,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function getTwitterUserId(accessToken: string): Promise<string | null> {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_CLIENT_ID!,
      appSecret: process.env.TWITTER_CLIENT_SECRET!,
      accessToken,
      accessSecret: '', // Not needed for v2 me endpoint
    })

    const me = await client.v2.me()
    return me.data.id
  } catch {
    return null
  }
}
