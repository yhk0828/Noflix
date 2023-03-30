const API_KEY = "177e5294830f7c9d7f647f132d2bc963";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface ISearchResult {
  id: number;
  name?: string;
  title?: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  original_title: string;
  release_date?: string; // 영화
  first_air_date?: string; // 시리즈
}

export interface IGetSearch {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
  dates: string;
}

// -------- Search movie
export function getSearchMovie(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1`
  ).then(response => {
    return response.json();
  });
}

// -------- Search Tv
export function getSearchTv(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`
  ).then(response => {
    return response.json();
  });
}