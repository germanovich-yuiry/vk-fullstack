import { City } from "../types/CityDTO";

import { makeAutoObservable, runInAction } from "mobx";

import fetchCities from "../services/fetchCities";

import { debounce } from "lodash";
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

    this.loadCities = debounce(this.loadCities.bind(this), 400);
  }

  setApiKey = (key: string) => {
    this.apiKey = key;
  };

  setQuery = (query: string) => {
    if (query.trim()) {
      this.query = query;
      this.loadCities();
    }
  };

  loadCities = async () => {
    if (this.query.trim()) {
      try {
        runInAction(() => {
          this.invalidToken = false;
          this.isLoading = true;
          this.isError = false;
          this.errorMessage = "";
        });

        let response = await fetchCities(this.query, this.apiKey);

        if (response.data.error) {
          if (response.data.error.error_code === 5) {
            this.invalidToken = true;
          }
          throw new Error(response.data.error.error_msg);
        } else {
          this.cities = response.data.response.items;
        }
      } catch (error) {
        runInAction(() => {
          this.errorMessage = error.message;
          this.isError = true;
        });
      } finally {
        this.isLoading = false;
      }
    }
  };
}

export default new CitiesStore();
