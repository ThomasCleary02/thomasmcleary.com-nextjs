# Thomas Cleary Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

##  Features

- **Blog System**: Full CRUD operations with markdown support
- **Admin Panel**: Secure content management interface
- **Responsive Design**: Mobile-first approach with dark mode support
- **Performance Optimized**: Built with Next.js 14 and optimized images
- **Open Source**: Complete source code available for learning and contribution

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom admin authentication
- **Deployment**: Vercel (recommended)

## 📖 API Documentation

### Blog Endpoints

- `GET /api/blogs` - Retrieve all blogs
- `POST /api/blogs` - Create a new blog
- `GET /api/blogs/[slug]` - Get blog by slug
- `PUT /api/blogs/[slug]` - Update blog
- `DELETE /api/blogs/[slug]` - Delete blog

### Bug Report Endpoints

- `POST /api/bugs` - Submit a bug report
- `GET /api/bugs` - Retrieve bug reports (admin only)
- `PUT /api/bugs/[id]` - Update bug status (admin only)

##  Configuration

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Social Links

Update `lib/config/social-links.json` to customize your social media links.

##  Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
