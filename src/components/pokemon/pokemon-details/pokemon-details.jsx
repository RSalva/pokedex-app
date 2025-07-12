import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from "react-chartjs-2";


function pokemonDetails({ pokemon }) {
  console.debug("Pokemon data received:", pokemon);
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  const chartOptions = {
    scales: {
      r: {
        min: 0, 
        max: 200, 
        ticks: {
          stepSize: 10 
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: false
      }
    }
  }

  return (
    <div className="container border border-primary rounded mt-3 text-success" style={{"backgroundColor": "white"}}>
      <div className="row border rounded border-danger p-3 gap-3 d-flex flex-row">
        <div className="col border border-success rounded d-flex flex-column justify-content-between p-2">
          <h3 className="text-capitalize font-weight-bold">{pokemon.name}</h3>
          <p className="text-capitalize">{pokemon.description}</p>
          <div className="row m-2">
            <div className="col">
              <small className="text-muted">Height: </small>{pokemon.height} m
            </div>
            <div className="col">
              <small className="text-muted">Weight: </small>{pokemon.weight} Kg
            </div>
          </div>
          <div>
            <strong>Types: </strong>
            {pokemon.types.map((type) => (
              <span key={type.name} className="badge bg-primary me-1">{type.name}</span>
            ))}
          </div>
          <div>
            <strong>Abilities: </strong>
            {pokemon.abilities.map((ability) => (
              <span key={ability.name} className="badge bg-dark me-1">{ability.name}</span>
            ))}
          </div>
          <div>
            <strong>Habitat: </strong>
            <span>{pokemon.habitat}</span>
          </div>
          
        </div>

        <div className="col-md-5 d-flex align-items-center justify-content-center border rounded border-primary p-2">
          <img src={pokemon.image} />
        </div>
      </div>

      <div className="row border rounded border-warning p-2 gap-2 d-flex flex-row">
        <div className="col-md-8 border border-warning rounded d-flex flex-column justify-content-between p-2">
          <div className="col border rounded border-primary d-flex flex-column justify-content-between gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">HP</div>
              <div className="progress col-md-10"><div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow={"25"} aria-valuemin="0" aria-valuemax="100"></div></div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">Attack</div>
              <div className="progress col-md-10"><div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow={"25"} aria-valuemin="0" aria-valuemax="100"></div></div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">Defense</div>
              <div className="progress col-md-10"><div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow={"25"} aria-valuemin="0" aria-valuemax="100"></div></div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">Special-attack</div>
              <div className="progress col-md-10"><div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow={"25"} aria-valuemin="0" aria-valuemax="100"></div></div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">Special-defense</div>
              <div className="progress col-md-10"><div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow={"25"} aria-valuemin="0" aria-valuemax="100"></div></div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="col d-flex justify-content-end">Speed</div>
              <div className="progress col-md-10"><div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow={"25"} aria-valuemin="0" aria-valuemax="100"></div></div>
            </div>
          </div>
        </div>
        <div className="col d-flex align-items-center justify-content-center border rounded border-warning p-2">
          
          
          <div className="border rounded border-danger d-flex align-items-center justify-content-center">
            <Radar options={chartOptions} data={pokemon.statistics} />
          </div>
        </div>
      </div>

      {/* Only show the bottom div if the evolutions array is not empty */}
      <div className="row border rounded border-success p-2 gap-2 d-flex flex-row justify-content-between align-items-center">
        {/* Show every evolution as a <PokemonCard /> */}
      </div>

    </div>
  )
}

export default pokemonDetails;