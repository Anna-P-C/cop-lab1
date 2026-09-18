import { useState } from "react";
import KpiCard from "./components/KpiCard";
import Counter from "./components/Counter";
import FilteredMovieList from "./components/FilteredMovieList";
import { MOCK_MOVIES } from "./data/mockMovies";
import "./App.css";

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div className={`dashboard-wrapper ${isDarkMode ? "theme-dark" : "theme-light"}`}>
            <header className="dashboard-header">
                <div>
                    <h1>TMDb Movie Dashboard</h1>

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
                    title="У прокаті"
                    value="42 стрічки"
                    change="+8.4% за тиждень"
                    isPositive={true}
                />
                <KpiCard
                    title="Топ-рейтинг"
                    value="8.7 / 10"
                    change="+0.2 бала"
                    isPositive={true}
                />
                <KpiCard
                    title="Касові збори"
                    value="$14.2M"
                    change="-3.1% спад"
                    isPositive={false}
                />
            </section>

            <main className="main-content-grid">
                <section className="primary-column">
                    <FilteredMovieList movies={MOCK_MOVIES} />
                </section>

                <aside className="secondary-column">
                    <Counter label="Кількість квитків" initialValue={1} min={1} max={8} />
                </aside>
            </main>
        </div>
    );
}