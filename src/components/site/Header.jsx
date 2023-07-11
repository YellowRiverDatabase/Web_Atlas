import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isEntryModalState } from "./globalState";
export function Header() {
  const isEntryModal = useRecoilValue(isEntryModalState);
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
    <>
      {!isEntryModal ? (
        <StyledWrapper>
          <h1>Yellow River Database Web Atlas</h1>
        </StyledWrapper>
      ) : null}
    </>
  );
}
