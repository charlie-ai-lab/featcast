'use client'

import { useState, useEffect } from 'react'

interface PlatformInfo {
  platform: string
  connected: boolean
}

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<PlatformInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlatforms()
  }, [])

  const fetchPlatforms = async () => {
    try {
      const res = await fetch('/api/platforms')
      const data = await res.json()
      setPlatforms(data.platforms || [])
    } catch (error) {
      console.error('Failed to fetch platforms:', error)
    } finally {
      setLoading(false)
    }
  }

  const connectPlatform = (platform: string) => {
    window.location.href = `/api/platforms/connect?platform=${platform}&state=user123`
  }

  const platformList = [
    { id: 'twitter', name: 'X (Twitter)', icon: '🐦', description: '分享技术更新' },
    { id: 'xiaohongshu', name: '小红书', icon: '📕', description: '分享到社区' },
    { id: 'wechat', name: '微信公众号', icon: '📱', description: '发布到微信' },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">平台管理</h1>
      
      {loading ? (
        <p>加载中...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {platformList.map((p) => {
            const connected = platforms.find(pl => pl.platform === p.id)?.connected
            
            return (
              <div key={p.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{p.icon}</span>
                  <h2 className="font-semibold">{p.name}</h2>
                </div>
                <p className="text-gray-600 text-sm mb-4">{p.description}</p>
                {connected ? (
                  <span className="text-green-600">✓ 已连接</span>
                ) : (
                  <button
                    onClick={() => connectPlatform(p.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                  >
                    连接
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
