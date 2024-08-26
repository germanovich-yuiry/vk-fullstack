import { FC } from "preact/compat";

import styled from "styled-components";

import SearchInput from "./components/SearchInput";
import TokenInput from "./components/TokenInput";
import CityTable from "./components/CityTable";

import { observer } from "mobx-react-lite";
import { useCities, useStore } from "./stores/CitiesStore";

import Processing from "./components/Processing";

const Container = styled.div`
  min-width: 360px;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 36px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: "Regular";
`;

const Gap = styled.div`
  height: 20px;
`;
const App: FC = observer(() => {
  const cities = useCities();
  const token = useStore().apiKey;
  const query = useStore().query;

  return (
    <Container>
      <TokenInput />
      <SearchInput disabled={!!token} />

      <Gap />
      <Processing />
      <CityTable cities={cities} searchText={query} />
    </Container>
  );
});

export default App;
