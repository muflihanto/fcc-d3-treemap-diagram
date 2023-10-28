import * as d3 from "d3";
import * as contrast from "get-contrast";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";

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
const color = d3.scaleOrdinal<string>().range(colors.map((color) => d3.interpolateRgb(color, "#fff")(0.2)));

export default function Treemap({ data }: { data: unknown }) {
  const { tooltip } = useOutletContext<ContextType>();
  const width = 960;
  const height = 600;
  const treemap = d3.treemap<Data>().size([width, height]).paddingInner(1)(
    d3
      .hierarchy<Data>(data as Data)
      .eachBefore((d) => (d.data.id = (d.parent ? `${d.parent.data.id}.` : "") + d.data.name))
      .sum((d) => parseFloat(d.value))
      .sort((a, b) => b.height - a.height || b.value! - a.value!)
  );

  return (
    <>
      <div className="flex flex-col items-center mt-8 overflow-scroll max-w-full lg:p-0 p-8">
        <svg
          id="tree-map"
          width={width}
          height={height}
          className="self-start lg:self-center"
        >
          {treemap.leaves().map((d) => {
            const { category, name, value, id } = d.data;
            return (
              <g
                className="group"
                key={id}
                transform={`translate(${d.x0},${d.y0})`}
              >
                <rect
                  id={id}
                  className="tile"
                  width={d.x1 - d.x0}
                  height={d.y1 - d.y0}
                  data-name={name}
                  data-category={category}
                  data-value={value}
                  fill={color(category)}
                  onMouseMove={(e) => {
                    tooltip?.style("opacity", "0.9");
                    tooltip
                      ?.html(`Name: ${name}<br>Category: ${category}<br>Value: ${value}`)
                      .attr("data-value", value)
                      .style("left", e.pageX + 16 + "px")
                      .style("top", e.pageY - 40 + "px");
                  }}
                  onMouseOut={() => {
                    tooltip?.style("opacity", 0);
                  }}
                />
                <text className="tile-text text-[10px]">
                  {name.split(" ").map((name, idx) => {
                    const ratios = ["#000", "#FFF"].map((c) => contrast.ratio(c, color(category)));
                    return (
                      <tspan
                        key={`${name}-${idx}`}
                        x={4}
                        y={12 + idx * 12}
                        fill={ratios[0] > ratios[1] ? "#000" : "#FFF"}
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
      <div className="flex flex-col items-center overflow-scroll max-w-full sm:p-0 p-4">
        <Legend treemap={treemap} />
      </div>
    </>
  );
}

function Legend({ treemap }: { treemap: d3.HierarchyRectangularNode<Data> }) {
  const width = 500;
  const categories = treemap
    .leaves()
    .map((d) => d.data.category)
    .filter((el, idx, arr) => arr.indexOf(el) === idx);

  const RECT_SIZE = 15;
  const H_SPACING = 150;
  const V_SPACING = 10;
  const elemsPerRow = Math.floor(width / H_SPACING);

  return (
    <svg
      id="legend"
      className="mt-4 self-start sm:self-center text-[14px]"
      width={width}
    >
      <g transform={"translate(60,10)"}>
        {categories.map((d, i) => {
          const [x, y] = [(i % elemsPerRow) * H_SPACING, Math.floor(i / elemsPerRow) * RECT_SIZE + V_SPACING * Math.floor(i / elemsPerRow)];
          return (
            <g
              key={d}
              transform={`translate(${x},${y})`}
            >
              <rect
                width={RECT_SIZE}
                height={RECT_SIZE}
                className="legend-item"
                fill={color(d)}
              />
              <text
                x={RECT_SIZE + 3}
                y={RECT_SIZE + -2}
              >
                {d}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
