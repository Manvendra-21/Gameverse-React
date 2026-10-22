import { useState } from "react";
import "./Achievements.css";

const OPENXBL_API_KEY = "71905d65-4cf6-4d40-9ee1-5d130a0b29df";
const API_BASE = "/xbox-api";

async function apiRequest(endpoint) {
  let response;

  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      method: "GET",
      headers: {
        "X-Authorization": OPENXBL_API_KEY,
        Accept: "application/json",
      },
    });
  } catch (error) {
    throw new Error(
      "Could not contact OpenXBL. Check your internet connection and Vite proxy."
    );
  }

  const responseText = await response.text();

  let data;

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    data = { message: responseText };
  }

  if (!response.ok) {
    throw new Error(
      `OpenXBL HTTP ${response.status}: ${
        data.message || data.error || "Request failed"
      }`
    );
  }

  return data;
}

function findArray(data, keys) {
  if (Array.isArray(data)) {
    return data;
  }

  if (!data || typeof data !== "object") {
    return [];
  }

  for (const key of keys) {
    if (Array.isArray(data[key])) {
      return data[key];
    }

    if (Array.isArray(data.content?.[key])) {
      return data.content[key];
    }

    if (Array.isArray(data.data?.[key])) {
      return data.data[key];
    }
  }

  return [];
}

function Achievements() {
  const [gamertag, setGamertag] = useState("");
  const [player, setPlayer] = useState(null);
  const [games, setGames] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gameError, setGameError] = useState("");
  const [achievementError, setAchievementError] = useState("");

  async function searchPlayer(event) {
    event.preventDefault();

    const enteredGamertag = gamertag.trim();

    if (!enteredGamertag) {
      setError("Enter an Xbox Gamertag first.");
      return;
    }

    setLoading(true);
    setError("");
    setGameError("");
    setAchievementError("");

    setPlayer(null);
    setGames([]);
    setAchievements([]);

    try {
      // 1. Search for the player.
      const searchData = await apiRequest(
        `/v2/search/${encodeURIComponent(enteredGamertag)}`
      );

      console.log("OpenXBL player search:", searchData);

      const people = findArray(searchData, ["people"]);

      if (people.length === 0) {
        throw new Error(
          "No players were returned. Check the Gamertag and API response."
        );
      }

      const matchedPlayer =
        people.find(
          (person) =>
            person.gamertag?.toLowerCase() ===
            enteredGamertag.toLowerCase()
        ) || people[0];

      setPlayer(matchedPlayer);

      const xuid = matchedPlayer.xuid || matchedPlayer.Xuid;

      if (!xuid) {
        throw new Error(
          "The player search returned no XUID. Check the Console."
        );
      }

      // 2. Retrieve game/title history.
      try {
        const titleData = await apiRequest(
          `/v2/titles/${encodeURIComponent(xuid)}`
        );

        console.log("OpenXBL title history:", titleData);

        const titleList = findArray(titleData, [
          "titles",
          "games",
          "titleHistory",
          "results",
        ]);

        setGames(titleList);

        if (titleList.length === 0) {
          setGameError(
            "The request succeeded, but no recognizable game list was returned. Check the title-history response in the Console."
          );
        }
      } catch (err) {
        console.error("OpenXBL title-history error:", err);
        setGameError(err.message);
      }

      // 3. Retrieve achievements.
      try {
        const achievementData = await apiRequest(
          `/v3/achievements/player/${encodeURIComponent(xuid)}`
        );

        console.log("OpenXBL achievements:", achievementData);

        const achievementList = findArray(achievementData, [
          "achievements",
          "items",
          "results",
        ]);

        setAchievements(achievementList);

        if (achievementList.length === 0) {
          setAchievementError(
            "No recognizable achievement list was returned. Check the achievement response in the Console."
          );
        }
      } catch (err) {
        console.error("OpenXBL achievement error:", err);
        setAchievementError(err.message);
      }
    } catch (err) {
      console.error("Xbox player search error:", err);
      setError(err.message || "Unable to retrieve the Xbox profile.");
    } finally {
      setLoading(false);
    }
  }

  const getGamertag = () =>
    player?.gamertag ||
    player?.Gamertag ||
    gamertag;

  const getGamerscore = () =>
    Number(
      player?.gamerScore ??
      player?.gamerscore ??
      player?.GameScore ??
      0
    ) || 0;

  const getAvatar = () =>
    player?.displayPicRaw ||
    player?.DisplayPicRaw ||
    player?.displayPicture ||
    "";

  function isUnlocked(item) {
    const state = String(
      item.progressState || item.state || ""
    ).toLowerCase();

    if (state) {
      return ["achieved", "unlocked", "completed"].includes(state);
    }

    if (item.unlocked !== undefined) {
      return Boolean(item.unlocked);
    }

    if (item.isUnlocked !== undefined) {
      return Boolean(item.isUnlocked);
    }

    return false;
  }

  const unlockedCount = achievements.filter(isUnlocked).length;

  const completion =
    achievements.length > 0
      ? Math.round((unlockedCount / achievements.length) * 100)
      : 0;

  return (
    <main className="achievement-section">
      <div className="achievement-container">
        <header className="achievement-heading">
          <span className="achievement-eyebrow">
            GAMEVERSE / XBOX
          </span>

          <h1>
            Xbox <span>Achievement Hub</span>
          </h1>

          <p>
            Discover your gaming profile, explore your games,
            and track your achievements.
          </p>
        </header>

        <form
          className="achievement-search"
          onSubmit={searchPlayer}
        >
          <label htmlFor="xbox-gamertag">
            ENTER YOUR XBOX GAMERTAG
          </label>

          <div className="achievement-search-row">
            <input
              id="xbox-gamertag"
              value={gamertag}
              onChange={(event) => setGamertag(event.target.value)}
              placeholder="Enter Xbox Gamertag"
              autoComplete="off"
            />

            <button type="submit" disabled={loading}>
              {loading ? "SEARCHING..." : "FIND PLAYER"}
            </button>
          </div>
        </form>

        {error && (
          <div className="achievement-error" role="alert">
            {error}
          </div>
        )}

        {loading && (
          <p className="achievement-loading">
            Loading Xbox profile, games, and achievements...
          </p>
        )}

        {!player && !loading && !error && (
          <div className="achievement-empty-state">
            <div className="achievement-xbox-symbol">X</div>
            <h2>Your gaming journey starts here.</h2>
            <p>Enter a Gamertag to look up an Xbox profile.</p>
          </div>
        )}

        {player && (
          <div className="achievement-dashboard">
            <section className="achievement-profile">
              <div className="achievement-avatar">
                {getAvatar() ? (
                  <img src={getAvatar()} alt="Xbox profile" />
                ) : (
                  <span>
                    {getGamertag().charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <span className="achievement-label">XBOX PLAYER</span>
                <h2>{getGamertag()}</h2>
                <p>Your Xbox player profile</p>
              </div>
            </section>

            <section className="achievement-stats">
              <article className="achievement-stat-card">
                <span>GAMERSCORE</span>
                <strong>{getGamerscore().toLocaleString()}</strong>
              </article>

              <article className="achievement-stat-card">
                <span>GAMES FOUND</span>
                <strong>{games.length}</strong>
              </article>

              <article className="achievement-stat-card">
                <span>UNLOCKED RECORDS</span>
                <strong>{unlockedCount}</strong>
                <small>
                  From {achievements.length} returned records
                </small>
              </article>
            </section>

            <section className="achievement-progress">
              <div className="achievement-section-title">
                <div>
                  <span className="achievement-label">YOUR PROGRESS</span>
                  <h2>Achievement Completion</h2>
                </div>

                <strong>{completion}%</strong>
              </div>

              <div className="achievement-progress-track">
                <div
                  className="achievement-progress-fill"
                  style={{ width: `${completion}%` }}
                />
              </div>

              {achievementError && (
                <p className="achievement-inline-error">
                  {achievementError}
                </p>
              )}
            </section>

            <section className="achievement-games">
              <div className="achievement-section-title">
                <div>
                  <span className="achievement-label">YOUR COLLECTION</span>
                  <h2>Xbox Games</h2>
                </div>
              </div>

              {gameError && (
                <p className="achievement-inline-error">
                  {gameError}
                </p>
              )}

              {games.length > 0 && (
                <div className="achievement-games-grid">
                  {games.map((game, index) => {
                    const name =
                      game.name ||
                      game.Name ||
                      game.titleName ||
                      game.title ||
                      "Xbox Game";

                    const image =
                      game.displayImage ||
                      game.DisplayImage ||
                      game.imageUrl ||
                      game.displayPicRaw ||
                      "";

                    return (
                      <article
                        className="achievement-game-card"
                        key={
                          game.titleId ||
                          game.TitleId ||
                          `${name}-${index}`
                        }
                      >
                        {image ? (
                          <img
                            className="achievement-game-image"
                            src={image}
                            alt={name}
                          />
                        ) : (
                          <div className="achievement-game-placeholder">
                            XBOX
                          </div>
                        )}

                        <div className="achievement-game-info">
                          <h3>{name}</h3>
                          <p>
                            Gamerscore:{" "}
                            {game.gamerscore ??
                              game.Gamerscore ??
                              "—"}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {games.length === 0 && !gameError && (
                <p className="achievement-empty">
                  No games were returned by the API.
                </p>
              )}
            </section>

            <section className="achievement-games">
              <div className="achievement-section-title">
                <div>
                  <span className="achievement-label">YOUR MILESTONES</span>
                  <h2>Achievements</h2>
                </div>
              </div>

              {achievementError && (
                <p className="achievement-inline-error">
                  {achievementError}
                </p>
              )}

              {achievements.length > 0 && (
                <div className="achievement-records">
                  {achievements.slice(0, 12).map((item, index) => (
                    <article
                      className="achievement-record"
                      key={item.id || item.name || index}
                    >
                      <div>
                        <h3>
                          {item.name ||
                            item.Name ||
                            item.title ||
                            `Achievement ${index + 1}`}
                        </h3>

                        <p>
                          {item.description ||
                            item.Description ||
                            "Xbox achievement"}
                        </p>
                      </div>

                      <span>
                        {isUnlocked(item) ? "UNLOCKED" : "NOT CONFIRMED"}
                      </span>
                    </article>
                  ))}
                </div>
              )}

              {achievements.length === 0 && !achievementError && (
                <p className="achievement-empty">
                  No achievement records were returned.
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default Achievements;
