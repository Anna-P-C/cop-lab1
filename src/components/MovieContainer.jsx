import { useState, useEffect } from "react";
import MovieTable from "./MovieTable";

export default function MovieContainer({ onDataLoaded }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const [sortBy, setSortBy] = useState("vote_average");
    const [sortOrder, setSortOrder] = useState("desc");


    const API_KEY = "04c35731a5ee918f014970082a0088b1";

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=uk-UA&page=1`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Помилка API (статус ${res.status})`);
                }
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    const results = data.results || [];
                    setMovies(results);
                    if (onDataLoaded) onDataLoaded(results);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);


    const sortedMovies = [...movies].sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (typeof valA === "string") {
            return sortOrder === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        return sortOrder === "asc" ? valA - valB : valB - valA;
    });


    if (isLoading) {
        return (
            <div className="card state-box">
                <div className="spinner"></div>
                <p>Завантаження стрічок з TMDb API...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="card state-box error-box">
                <p>Не вдалося завантажити дані: {error}</p>
                <button className="btn-secondary" onClick={() => window.location.reload()}>
                    Спробувати знову
                </button>
            </div>
        );
    }


    if (sortedMovies.length === 0) {
        return (
            <div className="card state-box">
                <p>Список стрічок порожній.</p>
            </div>
        );
    }


    return (
        <MovieTable
            movies={sortedMovies}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSortBy}
            onOrderToggle={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
        />
    );
}