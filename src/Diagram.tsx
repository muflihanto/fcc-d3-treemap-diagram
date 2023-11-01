import { useSearchParams } from "react-router-dom";
import VideoGame from "./components/VideoGame";
import Movies from "./components/Movies";
import Kickstarter from "./components/Kickstarter";

const availableData = ["videogames", "movies", "kickstarter", null] as const;
type Data = (typeof availableData)[number] | (string & NonNullable<unknown>);

export default function Diagram() {
  const [query] = useSearchParams();

  switch (query.get("data") as Data) {
    case null:
    case "videogames":
      return <VideoGame />;
      break;
    case "movies":
      return <Movies />;
      break;
    case "kickstarter":
      return <Kickstarter />;
      break;
    default:
      return null;
  }
}
