import { makeAutoObservable } from "mobx";

import { City } from "../types/CityDTO";

import axios from "axios";

class CitiesStore {
  query: string = "";
  cities: City[] = [];
  errorMessage = "";
  isError = false;
  loading = false;
  idle = true;
  apiKey = "";

  constructor() {
    makeAutoObservable(this);
  }

  setApiKey(key: string) {
    this.apiKey = key;
    console.log(key);
  }

  setQuery(query: string) {
    if (query.trim()) this.query = query;
  }

  async loadCities() {
    if (this.query) {
      try {
        this.loading = true;
        this.isError = false;
        this.errorMessage = "";

        let response = await axios.post(`http://localhost:3000/api/cities`, {
          key: this.apiKey,
          v: "5.199",
          query: this.query,
          lang: "ru",
        });

        this.cities = response.data.response.items;
      } catch (error) {
        this.errorMessage = "Ошибка при загрузке данных: " + error.message;
        this.isError = true;
      } finally {
        this.loading = false;
      }
    }
  }
}

const store = new CitiesStore();
export const useCities = () => store.cities;
export const useStore = () => store;
