import { useState } from "react";
import "./Achievements.css";

const API_KEY = import.meta.env.VITE_XBOX_KEY;

// calls the API through the proxy set in vite.config.js
async function getData(url) {
  const res = await fetch("/xbox-api" + url, {
    headers: { "X-Authorization": API_KEY },
  });

  if (!res.ok) {
    throw new Error("Request failed with status " + res.status);
  }

  return res.json();
}

// the API sometimes wraps the data inside "content", so check both
function getList(data, name) {
  return data[name] || data.content?.[name] || [];
}

function Achievements() {
  const [gamertag, setGamertag] = useState("");
  const [player, setPlayer] = useState(null);
  const [games, setGames] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchPlayer(e) {
    e.preventDefault();

    if (gamertag.trim() === "") {
      setError("Please enter a gamertag.");
      return;
    }

    setLoading(true);
    setError("");
    setPlayer(null);
    setGames([]);
    setAchievements([]);

    try {
      // step 1: find the player
      const searchData = await getData("/v2/search/" + gamertag.trim());
      console.log("search:", searchData);

      const people = getList(searchData, "people");

      if (people.length === 0) {
        setError("No player found with this gamertag.");
        setLoading(false);
        return;
      }

      const foundPlayer = people[0];
      setPlayer(foundPlayer);

      // step 2: get the player's games
      try {
        const titleData = await getData("/v2/titles/" + foundPlayer.xuid);
        console.log("titles:", titleData);
        setGames(getList(titleData, "titles"));
      } catch (err) {
        console.log("games error:", err.message);
      }

      // step 3: get the player's achievements
      try {
        const achData = await getData(
          "/v3/achievements/player/" + foundPlayer.xuid
        );
        console.log("achievements:", achData);
        setAchievements(getList(achData, "achievements"));
      } catch (err) {
        console.log("achievements error:", err.message);
      }
    } catch (err) {
      console.log("REAL ERROR:", err.message);
      setError(err.message);
    }

    setLoading(false);
  }

  const unlocked = achievements.filter((a) => a.progressState === "Achieved");

  const completion =
    achievements.length > 0
      ? Math.round((unlocked.length / achievements.length) * 100)
      : 0;

  return (
    <main className="achievement-section">
      <div className="achievement-container">
        <header className="achievement-heading">
          <span className="achievement-eyebrow">GAMEVERSE / XBOX</span>
          <h1>
            Xbox <span>Achievement Hub</span>
          </h1>
          <p>Enter a gamertag to see games and achievements.</p>
        </header>

        <form className="achievement-search" onSubmit={searchPlayer}>
          <label>ENTER YOUR XBOX GAMERTAG</label>
          <div className="achievement-search-row">
            <input
              value={gamertag}
              onChange={(e) => setGamertag(e.target.value)}
              placeholder="Enter Xbox Gamertag"
            />
            <button type="submit" disabled={loading}>
              {loading ? "SEARCHING..." : "FIND PLAYER"}
            </button>
          </div>
        </form>

        {error && <div className="achievement-error">{error}</div>}

        {player && (
          <div className="achievement-dashboard">
            <section className="achievement-profile">
              <div className="achievement-avatar">
                <img src={player.displayPicRaw} alt="profile" />
              </div>
              <div>
                <span className="achievement-label">XBOX PLAYER</span>
                <h2>{player.gamertag}</h2>
              </div>
            </section>

            <section className="achievement-stats">
              <article className="achievement-stat-card">
                <span>GAMERSCORE</span>
                <strong>{player.gamerScore}</strong>
              </article>
              <article className="achievement-stat-card">
                <span>GAMES FOUND</span>
                <strong>{games.length}</strong>
              </article>
              <article className="achievement-stat-card">
                <span>COMPLETION</span>
                <strong>{completion}%</strong>
              </article>
            </section>

            <section className="achievement-games">
              <h2>Xbox Games</h2>
              <div className="achievement-games-grid">
                {games.map((game) => (
                  <article className="achievement-game-card" key={game.titleId}>
                    <img
                      className="achievement-game-image"
                      src={game.displayImage}
                      alt={game.name}
                    />
                    <div className="achievement-game-info">
                      <h3>{game.name}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default Achievements;