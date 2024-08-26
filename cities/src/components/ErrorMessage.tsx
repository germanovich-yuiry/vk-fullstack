import { FC } from "preact/compat";

import styled from "styled-components";

const MessageContainer = styled.div`
  width: 100%;
  color: red;
  text-align: left;
  text-indent: 12px;
`;
const ErrorMessage: FC<{ message: string }> = ({ message }) => {
  return <MessageContainer>{message}</MessageContainer>;
};

export default ErrorMessage;
