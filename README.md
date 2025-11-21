# 🚀 Laravel 12 + React 18 CMS

A modern, full-featured Content Management System with Laravel 12 backend API, React 18 admin panel, and server-side rendered public website.

[![Laravel](https://img.shields.io/badge/Laravel-12-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)
[![PHP](https://img.shields.io/badge/PHP-8.2+-purple.svg)](https://php.net)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📸 Screenshots
<img width="1908" height="914" alt="Image" src="https://github.com/user-attachments/assets/c20949d4-75b0-4f89-9d14-2fe05314e7e1" />

### Admin Dashboard
Modern, responsive dashboard with real-time statistics and gradient design.

### Public Website
SEO-optimized blog with beautiful Blade templates.

---

## Features

### Backend (Laravel 12)
- RESTful API for content management
- User authentication with Laravel Sanctum
- CRUD operations for Posts, Pages, and Media
- File upload and management
- SEO-friendly URLs with automatic slug generation
- Form validation and authorization policies
- Public website with Blade templates

### Bonus Features Implemented
- ✅ **Categories & Tags System** - Full CRUD with post relationships
- ✅ **Comments System** - Public submission with admin approval
- ✅ **Search Functionality** - Search posts and media
- ✅ **Media Folders** - Organize media files in folders
- ✅ **Caching** - Dashboard stats cached for performance
- ⚠️ **Role/Permission** - Package included (spatie/laravel-permission)

### Frontend (React 18+ Admin Panel)
- Modern React admin interface
- Redux Toolkit for state management
- React Router for navigation
- WYSIWYG editor integration
- File upload with drag & drop
- Responsive Bootstrap design
- Real-time notifications

### Public Website
- Server-side rendered Blade templates
- SEO optimized pages
- Responsive design
- Blog functionality
- Dynamic page routing

## Technology Stack

- **Backend**: Laravel 12, PHP 8.2+, MySQL/PostgreSQL
- **Frontend**: React 18+, Redux Toolkit, React Router
- **Styling**: Bootstrap 5
- **Editor**: React Quill
- **Authentication**: Laravel Sanctum

## Project Structure

```
├── backend/          # Laravel 12 API and public website
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── resources/
│   └── routes/
└── admin/           # React 18+ admin panel
    ├── src/
    ├── public/
    └── package.json
```

## Setup Instructions

### Backend Setup (Laravel)

1. **Install Dependencies**
   ```bash
   cd backend
   composer install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**
   - Configure your database connection in `.env`
   - Run migrations and seed data:
   ```bash
   php artisan migrate --seed
   ```

4. **Storage Setup**
   ```bash
   php artisan storage:link
   ```

5. **Start Laravel Server**
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup (React Admin)

1. **Install Dependencies**
   ```bash
   cd admin
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The admin panel will be available at `http://localhost:3000`

## Default Credentials

- **Email**: admin@example.com
- **Password**: password

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get authenticated user

### Posts
- `GET /api/posts` - List posts (with search & filters)
- `POST /api/posts` - Create post (with categories & tags)
- `GET /api/posts/{id}` - Get post
- `PUT /api/posts/{id}` - Update post (with categories & tags)
- `DELETE /api/posts/{id}` - Delete post
- `PATCH /api/posts/{id}/publish` - Toggle publish status

### Pages
- `GET /api/pages` - List pages
- `POST /api/pages` - Create page
- `GET /api/pages/{id}` - Get page
- `PUT /api/pages/{id}` - Update page
- `DELETE /api/pages/{id}` - Delete page

### Media
- `GET /api/media` - List media files (with search & folder filter)
- `POST /api/media/upload` - Upload file (with folder support)
- `DELETE /api/media/{id}` - Delete media file

### Categories (Bonus)
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### Tags (Bonus)
- `GET /api/tags` - List tags
- `POST /api/tags` - Create tag
- `PUT /api/tags/{id}` - Update tag
- `DELETE /api/tags/{id}` - Delete tag

### Comments (Bonus)
- `POST /api/posts/{post}/comments` - Submit comment (public)
- `GET /api/posts/{post}/comments` - List comments (admin)
- `PATCH /api/comments/{comment}/approve` - Approve comment (admin)
- `DELETE /api/comments/{comment}` - Delete comment (admin)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (cached)

## Public Website Routes

- `/` - Home page with latest posts
- `/blog` - Blog listing page
- `/blog/{slug}` - Individual blog post
- `/{slug}` - Dynamic pages (About, Contact, etc.)

## Development Notes

### Laravel Backend
- Uses Laravel Sanctum for API authentication
- Form Requests for validation
- API Resources for JSON formatting
- Policies for authorization
- Automatic slug generation
- File storage in `storage/app/public`

### React Admin Panel
- Redux Toolkit for state management
- React Hook Form for form handling
- React Quill for WYSIWYG editing
- Bootstrap for responsive design
- Axios for API communication
- React Toastify for notifications

### Database Schema
- `users` - Admin users
- `posts` - Blog posts with user relationship
- `pages` - Static pages
- `media` - Uploaded files metadata with folder support
- `categories` - Post categories (bonus)
- `tags` - Post tags (bonus)
- `comments` - Post comments with approval system (bonus)
- `category_post` - Post-category pivot table
- `post_tag` - Post-tag pivot table

## Production Deployment

### Laravel
1. Set `APP_ENV=production` in `.env`
2. Run `php artisan config:cache`
3. Run `php artisan route:cache`
4. Run `php artisan view:cache`
5. Set up proper file permissions
6. Configure web server (Apache/Nginx)

### React Admin
1. Run `npm run build`
2. Serve the `dist` folder via web server
3. Configure API base URL for production

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For support and questions, please open an issue in the GitHub repository.
