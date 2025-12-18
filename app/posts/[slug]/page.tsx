// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import type { Post } from '@/types'

export async function generateStaticParams() {
  const posts = await getAllPosts() as Post[]
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Tech Insights Blog`,
    description: post.metadata?.excerpt || post.title,
  }
}

export const revalidate = 60

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const publishedDate = post.metadata?.published_date
  const content = post.metadata?.content

  return (
    <article className="py-16 container-custom">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block text-primary hover:text-primary/80 font-medium mb-4"
          >
            ← Back to {category.title}
          </Link>
        )}
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:text-primary"
            >
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.title}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span className="font-medium">{author.title}</span>
            </Link>
          )}
          {publishedDate && (
            <time className="text-sm">
              {new Date(publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {category.title}
            </Link>
          )}
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        )}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        {content && (
          <div className="prose-custom">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {/* Author Bio */}
        {author && (
          <div className="mt-16 p-8 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-4">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={author.title}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">About {author.title}</h3>
                {author.metadata?.bio && (
                  <p className="text-gray-600 mb-4">{author.metadata.bio}</p>
                )}
                <Link
                  href={`/authors/${author.slug}`}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  View all posts by {author.title} →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}