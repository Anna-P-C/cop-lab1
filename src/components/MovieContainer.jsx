import { useState, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MovieTable from "./MovieTable";
import FilterBar from "./FilterBar";

const INITIAL_FILTERS = {
    query: "",
    minRating: "0",
    year: ""
};

const API_KEY = "04c35731a5ee918f014970082a0088b1";

export default function MovieContainer({ onDataLoaded }) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [sortBy, setSortBy] = useState("vote_average");
    const [sortOrder, setSortOrder] = useState("desc");


    const debouncedQuery = useDebounce(filters.query, 400);


    const apiUrl = useMemo(() => {
        if (debouncedQuery.trim()) {
            return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                debouncedQuery
            )}&language=uk-UA&page=1`;
        }
        return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=uk-UA&page=1`;
    }, [debouncedQuery]);


    const { data, loading, error } = useFetch(apiUrl);
    const rawMovies = data?.results || [];


    const filteredMovies = useMemo(() => {
        return rawMovies.filter((movie) => {
            const matchRating = (movie.vote_average || 0) >= Number(filters.minRating);
            const matchYear = filters.year
                ? movie.release_date?.startsWith(filters.year)
                : true;
            return matchRating && matchYear;
        });
    }, [rawMovies, filters.minRating, filters.year]);


    const sortedMovies = useMemo(() => {
        const list = [...filteredMovies].sort((a, b) => {
            let valA = a[sortBy] ?? "";
            let valB = b[sortBy] ?? "";

            if (typeof valA === "string") {
                return sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }
            return sortOrder === "asc" ? valA - valB : valB - valA;
        });

        if (onDataLoaded) onDataLoaded(list);
        return list;
    }, [filteredMovies, sortBy, sortOrder, onDataLoaded]);

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setFilters(INITIAL_FILTERS);
    };

    return (
        <div className="movie-container-flow">

            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
            />


            {loading && (
                <div className="card state-box">
                    <div className="spinner"></div>
                    <p>Завантаження стрічок...</p>
                </div>
            )}


            {error && !loading && (
                <div className="card state-box error-box">
                    <p>Помилка завантаження: {error}</p>
                </div>
            )}


            {!loading && !error && sortedMovies.length === 0 && (
                <div className="card state-box">
                    <p>За вказаними фільтрами не знайдено жодного фільму.</p>
                </div>
            )}


            {!loading && !error && sortedMovies.length > 0 && (
                <MovieTable
                    movies={sortedMovies}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={setSortBy}
                    onOrderToggle={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                />
            )}
        </div>
    );
}