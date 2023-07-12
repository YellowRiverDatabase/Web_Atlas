import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isEntryModalState } from "./globalState";
import { Nav } from "./Nav";
import { Layers } from "./Layers";
export function Header() {
  const isEntryModal = useRecoilValue(isEntryModalState);
  const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10%;
    min-height: 50px;
    width: 100%;
    background-color: #242424;
    border-bottom: 1px solid grey;
    z-index: 100;
  `;
  return (
    <>
      {!isEntryModal ? (
        <StyledWrapper>
          <Nav />
          <h1>Yellow River Database Web Atlas</h1>
          <Layers />
        </StyledWrapper>
      ) : null}
    </>
  );
}
