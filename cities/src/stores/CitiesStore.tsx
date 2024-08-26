import { makeAutoObservable } from "mobx";

import { City } from "../types/CityDTO";

import axios from "axios";

class CitiesStore {
  query: string = "";
  cities: City[] = [];
  errorMessage = "";
  isError = false;
  isLoading = false;
  idle = true;
  apiKey = "";
  invalidToken = false;

  constructor() {
    makeAutoObservable(this);
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  setQuery(query: string) {
    if (query.trim()) this.query = query;
  }

  async loadCities() {
    if (this.query) {
      try {
        this.invalidToken = false;
        this.isLoading = true;
        this.isError = false;
        this.errorMessage = "";

        let response = await axios.post(`http://localhost:3000/api/cities`, {
          key: this.apiKey,
          v: "5.199",
          query: this.query,
          lang: "ru",
        });

        if (response.data.error) {
          if (response.data.error.error_code === 5) {
            this.invalidToken = true;
          }
          throw new Error(response.data.error.error_msg);
        } else {
          this.cities = response.data.response.items;
        }
      } catch (error) {
        this.errorMessage = error.message;
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    }
  }
}

const store = new CitiesStore();
export const useCities = () => store.cities;
export const useStore = () => store;
