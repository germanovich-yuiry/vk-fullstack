import { FC } from "preact/compat";

import styled from "styled-components";

import { Spin } from "antd";
import ErrorMessage from "./ErrorMessage";

import { observer } from "mobx-react-lite";
import { useStores } from "../root-store-context";

const Container = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  transition: max-height 0.4s ease-in-out;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};

  .loader {
    margin-bottom: 20px;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const LoadingText = styled.p`
  margin: 0;
`;

const Processing: FC = observer(() => {
  const {
    cities: { isError, isLoading, errorMessage, invalidToken, fetchError },
  } = useStores();

  const hasContent = isLoading || isError || invalidToken;

  return (
    <Container isOpen={hasContent}>
      {isLoading && (
        <LoadingContainer>
          <Spin className="loader" />
          <LoadingText>Идет загрузка...</LoadingText>
        </LoadingContainer>
      )}

      {isError && <ErrorMessage message={errorMessage} />}
      {invalidToken && <ErrorMessage message="Не валидный токен!" />}
      {fetchError && (
        <ErrorMessage message="Ошибка запроса!.. Проверьте соединение" />
      )}
    </Container>
  );
});

export default Processing;
