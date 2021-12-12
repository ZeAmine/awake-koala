import React, { useState } from "react";
import Modal from "../../services/Modal";
import Films from "../Films/Films";
import close from "../../assets/images/close.png";
import "./Movie.css";

function Movie(props) {
  const posterPath =
    "https://image.tmdb.org/t/p/w500" + props.movie.poster_path;

  let divStyle = {
    backgroundImage: "url(" + posterPath + ")",
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="movie-card"
        style={divStyle}
      >
        <p className="movie-card-title">{props.movie.vote_average / 2}/5</p>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {(closeModal) => (
            <div>
              <div className="exit">
                <button onClick={closeModal}>
                  <img src={close} alt="cross-close" />
                </button>
              </div>
              <div onClick={closeModal} className="exitbis" />
              <Films id={props.movie.id} />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Movie;
