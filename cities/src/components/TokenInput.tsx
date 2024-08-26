import { FC } from "preact/compat";

import styled from "styled-components";

import { observer } from "mobx-react-lite";
import { useStores } from "../root-store-context";

const StyledInput = styled.input`
  width: 100%;
  height: 36px;
  text-indent: 16px;
  border-radius: 8px;
  border: 1px solid lightblue;
  margin-bottom: 20px;

  &::placeholder {
    color: red;
  }
  background-color: black;
  color: lightgreen;
`;

const TokenInput: FC = observer(() => {
  const {
    cities: { setApiKey },
  } = useStores();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey((e.target as HTMLInputElement).value);
  };

  return (
    <StyledInput
      type="text"
      onChange={handleChange}
      placeholder="Введите токен доступа!"
    />
  );
});

export default TokenInput;
