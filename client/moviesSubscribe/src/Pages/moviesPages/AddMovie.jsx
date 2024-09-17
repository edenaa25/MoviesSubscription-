import React, { useState } from "react";
import { addMovie } from "../../Services/moviesService";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddMovie() {
  const navigate = useNavigate();
  const permissions = useSelector((state) => state.users.permissions);
  const hasCreateMoviesPermission = permissions.includes("Create Movies");
  const [movieData, setMovieData] = useState({
    Name: "",
    Image: "",
    Genres: [],
    Premiered: "",
  });

  if (!hasCreateMoviesPermission) {
    return <p>You do not have permission to view movies.</p>;
  }

  const handleGenresChange = (e) => {
    const genresArray = e.target.value.split(",").map((genre) => genre.trim());
    setMovieData({ ...movieData, Genres: genresArray });
  };

  const handleAddMovie = async (event) => {
    event.preventDefault();
    const { Name, Image, Genres, Premiered } = movieData;
    if (!Name || !Image || !Genres.length || !Premiered) {
      alert("Please fill in all fields");
    } else {
      try {
        // Convert dd/mm/yyyy to ISO format
        const [day, month, year] = movieData.Premiered.split("/");
        const formattedDate = `${year}-${month}-${day}`;
        const dateObj = new Date(formattedDate);
        // Check if the constructed date is valid
        if (isNaN(dateObj.getTime()) || !day || !month || !year) {
          alert("Invalid Premired format. Please use dd/mm/yyyy.");
          throw new Error("Invalid Premired format. Please use dd/mm/yyyy.");
        }

        const isoDate = dateObj.toISOString();
        const updatedMovieData = { ...movieData, Premiered: isoDate };
        const result = await addMovie(updatedMovieData);
        console.log(result);
        setMovieData({ Name: "", Image: "", Genres: [], Premired: "" });
        alert("Adding a movie was done successfully");
      } catch (error) {
        console.error("add movie failed:", error.message);
      }
    }
  };

  return (
    <div  className='margin padding  width'>
      <h1>Add Movie:</h1>
      <form onSubmit={handleAddMovie}>
        <div className='formMargin'>
            Name:{" "}
            <input
              type="text"
              value={movieData.Name || ""}
              onChange={(e) => setMovieData({ ...movieData, Name: e.target.value })}
            />{" "}
        </div>
        <div className='formMargin'>
          Genres:{" "}
          <input
            type="text"
            value={movieData.Genres.join(', ') || ""}
            placeholder="genre 1, genre2..."
            onChange={handleGenresChange}
          />{" "}
        </div>
        <div className='formMargin'>
          Image URL:{" "}
          <input
            type="text"
            value={movieData.Image || ""} 
            onChange={(e) =>
              setMovieData({ ...movieData, Image: e.target.value })
            }
          />{" "}
        </div>
        <div className='formMargin'>
          Premiered:{" "}
          <input
            type="text"
            value={movieData.Premiered || ""}
            placeholder="dd/mm/yyyy"
            onChange={(e) =>
              setMovieData({ ...movieData, Premiered: e.target.value })
            }
          />{" "}
        </div>
        <button type="submit">save</button>
        <button type="button" onClick={() => navigate("/main/movies")}>
          cancle
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
