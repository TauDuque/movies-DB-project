import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.Response === "False") {
      setError({ show: true, msg: data.Error });
      setLoading(false);
    } else {
      setMovie(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (loading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          back to search page
        </Link>
      </div>
    );
  }
  const {
    Poster: poster,
    Title: title,
    Actors: cast,
    Genre: genre,
    Plot: plot,
    Director: director,
    Released: year,
    Awards: awards,
    Runtime: duration,
    Writer: script,
  } = movie;
  return (
    <section className="single-movie">
      <img src={poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <div className="extra-info">
          <p className="little-info">direct by:</p>
          <h4>{director}</h4>
        </div>
        <div className="extra-info">
          <p className="little-info">genre:</p>
          <h4>{genre}</h4>
        </div>
        <p className="plot-info">{plot}</p>
      <Link to="/" className="btn">
          back to search page
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
