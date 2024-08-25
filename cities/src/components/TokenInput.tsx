import { FC } from "preact/compat";

import styled from "styled-components";
import debounce from "../utils/debounce";

import { observer } from "mobx-react-lite";
import { useStore } from "../stores/CitiesStore";

const TokenInput: FC = observer(() => {
  const store = useStore();

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    store.setApiKey((e.target as HTMLInputElement).value);
  }, 300);

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

  return (
    <StyledInput
      type="text"
      onChange={handleChange}
      placeholder="Введите токен доступа!"
    />
  );
});

export default TokenInput;
