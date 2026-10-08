import { useState } from "react";
import "./GameDiscovery.css";

const gameData = [
  {
    genre: "Action",
    icon: "⚔️",
    games: [
      {
        name: "Grand Theft Auto V",
        image:
          "https://wallpapercat.com/w/full/f/e/c/2475-1920x1080-desktop-1080p-grand-theft-auto-5-background-image.jpg",
        rating: "9/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Explore Los Santos in this massive open-world action game filled with missions, vehicles, characters and an engaging story.",
      },
      {
        name: "God of War",
        image:
          "https://static0.polygonimages.com/wordpress/wp-content/uploads/chorus/uploads/chorus_asset/file/10649475/gow_1.jpg?w=1600&h=900&fit=crop",
        rating: "9.5/10",
        platforms: "PC • PlayStation",
        description:
          "Follow Kratos and Atreus through an emotional adventure inspired by Norse mythology.",
      },
      {
        name: "Spider-Man Remastered",
        image:
          "https://cdn.mos.cms.futurecdn.net/sq6BtHCx5JAEiskezykaEL.jpg",
        rating: "9/10",
        platforms: "PC • PlayStation",
        description:
          "Swing through New York City as Spider-Man while fighting criminals and protecting the city.",
      },
    ],
  },

  {
    genre: "Adventure",
    icon: "🗺️",
    games: [
      {
        name: "Minecraft",
        image:
          "https://i.pinimg.com/736x/cb/d3/41/cbd34142d5cc761babe03d573d366fc6.jpg",
        rating: "9/10",
        platforms: "PC • PlayStation • Xbox • Mobile",
        description:
          "Build, explore and survive in a massive procedurally generated world.",
      },
      {
        name: "Uncharted 4",
        image:
          "https://m.media-amazon.com/images/M/MV5BNTFmN2M0MGMtMTI5Ny00NzRlLWFlZGYtZDM0N2VmOTUwYTdmXkEyXkFqcGc@._V1_.jpg",
        rating: "9/10",
        platforms: "PC • PlayStation",
        description:
          "Join Nathan Drake on a thrilling treasure hunting adventure across the world.",
      },
      {
        name: "Tomb Raider",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQvuf86q52z0Uw9abvgZo64U7kqxNsYC9kQ9s1tHvIWA&s",
        rating: "8.5/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Explore dangerous environments and uncover ancient mysteries as Lara Croft.",
      },
    ],
  },

  {
    genre: "RPG",
    icon: "🧙",
    games: [
      {
        name: "Elden Ring",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-0ucoMWlzIwRDhn-RVsUG7xTkBagCVPdU2z41thhNIA&s",
        rating: "10/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Explore a huge fantasy world filled with powerful enemies, mysterious locations and challenging bosses.",
      },
      {
        name: "The Witcher 3",
        image:
          "https://press.cdn.cdpr.app/news/33a063fc417f1a4ccd362849de934bb1_q90_1024x576.png",
        rating: "9.5/10",
        platforms: "PC • PlayStation • Xbox • Switch",
        description:
          "Become Geralt of Rivia and explore a huge fantasy world filled with monsters and quests.",
      },
      {
        name: "Cyberpunk 2077",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQekME9O6F62pK3eAUasR_DkotVTe1er2p9AYMcwIROrA&s",
        rating: "9/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Explore Night City in a futuristic open-world RPG packed with missions and characters.",
      },
    ],
  },

  {
    genre: "Sports",
    icon: "⚽",
    games: [
      {
        name: "EA Sports FC 25",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD68gmk784zCTUJYbLYU25JNqjVdKol8XhdX3_l2c93w&s=10",
        rating: "8.5/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Experience realistic football gameplay with real teams, players and competitions.",
      },
      {
        name: "NBA 2K25",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY_E90fugkfHZ_6yLzDxCKoswCtHMUqyneLjsQ2rcxAQ&s=10",
        rating: "8.5/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Experience realistic basketball gameplay with NBA teams and players.",
      },
      {
        name: "WWE 2K25",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGS1HHatKfypI2kFNblsypg3V6Zzkb8YIWSEJd-TF2A&s=10",
        rating: "8/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Enter the ring and play as your favorite WWE superstars.",
      },
    ],
  },

  {
    genre: "Racing",
    icon: "🏎️",
    games: [
      {
        name: "Forza Horizon 5",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKq_eINHbfhOThv-dIO-vtTfBWFtKU5H65lNji5nQwTg&s=10",
        rating: "9.5/10",
        platforms: "PC • Xbox",
        description:
          "Race through a beautiful open-world version of Mexico with hundreds of cars.",
      },
      {
        name: "Need for Speed Heat",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BQ149YPJmXMOsj1hGDWJw9fPH9UGvNavF9u3z2mWuQ&s=10",
        rating: "8.5/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Compete in intense street races and customize your favorite cars.",
      },
      {
        name: "F1 25",
        image:
          "https://upload.wikimedia.org/wikipedia/en/9/9e/F1_25_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
        rating: "9/10",
        platforms: "PC • PlayStation • Xbox",
        description:
          "Experience Formula 1 racing with realistic cars, tracks and competition.",
      },
    ],
  },

  {
    genre: "Strategy",
    icon: "♟️",
    games: [
      {
        name: "Age of Empires IV",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1fgJSda1vcRG8gOT2yvgsW57QOn49BZ_sgw1YV-gIhA&s=10",
        rating: "9/10",
        platforms: "PC",
        description:
          "Build civilizations, manage resources and conquer your opponents.",
      },
      {
        name: "Civilization VI",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2X3IuPd_w2H-UhlYV0oxHuIvlfcMDawK3wHzO546ig&s=10",
        rating: "9/10",
        platforms: "PC • PlayStation • Xbox • Switch",
        description:
          "Build and develop your civilization from ancient times to the modern era.",
      },
      {
        name: "Clash of Clans",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCahKNCD2M4cmH-MU1WH97KHNqJxIt0YAYefIcPv3A0w&s",
        rating: "8.5/10",
        platforms: "Android • iOS",
        description:
          "Build your village, train your army and attack other players.",
      },
    ],
  },
];

function GameDiscovery() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const selectGenre = (index) => {
    setSelectedGenre(index);
  };

  return (
    <div className="game-discovery">

      {/* =========================
          HEADER
      ========================= */}

      <div className="discovery-header">

        <p className="discovery-small-title">
          GAMEVERSE
        </p>

        <h1>Game Discovery</h1>

        <p className="discovery-description">
          Discover your next favorite game.
          Choose a genre below to explore games worth playing.
        </p>

      </div>


      {/* =========================
          GENRE TITLE
      ========================= */}

      <div className="genre-title">

        <h2>Choose a Genre</h2>

        <p>
          Explore games based on what you love to play.
        </p>

      </div>


      {/* =========================
          GENRE BOXES
      ========================= */}

      <div className="genre-grid">

        {gameData.map((genre, index) => (

          <button
            className={`genre-box ${
              selectedGenre === index ? "active" : ""
            }`}
            key={genre.genre}
            onClick={() => selectGenre(index)}
          >

            <span className="genre-icon">
              {genre.icon}
            </span>

            <span className="genre-name">
              {genre.genre}
            </span>

            <span className="genre-arrow">
              →
            </span>

          </button>

        ))}

      </div>


      {/* =========================
          SELECTED GAME SECTION
      ========================= */}

      {selectedGenre !== null && (

        <div className="game-sections">

          <section className="game-genre-section">

            {/* SECTION HEADING */}

            <div className="section-heading">

              <span className="section-icon">
                {gameData[selectedGenre].icon}
              </span>

              <div>

                <h2>
                  {gameData[selectedGenre].genre} Games
                </h2>

                <p>
                  Popular{" "}
                  {gameData[selectedGenre].genre.toLowerCase()}{" "}
                  games you should check out.
                </p>

              </div>

            </div>


            {/* GAME CARDS */}

            <div className="games-grid">

              {gameData[selectedGenre].games.map((game) => (

                <div
                  className="game-card"
                  key={game.name}
                >

                  {/* GAME IMAGE */}

                  <div className="game-image-container">

                    <img
                      src={game.image}
                      alt={game.name}
                    />

                  </div>


                  {/* GAME CONTENT */}

                  <div className="game-card-content">

                    <div className="game-rating">
                      ⭐ {game.rating}
                    </div>

                    <h3>
                      {game.name}
                    </h3>

                    <p>
                      {game.description}
                    </p>

                    <div className="game-platform">
                      🎮 {game.platforms}
                    </div>

                    <button className="game-button">
                      View Game
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>

      )}

    </div>
  );
}

export default GameDiscovery;