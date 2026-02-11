import Link from 'next/link'

// Mock data for demo
const mockRepos = [
  { id: '1', name: 'my-awesome-app', fullName: 'user/my-awesome-app', schedules: 1 },
  { id: '2', name: 'side-project', fullName: 'user/side-project', schedules: 0 },
]

const mockPosts = [
  { id: '1', content: '🚀 Just shipped dark mode support! Your eyes will thank you.', status: 'published', createdAt: '2024-02-10' },
  { id: '2', content: '⚡ Major performance update - 50% faster load times!', status: 'published', createdAt: '2024-02-08' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FeatCast Dashboard</h1>
          <Link 
            href="/settings"
            className="text-blue-600 hover:text-blue-700"
          >
            Settings →
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{mockRepos.length}</div>
            <div className="text-gray-600">Connected Repos</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600">{mockPosts.length}</div>
            <div className="text-gray-600">Posts Published</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-purple-600">2</div>
            <div className="text-gray-600">Active Schedules</div>
          </div>
        </div>

        {/* Repos */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Repositories</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
              + Add Repo
            </button>
          </div>
          <div className="divide-y">
            {mockRepos.map((repo) => (
              <div key={repo.id} className="px-6 py-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{repo.fullName}</div>
                  <div className="text-sm text-gray-500">
                    {repo.schedules > 0 ? `${repo.schedules} schedule(s) active` : 'No schedule yet'}
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Configure →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Posts</h2>
          </div>
          <div className="divide-y">
            {mockPosts.map((post) => (
              <div key={post.id} className="px-6 py-4">
                <div className="text-gray-800 mb-2">{post.content}</div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{post.status}</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
