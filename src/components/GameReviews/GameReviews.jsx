import { useState } from "react";
import "./GameReviews.css";

const defaultReviews = [
  {
    id: 1,
    game: "Red Dead Redemption 2",
    author: "GameVerse",
    rating: 9.5,
    review:
      "An incredible open-world experience with an amazing story, characters and world.",
  },
  {
    id: 2,
    game: "Elden Ring",
    author: "GameVerse",
    rating: 9,
    review:
      "A challenging but rewarding action RPG with a huge world full of secrets.",
  },
  {
    id: 3,
    game: "Minecraft",
    author: "GameVerse",
    rating: 9,
    review:
      "One of the most creative games ever made. Build, explore and create almost anything.",
  },
  {
    id: 4,
    game: "Valorant",
    author: "GameVerse",
    rating: 8.5,
    review:
      "A competitive FPS with unique agents, tactical gameplay and plenty of room to improve.",
  },
];

function GameReviews() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("gameverseReviews");

    return savedReviews ? JSON.parse(savedReviews) : defaultReviews;
  });

  const [game, setGame] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!game || !author || !rating || !review) {
      alert("Please fill all the fields.");
      return;
    }

    const newReview = {
      id: Date.now(),
      game,
      author,
      rating: Number(rating),
      review,
    };

    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);

    localStorage.setItem(
      "gameverseReviews",
      JSON.stringify(updatedReviews)
    );

    setGame("");
    setAuthor("");
    setRating("");
    setReview("");
  };

  const deleteReview = (id) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== id
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      "gameverseReviews",
      JSON.stringify(updatedReviews)
    );
  };

  return (
    <div className="reviews-page">

      <div className="reviews-header">
        <p>GAMEVERSE REVIEWS</p>

        <h1>Game Reviews</h1>

        <span>
          Discover what gamers think and share your own experience.
        </span>
      </div>

      <div className="reviews-content">

        <div className="reviews-list">

          <h2>Latest Reviews</h2>

          {reviews.map((item) => (
            <div className="review-card" key={item.id}>

              <div className="review-top">

                <div>
                  <h3>{item.game}</h3>

                  <p className="review-author">
                    Reviewed by {item.author}
                  </p>
                </div>

                <div className="review-rating">
                  ⭐ {item.rating}/10
                </div>

              </div>

              <p className="review-text">
                {item.review}
              </p>

              {item.id !== 1 &&
                item.id !== 2 &&
                item.id !== 3 &&
                item.id !== 4 && (
                  <button
                    className="delete-review"
                    onClick={() => deleteReview(item.id)}
                  >
                    Delete
                  </button>
                )}

            </div>
          ))}

        </div>

        <div className="add-review">

          <h2>Write a Review</h2>

          <p>
            Share your experience with the Gameverse community.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Game name"
              value={game}
              onChange={(e) => setGame(e.target.value)}
            />

            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <input
              type="number"
              min="1"
              max="10"
              step="0.5"
              placeholder="Rating out of 10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <textarea
              placeholder="Write your review..."
              rows="5"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <button type="submit">
              Submit Review
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default GameReviews;
