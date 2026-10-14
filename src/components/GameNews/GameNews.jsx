import { useEffect, useState } from "react";
import "./GameNews.css";

function GameNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(
            "https://newsapi.org/v2/everything?q=gaming&language=en&sortBy=publishedAt&apiKey=c4377eba6a834389aae28c9282b6b508"
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch news");
                }


                return response.json();
            })
            .then((data) => {
                setNews(data.articles || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Unable to load news right now.");
                setLoading(false);
            });


    }, []);

    const gamesNews = news.filter((article) =>
        /game|playstation|xbox|nintendo|steam|gta|minecraft|elden ring|release|gameplay/i.test(
            `${article.title || ""} ${article.description || ""}`
        )
    );

    const otherNews = news.filter(
        (article) => !gamesNews.includes(article)
    );

    function NewsSection({ title, articles }) {
        if (articles.length === 0) return null;

        return (
            <section className="game-news-section">
                <div className="game-news-heading">
                    <h2>{title}</h2>
                    <span>EXPLORE STORIES ↗</span>
                </div>

                <div className="game-news-track">
                    {articles.slice(0, 10).map((article) => (
                        <a
                            className="game-news-card"
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={article.url}
                        >
                            {article.urlToImage ? (
                                <img
                                    className="game-news-image"
                                    src={article.urlToImage}
                                    alt=""
                                    loading="lazy"
                                />
                            ) : (
                                <div className="game-news-placeholder">
                                    🎮
                                </div>
                            )}

                            <div className="game-news-overlay">
                                <span className="game-news-source">
                                    {article.source?.name || "Gaming News"}
                                </span>

                                <h3>{article.title}</h3>

                                <span className="game-news-read">
                                    Read Story ↗
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        );

    }

    return (
        <main className="game-news-page"> <header className="game-news-header">
            <h1>
                Gameverse <span>News</span>
            </h1>

            <p>
                Games, technology, esports and everything
                happening in the gaming world.
            </p>
        </header>

        {loading && (
            <p className="game-news-message">
                Loading gaming stories...
            </p>
        )}

        {error && (
            <p className="game-news-message">
                {error}
            </p>
        )}

        {!loading && !error && news.length > 0 && (
            <>
                <NewsSection
                    title="Games & Releases"
                    articles={gamesNews}
                />

                <NewsSection
                    title="Everything Else"
                    articles={otherNews}
                />
            </>
        )}

        {!loading && !error && news.length === 0 && (
            <p className="game-news-message">
                No articles available right now.
            </p>
        )}
    </main>

    );
}

export default GameNews;
