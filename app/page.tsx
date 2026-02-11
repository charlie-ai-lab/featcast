import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🚀 FeatCast
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Turn your GitHub commits into user-friendly product updates. 
            Automatically post to X/Twitter on your schedule.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started →
            </Link>
            <a 
              href="https://github.com"
              className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="font-semibold mb-2">AI Rewriting</h3>
            <p className="text-gray-600 text-sm">Transform technical commits into user-friendly updates</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="font-semibold mb-2">X Integration</h3>
            <p className="text-gray-600 text-sm">Connect your X account for automatic publishing</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="font-semibold mb-2">Scheduled</h3>
            <p className="text-gray-600 text-sm">Set your preferred publishing schedule</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="font-semibold mb-2">Multi-language</h3>
            <p className="text-gray-600 text-sm">Support for Chinese, English, Japanese and more</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-blue-600">1</div>
              <h3 className="font-semibold mb-2">Connect Repos</h3>
              <p className="text-gray-600 text-sm">Link your GitHub repository with OAuth or PAT</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-blue-600">2</div>
              <h3 className="font-semibold mb-2">Set Schedule</h3>
              <p className="text-gray-600 text-sm">Choose when to publish your updates</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-blue-600">3</div>
              <h3 className="font-semibold mb-2">Auto-Publish</h3>
              <p className="text-gray-600 text-sm">AI transforms commits and posts automatically</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
