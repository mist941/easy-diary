# 📝 Easy Diary

Easy Diary is a modern web application designed for convenient digital journaling, allowing you to effortlessly capture, organize, and reflect on your daily thoughts and experiences in a digital format.

## ⭐ Support the Project
If you find Easy Diary useful, please consider giving it a star on GitHub! Your support helps the project grow.

## 🚀 Features

- 📱 Modern and responsive interface
- 🌙 Light and dark theme support
- ⚡ Fast performance with Next.js and FastAPI
- 🔒 Secure data storage with PostgreSQL
- 🐳 Full Docker support for easy deployment
- 📅 Daily journal entries organization
- 🔍 Easy navigation through past entries

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Zustand for state management

### Backend
- FastAPI
- SQLAlchemy
- Alembic for migrations
- PostgreSQL
- Docker

## 🏃‍♂️ Getting Started

### Using Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd easy-diary
```

2. Create a `.env` file with the following variables:
```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
SECRET_KEY=your_secret_key
```

3. Launch with Docker Compose:
```bash
docker-compose up --build
```

### Local Development Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate for Windows
pip install -r requirements-dev.txt
make run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 Development Commands

### Backend

- `make install` - install dependencies
- `make run` - run development server
- `make lint` - check code
- `make format` - format code
- `make migrations` - create migrations
- `make migrate` - apply migrations

### Frontend

- `npm run dev` - run development server
- `npm run build` - build project
- `npm run lint` - check code
- `npm run test` - run tests

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Ivan - Lead Developer

---

Made with ❤️ in Ukraine