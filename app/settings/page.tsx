import Link from 'next/link'

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* GitHub Connection */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">🔗 GitHub Connection</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-medium">GitHub Account</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
              <a
                href="/api/auth/github"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
              >
                Connect GitHub
              </a>
            </div>
            <p className="text-sm text-gray-500">
              Connect your GitHub account to automatically fetch commits from your repositories.
            </p>
          </div>
        </div>

        {/* Twitter Connection */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">🐦 X/Twitter Connection</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-medium">X Account</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
              <button
                disabled
                className="bg-blue-400 text-white px-4 py-2 rounded-lg text-sm cursor-not-allowed"
              >
                Connect X (Coming Soon)
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Connect your X account to automatically publish product updates.
            </p>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">🤖 AI Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Language</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Default Tone</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="humor">Humor</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
