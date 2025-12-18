import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Tech Insights
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              href="/posts"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/categories"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/authors"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Authors
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}