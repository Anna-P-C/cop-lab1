export default function MovieCard({ movie }) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : "https://via.placeholder.com/60x90?text=No+Poster";

    return (
        <tr className="movie-table-row">
            <td className="movie-cell-main">
                <img src={posterUrl} alt={movie.title} className="table-poster" />
                <div>
                    <span className="movie-title">{movie.title}</span>
                    <span className="movie-sub">Мова: {movie.original_language?.toUpperCase()}</span>
                </div>
            </td>
            <td>{movie.release_date || "Н/Д"}</td>
            <td>{movie.vote_count ? movie.vote_count.toLocaleString() : 0}</td>
            <td>
                <span className="badge-rating">★ {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}</span>
            </td>
        </tr>
    );
}