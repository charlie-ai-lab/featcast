export interface PostOptions {
  content: string
  imageUrl?: string
  topics?: string[]
}

export interface PostResult {
  success: boolean
  postId?: string
  url?: string
  error?: string
}

export interface PlatformAccount {
  id: string
  platform: string
  accessToken: string
  refreshToken?: string
  expiresAt?: Date
}

export abstract class Platform {
  protected account: PlatformAccount
  
  constructor(account: PlatformAccount) {
    this.account = account
  }
  
  // 发布内容
  abstract post(options: PostOptions): Promise<PostResult>
  
  // 获取发布状态
  abstract getStatus(postId: string): Promise<{ status: string; url?: string }>
  
  // 删除内容
  abstract delete(postId: string): Promise<boolean>
  
  // 获取用户信息
  abstract getUserInfo(): Promise<{ id: string; username: string; displayName: string }>
}

// 工厂函数
export function createPlatform(type: string, account: PlatformAccount): Platform {
  switch (type) {
    case 'twitter':
      return new (require('./twitter').TwitterPlatform)(account)
    case 'xiaohongshu':
      return new (require('./xiaohongshu').XiaohongshuPlatform)(account)
    case 'wechat':
      return new (require('./wechat').WeChatPlatform)(account)
    default:
      throw new Error(`Unknown platform: ${type}`)
  }
}
