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
  fetchError: boolean = false;

  constructor() {
    makeAutoObservable(this);

    this.loadCities = debounce(
      this.loadCities.bind(this),
      600
    ) as () => Promise<void>;
  }

  setApiKey = (key: string) => {
    this.apiKey = key;
  };

  setQuery = (query: string) => {
    this.query = query;
    if (query.trim()) {
      this.loadCities();
    } else {
      this.cities = [];
    }
  };

  loadCities = async () => {
    if (this.query.trim() && !this.isLoading) {
      try {
        runInAction(() => {
          this.invalidToken = false;
          this.isLoading = true;
          this.isError = false;
          this.errorMessage = "";
        });

        let response = await fetchCities(this.query, this.apiKey);

        if (response.data.error) {
          if (response.data.error.error_code === 5)
            throw new Error("Вы ввели не валидный токен!");
          if (response.data.error.error_code === 777)
            throw new Error("Ошибка при запросе! Проверьте подключение!");
        } else {
          this.cities = response.data.response.items;
          this.isError = false;
        }
      } catch (error: any) {
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
