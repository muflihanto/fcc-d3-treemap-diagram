import data from "../data/kickstarter-funding-data.json";
import Treemap from "./Treemap";

export default function Kickstarter() {
  return (
    <>
      <h1
        className="text-5xl font-bold text-center"
        id="title"
      >
        Kickstarter Pledges
      </h1>
      <p
        id="description"
        className="text-center mt-2"
      >
        Top 100 Most Pledged Kickstarter Campaigns Grouped By Category
      </p>
      <Treemap data={data} />
    </>
  );
}
