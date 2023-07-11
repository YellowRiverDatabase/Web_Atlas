import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isEntryModalState } from "./globalState";

export function EntryModal() {
  const [isEntryModal, setIsEntryModal] = useRecoilState(isEntryModalState);

  const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  `;
  const ModalDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
  `;

  return (
    <>
      {isEntryModal && (
        <ModalWrapper>
          <ModalDiv>
            <h1>Yellow River Database Web Atlas</h1>
          </ModalDiv>
        </ModalWrapper>
      )}
    </>
  );
}
