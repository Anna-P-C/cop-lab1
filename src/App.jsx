import { useState } from "react";
import KpiCard from "./components/KpiCard";
import Counter from "./components/Counter";
import MovieContainer from "./components/MovieContainer";
import "./App.css";

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [moviesData, setMoviesData] = useState([]);


    const totalCount = moviesData.length;

    const avgRating = totalCount > 0
        ? (moviesData.reduce((acc, m) => acc + (m.vote_average || 0), 0) / totalCount).toFixed(1)
        : "0.0";

    const highRatedCount = moviesData.filter((m) => m.vote_average >= 8.0).length;

    return (
        <div className={`dashboard-wrapper ${isDarkMode ? "theme-dark" : "theme-light"}`}>
            <header className="dashboard-header">
                <div>
                    <h1>TMDb Analytics Dashboard</h1>
                    <p className="subtitle">Лабораторна робота №2: Робота з зовнішнім API, useEffect та сортуванням</p>
                </div>
                <button
                    className="toggle-btn"
                    onClick={() => setIsDarkMode((prev) => !prev)}
                >
                    {isDarkMode ? "🌙 Темна тема" : "☀️ Світла тема"}
                </button>
            </header>


            <section className="kpi-grid">
                <KpiCard
                    title="Завантажено стрічок"
                    value={`${totalCount} фільмів`}
                    change="API: /movie/popular"
                    isPositive={true}
                />
                <KpiCard
                    title="Середній рейтинг вибірки"
                    value={`${avgRating} / 10`}
                    change="Розраховано динамічно"
                    isPositive={Number(avgRating) >= 7.0}
                />
                <KpiCard
                    title="Фільмів з рейтингом 8.0+"
                    value={`${highRatedCount} стрічок`}
                    change={`${totalCount ? Math.round((highRatedCount / totalCount) * 100) : 0}% від вибірки`}
                    isPositive={highRatedCount > 0}
                />
            </section>


            <main className="main-content-grid">
                <section className="primary-column">
                    <MovieContainer onDataLoaded={setMoviesData} />
                </section>

                <aside className="secondary-column">
                    <Counter label="Кількість квитків для броні" initialValue={1} min={1} max={8} />
                </aside>
            </main>
        </div>
    );
}