const NoImage = require("../assets/images/noimage.png");

/** 이미지 경로 만들어주는 함수 */
export function makeImagePath(id: string, format?: string) {
  if (id === "" || id === null || id === undefined) {
    return NoImage;
  } else {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  }
}