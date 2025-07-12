import { Link } from "react-router";
import { motion } from "motion/react";

function PokemonCard({ pokemon, isLoading }) {
  if (isLoading) {
    return (
      <div className="card text-center shadow-sm h-100 d-flex flex-column justify-content-between p-2">
        <img
          className="card-img-top"
          src="../../../../src/assets/images/loading/loading-pokeball.gif"
          alt="loading"
          style={{ height: "170px", width: "246.39" }}
        />
      </div>
    );
  } else {
    return (
      <motion.div
        className="card text-center shadow-sm h-100 d-flex flex-column justify-content-between p-2"
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          className="card-img-top"
          src={pokemon.image}
          alt={pokemon.name}
          style={{ height: "100px" }}
        />
        <div className="card-body d-flex flex-column justify-content-end pb-1">
          <h5 className="card-title">{pokemon.name?.toUpperCase()}</h5>
          <Link
            to={`/pokemon/${pokemon.id}`}
            className="stretched-link text-decoration-none"
          ></Link>
          <div className="card-text d-flex justify-content-between">
            <span className="badge text-bg-danger d-flex align-self-center">{`#${pokemon.id}`}</span>
            <div>
              {pokemon.types.map((type) => (
                <img
                  src={type.icon}
                  alt={type.name}
                  height={30}
                  key={type.name}
                  className="p-1"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default PokemonCard;
