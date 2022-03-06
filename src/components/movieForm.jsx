import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <h1>Movie Form {params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/movies", { replace: true })}
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
