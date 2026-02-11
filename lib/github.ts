import { Octokit } from 'octokit'

export interface Commit {
  sha: string
  message: string
  author: string
  date: string
}

export async function getCommits(
  token: string,
  owner: string,
  repo: string,
  since?: Date
): Promise<Commit[]> {
  const octokit = new Octokit({ auth: token })
  
  const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo,
    since: since?.toISOString(),
    per_page: 50,
  })

  return response.data.map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message.split('\n')[0], // First line only
    author: commit.commit.author?.name || 'Unknown',
    date: commit.commit.author?.date || '',
  }))
}

export async function getCommitDiff(
  token: string,
  owner: string,
  repo: string,
  sinceSha: string
): Promise<string> {
  const octokit = new Octokit({ auth: token })
  
  const response = await octokit.request('GET /repos/{owner}/{repo}/compare/{base}...{head}', {
    owner,
    repo,
    base: sinceSha,
    head: 'HEAD',
  })

  return response.data.status
}

export function filterCommits(commits: Commit[]): Commit[] {
  return commits.filter((commit) => {
    const message = commit.message.toLowerCase()
    
    // Skip merge commits
    if (message.startsWith('merge')) return false
    if (message.startsWith('pull request')) return false
    
    // Skip common noise
    if (message.startsWith('bump version')) return false
    if (message.startsWith('update lock file')) return false
    if (message.startsWith('fix lint')) return false
    if (message.startsWith('merge branch')) return false
    
    return true
  })
}
