export default function MovieCard({ title, genre, rating, status }) {
    return (
        <div className="movie-item">
            <div className="movie-main">
                <strong>{title}</strong>
                <span className="movie-genre">{genre} • {status}</span>
            </div>
            <span className="movie-rating">★ {rating.toFixed(1)}</span>
        </div>
    );
}