import axios from "axios";

const fetchCities = (query: string, key: string) => {
  return axios.post(`http://localhost:3000/api/cities`, {
    key: key,
    v: "5.199",
    query: query,
    lang: "ru",
  });
};

export default fetchCities;
