import axios from "axios";
import {
  MovieGetIdResponse,
  MovieGetResponse,
} from "../models/MovieGetResponse.tsx";

const HOST: string = "http://www.omdbapi.com";
const apiKey = "700e98b1";

export class MovieService {
  static getMovieById(inputname: string) {
    throw new Error("Method not implemented.");
  }
  async getMovieByname(name: string, page: number) {
    const url = HOST + `/?apikey=${apiKey}&s=${name}&page=${page}`;
    const response = await axios.get(url);
    if (!response.data.Search) {
      return [];
    }
    const movies: MovieGetResponse[] = response.data.Search;
    return movies;
  }
  async getById(name: string) {
    const url = HOST + `/?apikey=${apiKey}&i=${name}`;
    const response = await axios.get(url);
    if (!response.data.Search) {
      return [];
    }
    const movies: MovieGetResponse[] = response.data.Search;
    return movies;
  }

  async getMovieById(id: string) {
    const url = HOST + `/?apikey=${apiKey}&i=${id}`;
    const response = await axios.get(url);
    if (!response.data) {
      return null;
    }
    const detailM: MovieGetIdResponse = response.data;
    return detailM;
  }
}
