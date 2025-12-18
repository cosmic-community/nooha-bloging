// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import type { Author, Post } from '@/types'

export async function generateStaticParams() {
  const authors = await getAllAuthors() as Author[]
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.title} - Tech Insights Blog`,
    description: author.metadata?.bio || `Posts by ${author.title}`,
  }
}

export const revalidate = 60

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]
  const profilePhoto = author.metadata?.profile_photo
  const bio = author.metadata?.bio
  const email = author.metadata?.email
  const twitter = author.metadata?.twitter
  const linkedin = author.metadata?.linkedin

  return (
    <div className="py-16 container-custom">
      {/* Author Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          {profilePhoto && (
            <img
              src={`${profilePhoto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={author.title}
              width={160}
              height={160}
              className="rounded-full shadow-lg"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {author.title}
            </h1>
            {bio && (
              <p className="text-xl text-gray-600 mb-6">{bio}</p>
            )}
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Email
                </a>
              )}
              {twitter && (
                <a
                  href={`https://twitter.com/${twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Twitter
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-3xl font-bold mb-8">
          Posts by {author.title}
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              {author.title} hasn't published any posts yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
}