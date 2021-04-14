import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
import { useFetch } from "./useFetch";
const defaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();
  const { error, loading, data: movie } = useFetch(`&i=${id}`);

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
      <img src={poster === "N/A" ? defaultImg : poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>
          {awards === "N/A" ? (
            <p className="little-info">no info available</p>
          ) : (
            awards
          )}{" "}
        </p>
        <div className="extra-info">
          <p className="little-info">direct by:</p>
          <h4>
            {director === "N/A" ? <p className="little-info">---</p> : director}
          </h4>
          <p className="little-info">genre:</p>
          <h4>
            {genre === "N/A" ? (
              <p className="little-info">no info available</p>
            ) : (
              genre
            )}
          </h4>
        </div>
        <p className="plot-info">
          {plot === "N/A" ? (
            <p className="little-info">no info available</p>
          ) : (
            plot
          )}
        </p>
        <div className="extra-info">
          <p className="little-info">duration:</p>
          <h4>
            {duration === "N/A" ? <p className="little-info">---</p> : duration}
          </h4>
          <p className="little-info"></p>
          <h4>{year === "N/A" ? <p className="little-info"></p> : year}</h4>
        </div>
        <p style={{ color: "darkslategrey", fontFamily: "helvetica" }}>
          {cast === "N/A" ? (
            <p className="little-info">no info available</p>
          ) : (
            cast
          )}
        </p>
        <div className="extra-info">
          <p className="little-info">writen by:</p>
          <h4>
            {script === "N/A" ? <p className="little-info">---</p> : script}
          </h4>
        </div>
        <div>
          <Link to="/" className="btn">
            search page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
