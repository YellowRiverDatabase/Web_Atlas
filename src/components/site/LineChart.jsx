import { useRecoilValue } from "recoil";
import { groupedEventsState, sliderWidthState } from "./globalState";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// const svgStyles = {
//   position: "absolute",
//   bottom: "23%",
// };

export function LineChart({ sliderRef }) {
  const groupedEvents = useRecoilValue(groupedEventsState);
  const svgRef = useRef();
  const boxRef = useRef();
  const divWidth = useRecoilValue(sliderWidthState);
  // useEffect(() => {
  //   console.log("sliderRef", svgRef.current.width);
  //   console.log("divwidth:", divWidth);
  // }, [divWidth]);

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = divWidth * 2.2;
    const height = 150 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr(
        "transform",
        `translate(${divWidth / 1.7 + margin.left},${margin.top})`
      );

    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain(d3.extent(groupedEvents, (d) => d.date))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(groupedEvents, (d) => d.events.length))
      .range([height, -height]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.events.length));

    const bisect = d3.bisector((d) => d.date).left;

    svg
      .append("path")
      .datum(groupedEvents)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.7)
      .attr("d", line);
    // .on("mouseover", (event) => {
    //   // Get the current mouse position
    //   const [mx] = d3.pointer(event);

    //   // Convert the mouse position to a date
    //   const mouseDate = x.invert(mx);

    //   // Find the index of the data point closest to the mouse position
    //   const idx = bisect(groupedEvents, mouseDate);

    //   // Get the data point
    //   const d = groupedEvents[idx];

    //   console.log(d);
    // });

    // svg
    //   .append("g")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(d3.axisBottom(x));

    // svg.append("g").call(d3.axisLeft(y));
  }, [groupedEvents, divWidth]);

  // useEffect(() => {
  //   if (svgRef.current) {
  //     const slider = sliderRef.current;
  //     const svgElement = svgRef.current.nextSibling;
  //     const svgWidth = svgElement.getBoundingClientRect().width;
  //     console.log(svgElement.getBoundingClientRect().width);
  //     console.log(slider.getBoundingClientRect().width);
  //     setDivWidth(slider.getBoundingClientRect().width);
  //   }
  // }, [sliderRef.current.getBoundingClientRect().width]);

  return (
    // <div className="line-chart-box">
    <svg
      ref={svgRef}
      //style={svgStyles}
      className="line-chart"
    />
    // </div>
  );
}
