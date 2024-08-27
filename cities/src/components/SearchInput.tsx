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

  &::placeholder {
    color: gray;
  }
`;

const SearchInput: FC<{ disabled: boolean }> = observer(() => {
  const {
    cities: { setQuery, loadCities, apiKey },
  } = useStores();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    const sanitizedQuery = escapeRegExp(query);

    setQuery(sanitizedQuery);
    loadCities();
  };

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  return (
    <StyledInput
      disabled={!apiKey}
      type="text"
      onChange={handleChange}
      placeholder="Введите запрос для поиска"
    />
  );
});

export default SearchInput;
