import { Platform, PostOptions, PostResult, PlatformAccount } from './base'

interface XiaohongshuToken {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

interface XiaohongshuNote {
  note_id: string
  title: string
  desc: string
  images: string[]
}

export class XiaohongshuPlatform extends Platform {
  private baseUrl = 'https://api.xiaohongshu.com'
  
  constructor(account: PlatformAccount) {
    super(account)
  }
  
  private async getToken(): Promise<string> {
    // 检查token是否过期
    if (this.account.expiresAt && new Date() > this.account.expiresAt) {
      // 刷新token
      const refreshed = await this.refreshToken()
      if (!refreshed) {
        throw new Error('Token expired and refresh failed')
      }
    }
    return this.account.accessToken
  }
  
  private async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch('https://api.xiaohongshu.com/oauth/refresh_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.XIAOHONGSHU_CLIENT_ID,
          client_secret: process.env.XIAOHONGSHU_CLIENT_SECRET,
          refresh_token: this.account.refreshToken,
        }),
      })
      
      if (!response.ok) return false
      
      const data: XiaohongshuToken = await response.json()
      this.account.accessToken = data.access_token
      this.account.refreshToken = data.refresh_token
      this.account.expiresAt = new Date(Date.now() + data.expires_in * 1000)
      
      return true
    } catch {
      return false
    }
  }
  
  async post(options: PostOptions): Promise<PostResult> {
    try {
      const token = await this.getToken()
      
      // 1. 先上传图片获取image_id
      let imageId: string | undefined
      if (options.imageUrl) {
        const uploadResult = await this.uploadImage(options.imageUrl)
        if (uploadResult.success) {
          imageId = uploadResult.postId
        }
      }
      
      // 2. 创建笔记
      const response = await fetch(`${this.baseUrl}/api/sns/web/v1/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: options.content.slice(0, 20), // 小红书标题
          desc: options.content,
          image_ids: imageId ? [imageId] : [],
          topics: options.topics?.map(t => ({ name: t })),
        }),
      })
      
      if (!response.ok) {
        const error = await response.text()
        return { success: false, error }
      }
      
      const data = await response.json()
      
      return {
        success: true,
        postId: data.data?.note_id,
        url: `https://www.xiaohongshu.com/explore/${data.data?.note_id}`,
      }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }
  
  private async uploadImage(imageUrl: string): Promise<PostResult> {
    // 下载图片
    const imageRes = await fetch(imageUrl)
    const buffer = await imageRes.arrayBuffer()
    
    // 上传到小红书
    const formData = new FormData()
    formData.append('file', Buffer.from(buffer), 'image.jpg')
    
    const response = await fetch(`${this.baseUrl}/api/sns/web/v1/media/upload/image`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${await this.getToken()}` },
      body: formData,
    })
    
    if (!response.ok) {
      return { success: false, error: await response.text() }
    }
    
    const data = await response.json()
    return { success: true, postId: data.data?.image_id }
  }
  
  async getStatus(postId: string): Promise<{ status: string; url?: string }> {
    const token = await this.getToken()
    
    const response = await fetch(`${this.baseUrl}/api/sns/web/v1/media/detail?note_id=${postId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    
    if (!response.ok) {
      return { status: 'unknown' }
    }
    
    const data = await response.json()
    return {
      status: data.data?.status || 'unknown',
      url: `https://www.xiaohongshu.com/explore/${postId}`,
    }
  }
  
  async delete(postId: string): Promise<boolean> {
    // 小红书API可能不支持删除
    return false
  }
  
  async getUserInfo(): Promise<{ id: string; username: string; displayName: string }> {
    const token = await this.getToken()
    
    const response = await fetch(`${this.baseUrl}/api/sns/web/v1/user/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    
    if (!response.ok) {
      throw new Error('Failed to get user info')
    }
    
    const data = await response.json()
    return {
      id: data.data?.user_id,
      username: data.data?.nickname,
      displayName: data.data?.nickname,
    }
  }
  
  // OAuth URL生成
  static getOAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: process.env.XIAOHONGSHU_CLIENT_ID || '',
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/xiaohongshu/callback`,
      response_type: 'code',
      scope: 'media,user',
      state,
    })
    
    return `https://api.xiaohongshu.com/oauth/authorize?${params.toString()}`
  }
  
  // OAuth token交换
  static async exchangeCode(code: string): Promise<XiaohongshuToken> {
    const response = await fetch('https://api.xiaohongshu.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.XIAOHONGSHU_CLIENT_ID,
        client_secret: process.env.XIAOHONGSHU_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to exchange code')
    }
    
    return response.json()
  }
}
