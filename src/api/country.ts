import { Location } from "@/models/location";
import axios from "axios";
import { GlobalSummary } from "./global";
import { COVID19Response } from "./models/covidResponse";

const Covid19API = axios.create({
  baseURL: "https://api.covid19api.com",
  timeout: 2500 // 2.5 seconds
});

export default {
  /**
   * Returns a COVID19Response with Location in the data Obj
   *
   * @param countryCode CountryCode to fetch
   *
   * @returns COVID19Response
   */
  async fetchCountry(countryCode: string): Promise<COVID19Response> {
    const result = new COVID19Response();
    if (!countryCode) {
      result.message = "Not a valid country!";
      return result;
    }
    try {
      const response = await Covid19API.get(`/country/${countryCode}`);
      if (!response || !response.data) {
        throw "Unable to get data from database.";
      }
      result.success = response.status === 200;
      result.message = response.statusText;
      if (result.success) {
        const allData = response.data as Array<Location>;
        result.data = allData[allData.length - 1];
      }
    } catch (error) {
      if (typeof error === "string") {
        result.message = error;
      }
    }

    return result;
  },
  async fetchGlobalSummary(): Promise<COVID19Response> {
    const result = new COVID19Response();
    try {
      const response = await Covid19API.get("/summary");
      if (!response || !response.data) {
        throw "Unable to get data from database.";
      }
      result.success = response.status === 200;
      result.message = response.statusText;
      if (result.success) {
        const globalSummary = response.data as GlobalSummary;
        result.data = globalSummary;
      }
    } catch (error) {
      if (typeof error === "string") {
        result.message = error;
      }
    }
    return result;
  }
};
