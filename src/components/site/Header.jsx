import styled from "styled-components";
export function Header() {
  const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 10%;
    min-height: 50px;
    width: 100%;
    background-color: #242424;
    border-bottom: 1px solid grey;
  `;
  return (
    <StyledWrapper>
      <h1>Yellow River Database Web Atlas</h1>
    </StyledWrapper>
  );
}
