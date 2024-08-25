import { FC } from "preact/compat";

import styled from "styled-components";

const MessageContainer = styled.div`
  color: red;
`;
const ErrorMessage: FC<{ message: string }> = ({ message }) => {
  return <MessageContainer>{message}</MessageContainer>;
};

export default ErrorMessage;
