# 🎬 CineBite - Movies & TV Shows App

CineBite is a modern, fast, and responsive web application to explore trending **movies and TV shows**, view detailed information, and manage a **personal watchlist** - all powered by **TMDB** and **Supabase**.

🔗 **Live Link :** https://cinebite-movie-app.vercel.app/

---

## ✨ Features

- 🎥 Browse **Trending, Popular, Top Rated & Upcoming** Movies
- 📺 Explore **TV Shows** with detailed pages
- 🔍 Smart search with debounce
- ❤️ Add / Remove items from **Watchlist**
- 🔐 Authentication with **Supabase Auth**
  - Email & Password
  - Email verification
- 🗂 Watchlist persisted per user
- 🎞 Trailer playback
- 🌙 Dark cinematic UI
- ⚡ Optimized with React Query
- 📱 **PWA Ready**
- 🧩 Fully responsive

## 🧠 Tech Stack

### Frontend

- **React + Vite**
- **React Router**
- **Tailwind CSS**
- **Zustand**
- **React Query**
- **Lucide Icons**
- **React Hot Toast**

### Backend / Services

- **TMDB API** - Movies & TV data
- **Supabase**
  - Authentication
  - PostgreSQL (Watchlist)

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/danielace1/cinebite-movie-app.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root directory and add the following environment variables:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open in your browser

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Contributing

Contributions are welcome! Please open an issue or submit a [pull request](https://github.com/danielace1/cinebite-movie-app/pulls) for any improvements or bug fixes.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- [Sudharsan](https://fb.com/sudharsandaniel01)
