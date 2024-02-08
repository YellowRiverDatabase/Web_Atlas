import { useRecoilValue } from "recoil";
import { groupedEventsState, sliderWidthState } from "./globalState";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export function LineChart({ sliderRef }) {
  const groupedEvents = useRecoilValue(groupedEventsState);
  const svgRef = useRef();
  const boxRef = useRef();
  const divWidth = useRecoilValue(sliderWidthState);
  useEffect(() => {
    console.log(divWidth);
  }, [divWidth]);

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = divWidth - margin.left - margin.right;
    const height = 100 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain(d3.extent(groupedEvents, (d) => d.date))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(groupedEvents, (d) => d.events.length))
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.events.length));

    svg
      .append("path")
      .datum(groupedEvents)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

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
    <svg ref={svgRef} className="line-chart" />
    // </div>
  );
}
