import { FC } from "preact/compat";

import styled from "styled-components";

import { Spin } from "antd";

import ErrorMessage from "./ErrorMessage";

import { observer } from "mobx-react-lite";
import { useStores } from "../root-store-context";

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const Processing: FC = observer(() => {
  const {
    cities: { isError, isLoading, errorMessage, invalidToken },
  } = useStores();

  return (
    <Container>
      {isLoading && (
        <div
          style={{ width: "100%", paddingLeft: "10px", marginBottom: "20px" }}
        >
          <Spin style={{ marginBottom: "12px" }} />
          <p>Идет загузка... </p>
        </div>
      )}
      {isError && <ErrorMessage message={errorMessage} />}
      {invalidToken && <ErrorMessage message="Не валидный токен!" />}
    </Container>
  );
});

export default Processing;
