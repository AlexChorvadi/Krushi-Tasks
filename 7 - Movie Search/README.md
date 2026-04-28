# 🎬 Movie Search Application

A modern, responsive movie search application built with React and Vite. Search for movies, view detailed information, and save your favorite films.

## ✨ Features

- 🔍 **Search Movies**: Search movies by title using the OMDB API
- 📺 **Movie Details**: View comprehensive information about each movie including:
  - Plot synopsis
  - Cast and crew
  - Release year and rating
  - Runtime and genre
- ❤️ **Favorites**: Add movies to your favorites list and access them anytime
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface with smooth interactions
- 🧭 **Navigation**: Easy navigation with React Router

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.5
- **Build Tool**: Vite 8.0.9
- **Routing**: React Router DOM 7.14.2
- **Icons**: Lucide React 1.8.0
- **Styling**: CSS3
- **API**: OMDB API (Open Movie Database)
- **State Management**: React Context API

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone or navigate to the project**
   ```bash
   cd "7 - Movie Search"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with:
   ```
   VITE_OMDB_API_KEY=your_omdb_api_key
   ```
   
   > Get your free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will open at `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📂 Project Structure

```
src/
├── components/
│   ├── FavoritesDrawer.jsx    # Favorites sidebar drawer
│   ├── Footer.jsx              # Footer component
│   ├── Home.jsx                # Home/main page
│   ├── MovieCard.jsx           # Movie card display component
│   ├── MovieDetails.jsx        # Movie details page
│   └── Navbar.jsx              # Navigation bar
├── App.jsx                      # Main app component
├── MovieContext.jsx             # Context API for movie state
├── index.css                    # Global styles
├── App.css                      # App component styles
└── main.jsx                     # Application entry point
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OMDB_API_KEY` | API key from OMDB API | Yes |

## 🎯 Usage

1. **Search for Movies**: Use the search bar in the navbar to find movies by title
2. **View Details**: Click on any movie card to view detailed information
3. **Add to Favorites**: Click the heart icon to add/remove movies from favorites
4. **Access Favorites**: Click the favorites icon in the navbar to view all saved movies

## 🌐 API Reference

This project uses the **OMDB API** (Open Movie Database) for movie data.

- **API Base URL**: `https://www.omdbapi.com/`
- **Documentation**: [OMDB API Docs](http://www.omdbapi.com/)

### Sample API Call
```
https://www.omdbapi.com/?apikey=YOUR_KEY&s=Inception
```

## 📝 Component Details

### MovieContext
Manages global state for:
- Searched movies
- Favorite movies
- Loading and error states

### Key Components
- **Navbar**: Search bar and navigation controls
- **Home**: Movie list and search results display
- **MovieCard**: Individual movie display with favorite toggle
- **MovieDetails**: Detailed view of a selected movie
- **FavoritesDrawer**: Sidebar displaying favorite movies
- **Footer**: Application footer

## 🎨 Styling

The project uses pure CSS for styling with:
- Responsive grid layouts
- Flexbox for component alignment
- Media queries for mobile responsiveness
- Smooth transitions and animations

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For issues, questions, or suggestions, please open an issue in the project repository.

---

**Happy Movie Searching!** 🍿
