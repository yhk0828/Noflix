import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetResult } from "../Api/Api";
import * as H from "../StyledComponents/StyledHome";
import MovieSlider from "../Components/Movies/MovieSlider";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { makeImagePath } from "../Utils/Utils";

function Home() {
  // Nowplaying API
  const { data: now_data, isLoading: now_Loading } = useQuery<IGetResult>(
    ["movies", "now"],
    () => getMovies("now_playing")
  );
  // Popular(Trending Now) API
  const { data: pop_data, isLoading: pop_Loading } = useQuery<IGetResult>(
    ["movies", "popular"],
    () => getMovies("popular")
  );

  // Top Rated(High Rated) API
  const { data: top_data, isLoading: top_Loading } = useQuery<IGetResult>(
    ["movies", "top"],
    () => getMovies("top_rated")
  );

  // Top Rated(High Rated) API
  const { data: up_data, isLoading: up_Loading } = useQuery<IGetResult>(
    ["movies", "upcoming"],
    () => getMovies("upcoming")
  );

  // 배너 info > 모달 띄우는 버튼
  const navigate = useNavigate();
  const nowId = now_data?.results[0].id;
  

  return (
    <H.Wrapper>
      {now_Loading && pop_Loading && top_Loading && up_Loading ? (
        <H.Loader>Loaidng...</H.Loader>
      ) : (
        <>
          <Helmet>
            <title>Noflix - Movie</title>
          </Helmet>
          {/* -- 배너 영역 --  */}
          <H.Banner
            bgphoto={makeImagePath(now_data?.results[0].backdrop_path || "")}
          >
            <H.Title_and_Overview>
              <H.Title>{now_data?.results[0].title}</H.Title>
              <H.Overview>{now_data?.results[0].overview}</H.Overview>
              <H.Btn_Container>
                <H.PlayBtn>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  재생
                </H.PlayBtn>
                <H.InfoBtn onClick={() => navigate(`/movies/${nowId}`)}>
                  ⓘ 상세 정보
                </H.InfoBtn>
              </H.Btn_Container>
            </H.Title_and_Overview>
          </H.Banner>
          {/* -- 슬라이드 영역 -- */}
          <MovieSlider
            category="popular"
            title="현재 인기"
            data={pop_data}
          />
          <MovieSlider
            category="top_rated"
            title="높은 평점"
            data={top_data}
          />
          <MovieSlider
            category="now_playing"
            title="현재 상영중"
            data={now_data}
          />
          <MovieSlider 
            category="upcoming" 
            title="Coming soon" 
            data={up_data} 
          />
        </>
      )}
      <H.Footer>&#169; Copyright 2023. All rights reserved.</H.Footer>
    </H.Wrapper>
  );
}

export default Home;