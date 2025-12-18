# Tech Insights Blog

![App Preview](https://imgix.cosmicjs.com/beb06910-dbf8-11f0-9977-fd6a0fbba9fe-photo-1517694712202-14dd9538aa97-1766052184344.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, elegant blog platform built with Next.js 16 and powered by Cosmic CMS. Features a clean design, responsive layout, and seamless content management for tech articles, author profiles, and category organization.

## Features

- 📝 **Dynamic Blog Posts** - Full markdown content rendering with featured images and excerpts
- 👤 **Author Profiles** - Dedicated author pages with bios, social links, and article collections
- 🏷️ **Category Navigation** - Browse posts by technology topics with visual category cards
- 📱 **Fully Responsive** - Mobile-first design that adapts to all screen sizes
- 🚀 **Optimized Performance** - Server-side rendering with Next.js 16 for blazing-fast loads
- 🎨 **Modern UI/UX** - Clean, minimalist design with smooth animations and transitions
- 🔍 **SEO Ready** - Proper meta tags, semantic HTML, and structured data
- ♿ **Accessible** - WCAG compliant with proper ARIA labels and keyboard navigation

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6943d0e98e077d184f32f8c1&clone_repository=6943d66d8e077d184f32f90e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a blog with posts, authors, and categories', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router for server-side rendering
- **TypeScript** - Type-safe development with comprehensive interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Cosmic CMS** - Headless CMS for content management and API
- **React Markdown** - Markdown content rendering with proper formatting
- **Imgix** - Image optimization and transformation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with bucket credentials

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Posts with Author and Category

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Posts now include full author and category objects
```

### Getting a Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'post-slug'
  })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Getting Author with Their Posts

```typescript
// First get the author
const { object: author } = await cosmic.objects
  .findOne({
    type: 'authors',
    slug: 'author-slug'
  })
  .props(['id', 'title', 'slug', 'metadata'])

// Then get their posts
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.author': author.id
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with Cosmic CMS using the following content model:

### Posts Object Type
- **Content** (markdown) - Main article content
- **Excerpt** (textarea) - Short description for previews
- **Featured Image** (file) - Hero image for the post
- **Author** (object relation) - Connected to Authors
- **Category** (object relation) - Connected to Categories
- **Published Date** (date) - Publication date

### Authors Object Type
- **Name** (text) - Author's full name
- **Bio** (textarea) - Author biography
- **Profile Photo** (file) - Author profile image
- **Email** (text) - Contact email
- **Twitter** (text) - Twitter handle
- **LinkedIn** (text) - LinkedIn profile URL

### Categories Object Type
- **Name** (text) - Category name
- **Description** (textarea) - Category description
- **Category Image** (file) - Visual representation

The application uses the Cosmic SDK with depth parameter to efficiently load related content in single queries, providing excellent performance.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Environment Variables

Set these in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage with featured posts
│   ├── posts/
│   │   ├── page.tsx        # All posts listing
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post page
│   ├── authors/
│   │   ├── page.tsx        # All authors listing
│   │   └── [slug]/
│   │       └── page.tsx    # Author profile page
│   └── categories/
│       ├── page.tsx        # All categories listing
│       └── [slug]/
│           └── page.tsx    # Category posts page
├── components/
│   ├── Header.tsx          # Site header with navigation
│   ├── Footer.tsx          # Site footer
│   ├── PostCard.tsx        # Post preview card
│   ├── AuthorCard.tsx      # Author preview card
│   ├── CategoryCard.tsx    # Category card
│   └── CosmicBadge.tsx     # Built with Cosmic badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
└── types.ts                # TypeScript type definitions
```

<!-- README_END -->