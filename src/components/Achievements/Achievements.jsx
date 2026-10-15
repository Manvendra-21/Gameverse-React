import { useState } from "react";
import "./Achievements.css";

const platforms = [
  {
    id: "steam",
    name: "Steam",
    icon: "S",
    placeholder: "Enter your Steam ID or profile URL",
  },
  {
    id: "xbox",
    name: "Xbox",
    icon: "X",
    placeholder: "Enter your Xbox Gamertag",
  },
  {
    id: "epic",
    name: "Epic Games",
    icon: "E",
    placeholder: "Enter your Epic Games display name",
  },
];

function Achievements() {
  const [selectedPlatform, setSelectedPlatform] =
    useState("steam");

  const [playerId, setPlayerId] = useState("");

  const currentPlatform = platforms.find(
    (platform) => platform.id === selectedPlatform
  );

  function handleSearch(event) {
    event.preventDefault();

    // API integration will be added later.
    // For now, clicking the button does nothing.
  }

  return (
    <section className="achievement-section">
      <div className="achievement-container">

        <div className="achievement-heading">
          <span className="achievement-kicker">
            PLAYER LOOKUP
          </span>

          <h2>
            Find Your <span>Gaming Profile</span>
          </h2>

          <p>
            Select a platform and enter your gaming ID.
          </p>
        </div>

        <div className="achievement-card">

          <div className="achievement-card-heading">
            <div>
              <span className="achievement-step">
                STEP 01
              </span>

              <h3>Select your platform</h3>
            </div>

            <span className="achievement-platform-count">
              03 PLATFORMS
            </span>
          </div>

          {/* Platform selection */}
          <div className="achievement-platforms">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                type="button"
                className={`achievement-platform ${
                  selectedPlatform === platform.id
                    ? "selected"
                    : ""
                } ${platform.id}`}
                onClick={() => {
                  setSelectedPlatform(platform.id);
                  setPlayerId("");
                }}
                aria-pressed={
                  selectedPlatform === platform.id
                }
              >
                <span className="achievement-platform-icon">
                  {platform.icon}
                </span>

                <span className="achievement-platform-info">
                  <strong>{platform.name}</strong>

                  <small>
                    {platform.id === "steam"
                      ? "PC Gaming"
                      : platform.id === "xbox"
                      ? "Xbox Gaming"
                      : "Epic Games Store"}
                  </small>
                </span>

                <span className="achievement-check">
                  {selectedPlatform === platform.id
                    ? "✓"
                    : ""}
                </span>
              </button>
            ))}
          </div>

          {/* Gaming ID input */}
          <form
            className="achievement-form"
            onSubmit={handleSearch}
          >
            <label htmlFor="achievement-player-id">
              <span className="achievement-step">
                STEP 02
              </span>

              Enter your {currentPlatform.name} ID
            </label>

            <div className="achievement-input-wrapper">
              <span className="achievement-search-icon">
                ⌕
              </span>

              <input
                id="achievement-player-id"
                type="text"
                placeholder={currentPlatform.placeholder}
                value={playerId}
                onChange={(event) =>
                  setPlayerId(event.target.value)
                }
                maxLength={200}
                autoComplete="off"
              />

              {playerId && (
                <button
                  type="button"
                  className="achievement-clear"
                  onClick={() => setPlayerId("")}
                  aria-label="Clear gaming ID"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="submit"
              className="achievement-submit"
            >
              FIND MY ACHIEVEMENTS
              <span>↗</span>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Achievements;