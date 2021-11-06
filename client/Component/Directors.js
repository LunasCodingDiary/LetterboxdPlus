import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Directors = () => {
  const directors = useSelector((state) => state.directors); //mapStateToProps

  if (!directors || directors.length === 0) {
    return <CircularProgress />;
  }

  return (
    <div>
      {directors.map((director) => (
        <div key={director.id}>
          <Link to={`/directors/${director.id}`}>
            <div className="director">
              <p>{director.name}</p>
              {/* <p>{director.name}</p> */}
              <p>{director.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Directors;
