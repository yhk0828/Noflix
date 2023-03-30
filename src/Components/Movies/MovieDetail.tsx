import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IGetCredit, IGetDetail } from "../../Api/Api";
import * as H from "../../StyledComponents/StyledHome";
import * as M from "../../StyledComponents/StyledModal";
import { makeImagePath } from "../../Utils/Utils";
import { getMovieCredit, getMovieDetail } from "../../Api/Api";
import { useEffect } from "react";

interface IDetailProps {
  category?: string;
  id: string;
}

function MovieDetail({ category, id }: IDetailProps) {
  const navigate = useNavigate();

  // movie detail API
  const {
    data: detailData,
    isLoading: detailLoading,
    refetch: refetchDetail,
  } = useQuery<IGetDetail>(["movie", `${category}_detail`, id], () =>
    getMovieDetail(id)
  );

  // movie credit API
  const {
    data: creditData,
    isLoading: creditLoading,
    refetch: refetchCredit,
  } = useQuery<IGetCredit>(["movie", `${category}_credit`, id], () =>
    getMovieCredit(id)
  );

  // 이전 데이터 띄워지지 않게 refetch 처리
  useEffect(() => {
    refetchDetail();
    refetchCredit();
  }, [id, refetchDetail, refetchCredit]); // id가 변경될 때마다 데이터 업데이트

  // 출연진 5명 불러오기
  const actor = creditData?.cast.slice(0, 5);
  // 감독 정보
  const director = creditData?.crew.find(
    people => people.known_for_department === "Directing"
  );
  // 영화 개봉 날짜
  const sub_Openday = detailData?.release_date.substring(0, 4);

  return (
    <>
      {detailLoading && creditLoading ? (
        <H.Loader>Loading...</H.Loader>
      ) : (
        <>
          <M.Overlay
            variants={M.overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => navigate(-1)}
          />
          <M.Modal
            variants={M.modalVariants}
            initial="initial"
            animate="click"
            exit="exit"
          >
            {detailData ? (
              <Helmet>
                <title>
                  {detailData.title
                    ? detailData.title
                    : detailData.original_title}
                </title>
              </Helmet>
            ) : (
              "Neonfilx"
            )}
            <M.Modal_Poster
              bgphoto={makeImagePath(
                detailData?.backdrop_path || detailData!.poster_path,
                "w500"
              )}
            />
            <M.Poster_prevBtn onClick={() => navigate(-1)}>✕</M.Poster_prevBtn>
            <M.Poster_Title>{detailData?.title}</M.Poster_Title>
            <M.Poster_MiniTitle>{detailData?.title}</M.Poster_MiniTitle>
            <M.Poster_infomation_top>
              <span>{sub_Openday}</span>
              {detailData?.genres.slice(0, 3).map((genre, index) => (
                <p id="genrs" key={genre.id}>
                  {genre.name}
                  {index !== detailData.genres.length - 1 && " · "}
                </p>
              ))}
              <span>
                ⭐
                {detailData?.vote_average
                  ? (detailData?.vote_average).toFixed(1)
                  : "not vote"}
              </span>
            </M.Poster_infomation_top>
            <M.Poster_infomation_bottom>
              <M.Poster_overview>{detailData?.overview === ""
                  ? "There is no overview."
                  : detailData?.overview}</M.Poster_overview>
              <M.Poster_actor_and_director>
                <M.Poster_actor>
                  <span>Casting:</span>
                  {actor?.map((cast, index) => (
                    <div key={cast.id}>
                      {cast.name ? cast.name : "No data"},
                    </div>
                  ))}
                </M.Poster_actor>
                <M.Poster_director>
                  <span>Director:</span>
                  {director?.name ? director?.name : "No data"}
                </M.Poster_director>
              </M.Poster_actor_and_director>
            </M.Poster_infomation_bottom>

          </M.Modal>
        </>
      )}
    </>
  );
}

export default MovieDetail;