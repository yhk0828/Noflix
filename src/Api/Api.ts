const API_KEY = "102f605c2159ec6db6b0ad1c315a2008";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IResult {
  // 공통
  id: number;
  backdrop_path: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
  // ------ seires 정보
  name: string;
  // ------ movies 정보
  title?: string;
}

export interface IGetResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IResult[];
  total_pages: number;
  total_results: number;
  first_air_date: string;
  genre_ids: number[];
}

export interface IGetDetail {
  // 공통
  id: number;
  backdrop_path: string;
  poster_path: string;

  overview: string;
  vote_average: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  // ------ movies 정보
  title: string;
  original_title?: string;
  // ------ seires 정보
  name: string;
  original_name?: string;
  first_air_date: string;
  release_date: string;
}

export interface IGetCredit {
  // 공통
  id: number;
  cast: [
    {
      id: number;
      name: string;
      original_name: string;
      character: string;
    }
  ];
  crew: [
    {
      id: number;
      known_for_department: string;
      name: string;
    }
  ];
}

export function getMovies(category: string) {
  return fetch(
    `${BASE_PATH}/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then(response => {
    return response.json();
  });
}

export function getMovieDetail(id: string) {
  return fetch(
    `${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then(response => {
    return response.json();
  });
}

export function getMovieCredit(id: string) {
  return fetch(
    `${BASE_PATH}/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
  ).then(response => {
    return response.json();
  });
}

// -------- Series(tv)
export function getSeries(tvCategory: string) {
  return fetch(
    `${BASE_PATH}/tv/${tvCategory}?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then(response => {
    return response.json();
  });
}

export function getSeriesDetail(tv_id: string) {
  return fetch(
    `${BASE_PATH}/tv/${tv_id}?api_key=${API_KEY}&language=ko-KR`
  ).then(response => {
    return response.json();
  });
}

export function getSeriesCredit(tv_id: string) {
  return fetch(
    `${BASE_PATH}/tv/${tv_id}/credits?api_key=${API_KEY}&language=ko-KR`
  ).then(response => {
    return response.json();
  });
}
