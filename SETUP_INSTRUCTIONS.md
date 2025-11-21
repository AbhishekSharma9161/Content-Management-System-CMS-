# Laravel 12 + React 18 CMS - Complete Setup Guide

## 📋 Prerequisites

- **PHP 8.2+** (required for Laravel 12)
- **Composer** (PHP package manager)
- **Node.js 18+** and npm
- **MySQL/PostgreSQL** (or use SQLite for development)

## 🚀 Quick Start (Using SQLite)

The project is pre-configured with SQLite for easy setup.

### Step 1: Backend Setup (Laravel 12)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Backend API: `http://localhost:8000`

### Step 2: Frontend Setup (React 18)

```bash
cd admin
npm install
npm run dev
```

Admin Panel: `http://localhost:5173`

### Step 3: Login

- **Email**: admin@example.com
- **Password**: password

## 📊 What Gets Seeded

The `php artisan migrate --seed` command creates:

- **3 Users**: admin@example.com, john@example.com, jane@example.com
- **5 Categories**: Technology, Business, Lifestyle, Travel, Food
- **8 Tags**: Laravel, React, PHP, JavaScript, Tutorial, Guide, Tips, News
- **4 Blog Posts**: 3 published + 1 draft (with categories & tags)
- **4 Static Pages**: About, Contact, Privacy Policy, Terms
- **3 Media Files**: Sample images and documents
- **Multiple Comments**: Approved and pending comments

## 🗄️ Database Options

### Option A: SQLite (Default - No Setup Required)
Already configured! Database file: `backend/database/database.sqlite`

### Option B: MySQL/PostgreSQL

1. Create database:
```sql
CREATE DATABASE laravel_cms;
```

2. Update `backend/.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_cms
DB_USERNAME=root
DB_PASSWORD=your_password
```

3. Run migrations:
```bash
php artisan migrate:fresh --seed
```

## ✨ Features Overview

### Core Features ✅
- Laravel 12 REST API
- React 18 Admin Panel with Redux Toolkit
- Authentication (Laravel Sanctum)
- Posts CRUD with publish/unpublish
- Pages CRUD
- Media upload & management
- Public website with Blade templates
- SEO-friendly URLs & meta tags

### Bonus Features ✅
- **Categories & Tags**: Organize posts
- **Comments**: Public submission with admin approval
- **Search**: Find posts and media
- **Media Folders**: Organize uploads
- **Caching**: Dashboard stats cached (5 min)
- **Role/Permission**: Spatie package included

## 🌐 Testing the Application

### Admin Panel (`http://localhost:5173`)
- Dashboard with statistics
- Create/Edit/Delete Posts (with categories & tags)
- Create/Edit/Delete Pages
- Upload media (with folder support)
- Manage categories and tags
- Approve/Delete comments
- Publish/Unpublish content

### Public Website (`http://localhost:8000`)
- **Home**: `/` - Latest blog posts
- **Blog**: `/blog` - All posts with search
- **Post**: `/blog/getting-started-with-laravel-12`
- **Pages**: `/about`, `/contact`, `/privacy-policy`, `/terms`

## 📡 API Endpoints

### Authentication
- `POST /api/login`
- `POST /api/logout`
- `GET /api/me`

### Posts
- `GET /api/posts` (search, filter, paginate)
- `POST /api/posts` (with categories & tags)
- `PUT /api/posts/{id}`
- `DELETE /api/posts/{id}`
- `PATCH /api/posts/{id}/publish`

### Pages
- `GET /api/pages`
- `POST /api/pages`
- `PUT /api/pages/{id}`
- `DELETE /api/pages/{id}`

### Media
- `GET /api/media` (search, folder filter)
- `POST /api/media/upload` (with folder)
- `DELETE /api/media/{id}`

### Categories (Bonus)
- `GET /api/categories`
- `POST /api/categories`
- `PUT /api/categories/{id}`
- `DELETE /api/categories/{id}`

### Tags (Bonus)
- `GET /api/tags`
- `POST /api/tags`
- `PUT /api/tags/{id}`
- `DELETE /api/tags/{id}`

### Comments (Bonus)
- `POST /api/posts/{post}/comments` (public)
- `GET /api/posts/{post}/comments` (admin)
- `PATCH /api/comments/{comment}/approve`
- `DELETE /api/comments/{comment}`

### Dashboard
- `GET /api/dashboard/stats` (cached)

## 🗃️ Database Structure

### Tables (7 migrations)
1. **users** - Admin authentication
2. **posts** - Blog posts with slug & published status
3. **pages** - Static pages
4. **media** - File uploads with folder support
5. **categories** - Post categories (bonus)
6. **tags** - Post tags (bonus)
7. **comments** - Comments with approval (bonus)

### Pivot Tables
- **category_post** - Post-category relationships
- **post_tag** - Post-tag relationships

## 🔧 Troubleshooting

### Backend Issues

**Database connection error**
```bash
# Check .env credentials
# For SQLite, ensure database/database.sqlite exists
touch database/database.sqlite
```

**Storage link not working**
```bash
php artisan storage:link
```

**Permission errors**
```bash
chmod -R 775 storage bootstrap/cache
```

**Clear cache**
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### Frontend Issues

**API connection error**
- Ensure backend is running on `http://localhost:8000`
- Check CORS in `backend/config/cors.php`

**Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use**
```bash
npm run dev -- --port 3000
```

## 🚀 Production Deployment

### Backend

1. Update `.env`:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
```

2. Optimize:
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

3. Set permissions:
```bash
chmod -R 755 storage bootstrap/cache
```

### Frontend

1. Update API URL in `admin/src/services/api.js`

2. Build:
```bash
npm run build
```

3. Deploy `dist` folder to web server

## 📚 Additional Resources

- [Laravel 12 Documentation](https://laravel.com/docs/12.x)
- [React 18 Documentation](https://react.dev)
- [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum)
- [Redux Toolkit](https://redux-toolkit.js.org)

## 🎯 Project Structure

```
├── backend/              # Laravel 12 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/  # API Controllers
│   │   │   ├── Requests/         # Form Validation
│   │   │   └── Resources/        # JSON Resources
│   │   ├── Models/               # Eloquent Models
│   │   └── Policies/             # Authorization
│   ├── database/
│   │   ├── migrations/           # 7 migrations
│   │   └── seeders/              # 7 seeders
│   ├── resources/views/          # Blade templates
│   └── routes/
│       ├── api.php               # API routes
│       └── web.php               # Public routes
│
└── admin/                # React 18 Admin Panel
    ├── src/
    │   ├── components/           # React components
    │   ├── pages/                # Page components
    │   ├── services/             # API services
    │   └── store/                # Redux store
    └── package.json
```

## ✅ Verification Checklist

- [ ] PHP 8.2+ installed
- [ ] Composer installed
- [ ] Node.js 18+ installed
- [ ] Backend dependencies installed (`composer install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Database migrated and seeded
- [ ] Storage link created
- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Can login with admin@example.com
- [ ] Can create/edit posts
- [ ] Can upload media
- [ ] Public website accessible

## 💡 Tips

- Use SQLite for development (no database server needed)
- All passwords are "password" for seeded users
- Dashboard stats are cached for 5 minutes
- Media files stored in `storage/app/public/media`
- Check `README.md` for detailed API documentation

## 🆘 Support

If you encounter issues:
1. Check this troubleshooting section
2. Review `README.md`
3. Check Laravel/React documentation
4. Verify all prerequisites are installed
5. Ensure ports 8000 and 5173 are available
