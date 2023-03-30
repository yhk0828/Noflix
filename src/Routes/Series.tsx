import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import * as H from "../StyledComponents/StyledHome";
import { makeImagePath } from "../Utils/Utils";
import SeriesSlider from "../Components/Series/SeriesSlider";
import { getSeries, IGetResult } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";


function TvSeries() {
    

  const navigate = useNavigate();
  // popular API
  const { data: pop_data, isLoading: pop_Loading } = useQuery<IGetResult>(
    ["tv", "popular"],
    () => getSeries("popular")
  );

  // top_rated API
  const { data: top_data, isLoading: top_Loading } = useQuery<IGetResult>(
    ["tv", "topRated"],
    () => getSeries("top_rated")
  );

  // on_the_air API
  const { data: on_data, isLoading: on_Loading } = useQuery<IGetResult>(
    ["tv", "ontheair"],
    () => getSeries("on_the_air")
  );
  // backdrop_path 또는 poster_path 없는 경우를 위함
  // 시리즈 첫 이미지 안이뻐서 바꿈 원래는 0
  const imagePath = pop_data?.results[1].backdrop_path
    ? pop_data?.results[1].backdrop_path
    : pop_data?.results[1].poster_path;

  // 배너 영역 > 모달 띄우는 버튼
  const nowId = pop_data?.results[1].id;
  return (
    <H.Wrapper>
      {pop_Loading && top_Loading && on_Loading ? (
        <H.Loader>Loading...</H.Loader>
      ) : (
        <>
          <Helmet>
            <title>Noflix - Series</title>
          </Helmet>
          {/* -- 배너 영역 --  */}
          <H.Banner bgphoto={makeImagePath(imagePath || "")}>
            <H.Title_and_Overview>
              <H.Title>{pop_data?.results[1].name}</H.Title>
              <H.Overview>{pop_data?.results[1].overview}</H.Overview>
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
                <H.InfoBtn onClick={() => navigate(`/tv/${nowId}`)}>
                  ⓘ 상세 정보
                </H.InfoBtn>
              </H.Btn_Container>
            </H.Title_and_Overview>
          </H.Banner>
          <SeriesSlider
            category="popular"
            title="현재 인기"
            data={pop_data}
          />
          <SeriesSlider
            category="top_rated"
            title="높은 평점"
            data={top_data}
          />
          <SeriesSlider
            category="on_the_air"
            title="현재 상영중"
            data={on_data}
          />
        </>
      )}
      <H.Footer>&#169; Copyright 2023. All rights reserved.</H.Footer>
    </H.Wrapper>
  );
}

export default TvSeries;