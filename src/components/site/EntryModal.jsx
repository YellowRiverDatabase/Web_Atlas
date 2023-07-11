import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isEntryModalState } from "./globalState";
import "../../App.css";

export function EntryModal() {
  const [isEntryModal, setIsEntryModal] = useRecoilState(isEntryModalState);

  const closeModal = () => {
    setIsEntryModal(false);
  };

  const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);
  `;
  const ModalDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 500px;
    justify-content: center;
    background-color: white;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    z-index: 200;
  `;

  const Title = styled.h2`
    text-align: center;
    color: black;
  `;

  const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    margin-bottom: 20px;
  `;

  const ModalButton = styled.button`
    width: 20%;
    min-width: 75px;
  `;

  const BlackP = styled.p`
    color: black;
  `;

  return (
    <>
      {isEntryModal ? (
        <ModalWrapper>
          <ModalDiv>
            <Section>
              <Title>
                Welcome to the Web Atlas
                <br />
                for the Yellow River Database
              </Title>
              <BlackP>
                There will be more content here as we write a simple
                description.
              </BlackP>
            </Section>
            <ModalButton onClick={closeModal}>Close</ModalButton>
          </ModalDiv>
        </ModalWrapper>
      ) : null}
    </>
  );
}
