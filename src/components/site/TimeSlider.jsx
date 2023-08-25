import { Slider } from "@mui/base/Slider";
import { useState } from "react";
import styled, { css } from "styled-components";

export default function TimeSlider() {
  const [value, setValue] = useState([0, 100]);
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(100);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    setYears(newValue);
  };

  return (
    <div className="sliderBox">
      <div className="valuesBox">
        <div className="values-text">{value[0]}</div>
        <div className="values-text">{value[1]}</div>
      </div>
      <div className="slider-wrapper">
        <Slider
          className="sliderMUI"
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          getAriaLabel={() => "Date Range"}
          // getAriaValueText={value}
          min={rangeMin}
          max={rangeMax}
        />
      </div>
    </div>
  );
}
