import * as d3 from "d3";
import * as contrast from "get-contrast";

export interface Data {
  name: string;
  category: string;
  value: string;
  id?: string;
}
export interface DataCollection {
  name: string;
  children: {
    name: string;
    children: Data[];
  }[];
}

const colors = ["rgb(53,97,143)", "rgb(161,216,50)", "rgb(250,121,245)", "rgb(26,213,74)", "rgb(222,43,113)", "rgb(103,218,188)", "rgb(117,46,79)", "rgb(105,144,35)", "rgb(161,19,178)", "rgb(252,209,7)", "rgb(81,62,180)", "rgb(208,217,174)", "rgb(37,36,249)", "rgb(253,143,32)", "rgb(129,132,251)", "rgb(132,84,26)", "rgb(117,179,216)", "rgb(11,83,19)", "rgb(243,197,250)", "rgb(214,6,26)"];

export default function Treemap({ data }: { data: unknown }) {
  const width = 960;
  const height = 600;

  const color = d3.scaleOrdinal<string>().range(colors.map((color) => d3.interpolateRgb(color, "#fff")(0.2)));
  const treemap = d3.treemap<Data>().size([width, height]).paddingInner(1)(
    d3
      .hierarchy<Data>(data as Data)
      .eachBefore((d) => (d.data.id = (d.parent ? `${d.parent.data.id}.` : "") + d.data.name))
      .sum((d) => parseFloat(d.value))
      .sort((a, b) => b.height - a.height || b.value! - a.value!)
  );

  return (
    <div className="flex flex-col items-center mt-8 overflow-scroll max-w-full">
      <svg
        id="tree-map"
        width={width}
        height={height}
        className="self-start lg:self-center"
      >
        {treemap.leaves().map((d) => {
          return (
            <g
              className="group"
              key={d.data.id}
              transform={`translate(${d.x0},${d.y0})`}
            >
              <rect
                id={d.data.id}
                className="tile"
                width={d.x1 - d.x0}
                height={d.y1 - d.y0}
                data-name={d.data.name}
                data-category={d.data.category}
                data-value={d.data.value}
                fill={color(d.data.category)}
              />
              <text className="tile-text text-[10px]">
                {d.data.name.split(" ").map((name, idx) => {
                  return (
                    <tspan
                      key={`${name}-${idx}`}
                      x={4}
                      y={12 + idx * 12}
                      fill={contrast.ratio("#000", color(d.data.category)) > 10 ? "#000" : "#FFF"}
                    >
                      {name}
                    </tspan>
                  );
                })}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
