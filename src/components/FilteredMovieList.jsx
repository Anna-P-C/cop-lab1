import { useState } from "react";
import MovieCard from "./MovieCard";

export default function FilteredMovieList({ movies = [] }) {
    const [selectedGenre, setSelectedGenre] = useState("Всі");

    const genres = ["Всі", ...new Set(movies.map((m) => m.genre))];

    const filteredMovies = selectedGenre === "Всі"
        ? movies
        : movies.filter((m) => m.genre === selectedGenre);

    return (
        <div className="card filtered-list-card">
            <div className="filtered-header">
                <h4>Каталог стрічок</h4>
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="genre-select"
                >
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>

            <div className="movie-list">
                {filteredMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        genre={movie.genre}
                        rating={movie.rating}
                        status={movie.status}
                    />
                ))}
            </div>
        </div>
    );
}