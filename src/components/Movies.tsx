import data from "../data/movie-data.json";
import Treemap from "./Treemap";

export default function Movies() {
  return (
    <>
      <h1
        className="text-5xl font-bold text-center"
        id="title"
      >
        Movie Sales
      </h1>
      <p
        id="description"
        className="text-center mt-2"
      >
        Top 100 Highest Grossing Movies Grouped By Genre
      </p>
      <Treemap data={data} />
    </>
  );
}
