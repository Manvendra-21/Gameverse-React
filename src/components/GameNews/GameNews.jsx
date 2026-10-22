import { useEffect, useState } from "react";
import "./GameNews.css";

const NEWS_KEY = import.meta.env.VITE_NEWS_KEY;

// shows one row of news cards (defined outside GameNews on purpose)
function NewsSection({ title, articles }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="game-news-section">
      <div className="game-news-heading">
        <h2>{title}</h2>
      </div>

      <div className="game-news-track">
        {articles.slice(0, 10).map((article) => (
          <a
            className="game-news-card"
            href={article.url}
            target="_blank"
            rel="noreferrer"
            key={article.url}
          >
            {article.urlToImage ? (
              <img className="game-news-image" src={article.urlToImage} alt="" />
            ) : (
              <div className="game-news-placeholder">🎮</div>
            )}

            <div className="game-news-overlay">
              <span className="game-news-source">{article.source.name}</span>
              <h3>{article.title}</h3>
              <span className="game-news-read">Read Story ↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function GameNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=gaming&language=en&sortBy=publishedAt&apiKey=" +
        NEWS_KEY
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("news:", data);
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load news.");
        setLoading(false);
      });
  }, []);

  // articles whose title mentions a game-related word
  const words = ["game", "playstation", "xbox", "nintendo", "steam"];

  const gameNews = news.filter((article) =>
    words.some((word) => (article.title || "").toLowerCase().includes(word))
  );

  const otherNews = news.filter((article) => !gameNews.includes(article));

  return (
    <main className="game-news-page">
      <header className="game-news-header">
        <h1>
          Gameverse <span>News</span>
        </h1>
        <p>Games, technology, esports and everything in the gaming world.</p>
      </header>

      {loading && <p className="game-news-message">Loading...</p>}
      {error && <p className="game-news-message">{error}</p>}

      {!loading && !error && news.length === 0 && (
        <p className="game-news-message">No articles available right now.</p>
      )}

      {!loading && !error && (
        <>
          <NewsSection title="Games & Releases" articles={gameNews} />
          <NewsSection title="Everything Else" articles={otherNews} />
        </>
      )}
    </main>
  );
}

export default GameNews;