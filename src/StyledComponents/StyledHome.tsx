import styled from "styled-components";
import { motion } from "framer-motion";


export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};
// -----------------------

export const Wrapper = styled.div`
  width: 100vw;
  overflow: hidden;
  font-size: 62.5%;
`;

export const Loader = styled.div`
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
`;

// ---배너 영역---

export const Banner = styled.div<{ bgphoto: string }>`
  // 배너 이미지
  width: 100vw;
  height: 90vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 1)
    ),
    url(${props => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  @media screen and (max-width: 1440px) {
    max-width: 100vw;
    height: 60vh;
  }
  @media screen and (max-width: 768px) {
    max-width: 100vw;
    height: 40vh;
  }
`;
export const Title_and_Overview = styled.div`
  // 타이틀, 설명 container
  width: 45vw;
  height: 45vh;
  margin-top: 25vh;
  margin-left: 60px;
  @media screen and (max-width: 1280px) {
    height: 30vh;
    margin-top: 15vh;
  }
  @media screen and (max-width: 768px) {
    width: 60vw;
    height: 20vh;
    margin-top: 5vh;
  }
  @media screen and (max-width: 480px) {
    width: 75vw;
    height: 15vh;
    margin-top: 5vh;
  }
`;

export const Title = styled.h2`
  // 영화제목
  font-size: 6.0rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 1px 2px 3px rgb(0, 0, 0, 0.6);
  @media screen and (max-width: 1280px) {
    /* 15.6인치 노트북 기준 */
    font-size: 40px;
  }
`;

export const Overview = styled.p`
  // 영화 설명
  font-size: 2.0rem;
  font-weight: 400;
  width: 70%;
  text-shadow: 1px 2px 4px rgb(0, 0, 0, 0.7);
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  @media screen and (max-width: 1280px) {
    /* 15.6인치 노트북 기준 */
    font-size: 20px;
  }
`;

export const Btn_Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 60vw;
`;

export const PlayBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  background-color: ${props => props.theme.white.lighter};
  font-size: 2.5rem;
  color: ${props => props.theme.black.darker};
  border-radius: 5px;
  text-align: center;
  margin-right: 15px;
  svg {
    margin-right: 5px;
  }
  cursor: pointer;
  :hover {
    background-color: rgba(238, 238, 238, 0.6);
  }
  @media screen and (max-width: 1280px) {
    /* 15.6인치 노트북 기준 */
    width: 120px;
    height: 40px;
    font-size: 2.0rem;
  }
  @media screen and (max-width: 768px) {
    /* 15.6인치 노트북 기준 */
    font-size: 1.8rem;
  }
`;

export const InfoBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 210px;
  height: 50px;
  background-color: rgba(75, 75, 75, 0.8);
  font-size: 25px;
  color: ${props => props.theme.white.lighter};
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: rgba(75, 75, 75, 0.5);
  }
  @media screen and (max-width: 1280px) {
    /* 15.6인치 노트북 기준 */
    width: 180px;
    height: 40px;
    font-size: 2.0rem;
  }
  @media screen and (max-width: 768px) {
    /* 15.6인치 노트북 기준 */
    font-size: 1.8rem;
  }
`;

// ---------- 슬라이드 영역
export const Slider = styled.div`
  margin-left: 3.6458vw;
  padding: 0;
  height: 220px;
  position: relative;
  top: -100px;
  margin-bottom: 30px;
  @media screen and (max-width: 1440px) {
    top: 20px;
  }
`;

export const Slider_Title = styled.h2`
  color: ${props => props.theme.white.lighter};
  font-size: 26px;
  margin-bottom: 15px;
  font-weight: 500;
`;

export const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 97%;
  position: absolute;
  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const RowBox = styled(motion.div)<{ bgphoto: string }>`
  height: 170px;
  margin-right: 5px;
  border-radius: 3px;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
  // 첫번째랑 마지막 포스터 scale 1.3 될때 잘리지않게
  &:first-child {
    transform-origin: center left !important;
  }
  &:last-child {
    transform-origin: center right !important;
  }
  @media screen and (max-width: 1280px) {
    /* 15.6인치 노트북 기준 */
    height: 135px;
  }
`;

export const RowBox_Info = styled(motion.div)`
  opacity: 0;
  padding: 10px;
  background-color: rgba(28, 28, 28, 0.6);
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 13px;
  }
`;

// ---------- 슬라이드 영역 : next,prev 버튼
export const prevBtn = styled.div`
  width: 30px;
  height: 30px;
  top: 110px;
  position: absolute;
  svg {
    fill: rgb(238, 238, 238);
    :hover {
      fill: rgba(238, 238, 238, 0.7);
    }
  }
  z-index: 1;
  cursor: pointer;
  @media screen and (max-width: 1280px) {
    /* 15.6인치 노트북 기준 */
    top: 90px;
  }
`;

export const nextBtn = styled.div`
  width: 30px;
  height: 30px;
  top: 110px;
  right: 3.6458%;
  position: absolute;
  svg {
    fill: rgb(238, 238, 238);
    :hover {
      fill: rgba(238, 238, 238, 0.7);
    }
  }
  z-index: 1;
  cursor: pointer;
  @media screen and (max-width: 1280px) {
    /* 15.6인치 노트북 기준 */
    top: 90px;
  }
`;

// ---------- 푸터 영역
export const Footer = styled.div`
  position: relative;
  bottom: 50px;
  font-size: 13px;
  text-align: center;
  color: #7c7c7c;
`;

