import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import './Row.css';
import PropTypes from 'prop-types';

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, settrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };

    console.table(movies);

    const handleClick = (movie) => {
        movieTrailer(movie.name || "").then((url) => {
            const youTubeUrl = new URLSearchParams(new URL(url).search)
            settrailerUrl(youTubeUrl.get('v'));
        });
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {
                    movies.map((movie) => (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row_poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))
                }
            </div>
            <YouTube opts={opts} videoId={trailerUrl} />
        </div>
    )
}

Row.propTypes = {
    title: PropTypes.string.isRequired
}

Row.propTypes = {
    fetchUrl: PropTypes.string.isRequired
}

Row.propTypes = {
    isLargeRow: PropTypes.bool.isRequired
}

export default Row;