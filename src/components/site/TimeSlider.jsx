import { Slider } from "@mui/base/Slider";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { yearsState } from "./globalState";

export default function TimeSlider() {
  const [value, setValue] = useState([-2070, 1916]);
  const [rangeMin, setRangeMin] = useState(-2070);
  const [rangeMax, setRangeMax] = useState(1916);
  const [years, setYears] = useRecoilState(yearsState);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    setYears(newValue);
  };

  return (
    // <div className="sliderBoxWrapper">
    <div className="sliderBox">
      <div className="slider-wrapper">
        <div className="values-text">{value[0]}</div>
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
        <div className="values-text">{value[1]}</div>
      </div>
    </div>
  );
}
