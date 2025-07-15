import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import PokemonCard from "../pokemon-card/pokemon-card";
import { useEffect, useState } from "react";
import { getPokemonById } from "../../../services/poke-api";
import PokemonList from "../pokemon-list/pokemon-list";
import { Link } from "react-router";

function PokemonDetails({ pokemon }) {
  console.debug("Pokemon data received:", pokemon);
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  const [audio, setAudio] = useState(
    new Audio(pokemon.cries)
  );

  useEffect(() => {
    setAudio(new Audio(pokemon.cries));
  }, [pokemon]);

  const playSound = () => {
    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play();
  };

  const chartOptions = {
    scales: {
      r: {
        min: 0,
        max: 200,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function getEvolutions() {
      const allEvolutions = await Promise.all(
        pokemon.evolutions.map((id) => getPokemonById(id))
      );
      setPokemonList(allEvolutions);
    }
    getEvolutions();
  }, []);

  return (
    <div
      className="container rounded"
      style={{ backgroundColor: "white" }}
    >
      <div className="row rounded p-3 gap-3 d-flex flex-row">
        <div className="col rounded shadow-sm d-flex flex-column justify-content-between p-2">
          <h3 className="text-capitalize font-weight-bold">{pokemon.name}</h3>
          <p className="mb-2">{pokemon.description}</p>
          <div className="row mb-2 w-auto">
            <div className="col-md-2 w-auto">
              <small>Height: </small>
              {pokemon.height} m
            </div>
            <div className="col-md-2 w-auto">
              <small>Weight: </small>
              {pokemon.weight} Kg
            </div>
          </div>
          <div>
            <strong>Types: </strong>
            {pokemon.types.map((type) => (
              <span key={type.name} className="badge bg-primary me-1">
                {type.name}
              </span>
            ))}
          </div>
          <div>
            <strong>Abilities: </strong>
            {pokemon.abilities.map((ability) => (
              <span key={ability.name} className="badge bg-dark me-1">
                {ability.name}
              </span>
            ))}
          </div>
          <div>
            <strong>Habitat: </strong>
            <span className="text-capitalize">{pokemon.habitat}</span>
          </div>
        </div>

        <div className="col-md-5 shadow-sm d-flex align-items-center justify-content-center rounded p-2 ">
          <img src={pokemon.image} className={"mw-100"} onClick={playSound}/>
        </div>
      </div>

      <div className="row rounded p-2 gap-2 d-flex flex-row">
        <div className="col-md-8 shadow-sm rounded d-flex flex-column justify-content-between p-2">
          <div className="col rounded d-flex flex-column justify-content-between gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">HP</div>
              <div className="progress col-md-10">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${
                      (pokemon.statistics.datasets[0].data[0] * 100) / 200
                    }%`,
                  }}
                  aria-valuenow={"25"}
                  aria-valuemin="0"
                  aria-valuemax="200"
                ></div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">Attack</div>
              <div className="progress col-md-10">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${
                      (pokemon.statistics.datasets[0].data[1] * 100) / 200
                    }%`,
                  }}
                  aria-valuenow={"25"}
                  aria-valuemin="0"
                  aria-valuemax="200"
                ></div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">Defense</div>
              <div className="progress col-md-10">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${
                      (pokemon.statistics.datasets[0].data[2] * 100) / 200
                    }%`,
                  }}
                  aria-valuenow={"25"}
                  aria-valuemin="0"
                  aria-valuemax="200"
                ></div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">
                Special-attack
              </div>
              <div className="progress col-md-10">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${
                      (pokemon.statistics.datasets[0].data[3] * 100) / 200
                    }%`,
                  }}
                  aria-valuenow={"25"}
                  aria-valuemin="0"
                  aria-valuemax="200"
                ></div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">
                Special-defense
              </div>
              <div className="progress col-md-10">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${
                      (pokemon.statistics.datasets[0].data[4] * 100) / 200
                    }%`,
                  }}
                  aria-valuenow={"25"}
                  aria-valuemin="0"
                  aria-valuemax="200"
                ></div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">Speed</div>
              <div className="progress col-md-10">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${
                      (pokemon.statistics.datasets[0].data[5] * 100) / 200
                    }%`,
                  }}
                  aria-valuenow={"25"}
                  aria-valuemin="0"
                  aria-valuemax="200"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex shadow-sm align-items-center justify-content-center rounded p-2">
          <div className="rounded d-flex align-items-center justify-content-center">
            <Radar options={chartOptions} data={pokemon.statistics} />
          </div>
        </div>
      </div>

      {pokemonList.length > 0 && (
        <div className="row rounded p-2 gap-2 d-flex flex-row justify-content-between align-items-center">
          <PokemonList pokemonList={pokemonList} className="justify-content-evenly" />
        </div>
      )}
      
    </div>
  );
}

export default PokemonDetails;
