import { FC } from "preact/compat";

import styled from "styled-components";

import debounce from "../utils/debounce";

import { observer } from "mobx-react-lite";
import { useStore } from "../stores/CitiesStore";

const SearchInput: FC<{ disabled: boolean }> = observer(() => {
  const store = useStore();

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value;
    store.setQuery(query);
    store.loadCities();
  }, 300);

  const StyledInput = styled.input`
    width: 100%;
    height: 36px;
    text-indent: 16px;
    border-radius: 8px;
    border: 1px solid lightblue;
    margin-bottom: 20px;

    &:: placeholder {
      color: gray;
    }
  `;

  return (
    <StyledInput
      disabled={store.apiKey === ""}
      type="text"
      onChange={handleChange}
      placeholder="Введите запрос для поиска"
    />
  );
});

export default SearchInput;
