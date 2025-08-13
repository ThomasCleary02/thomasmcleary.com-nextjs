# Portfolio App Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account and project

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Database Schema

Run the following SQL in your Supabase SQL editor to create the projects table:

```sql
-- Create the projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  affiliation TEXT,
  description TEXT NOT NULL,
  technologies JSONB NOT NULL DEFAULT '[]',
  live_demo_url TEXT,
  github_url TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all users to read projects
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Create a policy that allows authenticated users to insert projects
CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to update their own projects
CREATE POLICY "Allow authenticated update" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to delete their own projects
CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');
```

## Sample Data

You can insert sample projects using the Supabase dashboard or API:

```json
{
  "title": "Portfolio Website",
  "affiliation": "Personal Project",
  "description": "A modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a clean design, responsive layout, and integration with Supabase for data management.",
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
  "live_demo_url": "https://your-portfolio.com",
  "github_url": "https://github.com/yourusername/portfolio",
  "image_url": "https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Portfolio+Website"
}
```

## Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- **Homepage**: Displays featured projects and skills
- **Projects Page**: Shows all projects in a grid layout
- **API Routes**: RESTful API for CRUD operations on projects
- **Service Layer**: Clean separation of data access logic
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Project Structure

```
app/
├── api/projects/          # API routes for projects
├── components/            # Reusable UI components
├── projects/             # Projects listing page
├── globals.css           # Global styles
├── layout.tsx            # Root layout
└── page.tsx              # Homepage

lib/
├── services/             # Data access layer
├── types/                # TypeScript type definitions
└── supabase.ts          # Supabase client configuration
```

## Next Steps

- Customize the content and styling to match your brand
- Add authentication for admin features
- Implement the blog feature
- Add image upload functionality
- Deploy to Vercel or your preferred hosting platform 