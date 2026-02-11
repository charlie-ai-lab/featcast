import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface RewriteOptions {
  commits: string[]
  language: 'zh' | 'en' | 'ja'
  tone: 'professional' | 'friendly' | 'humor'
}

export async function rewriteCommits(options: RewriteOptions): Promise<string> {
  const { commits, language, tone } = options
  
  const languageMap = {
    zh: '中文',
    en: 'English',
    ja: '日本語',
  }
  
  const toneMap = {
    professional: '专业但易懂',
    friendly: '亲切友好',
    humor: '轻松幽默',
  }
  
  const prompt = `
你是产品营销专家。请把以下GitHub commits改写成用户友好的社交媒体推文：

${commits.map((c, i) => `${i + 1}. ${c}`).join('\n')}

要求：
- 语言：${languageMap[language]}
- 语气：${toneMap[tone]}
- 突出产品价值，而非技术细节
- 80字以内（Twitter限制）
- 不要使用编号列表
- 不要提及技术术语如commit、PR、merge等

直接输出改写后的推文，不要其他内容。
`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: '你是一个专业的产品营销专家，擅长把技术更新转化为用户能理解的语言。',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 200,
  })

  return completion.choices[0]?.message?.content || 'Failed to generate tweet'
}

export async function generateImage(prompt: string): Promise<string | null> {
  // Optional: Generate image using DALL-E or similar
  // For MVP, skip image generation
  return null
}
