import { DragHandle, InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";
import { Link, useHistory } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [signedUrl, setSignedUrl] = useState("");
  const history = useHistory();
  
  useEffect(async () => {
    const getRandomContent = async () => {
      // 무작위 컨텐츠 데이터 가져오기
      try {
        const res = await axios.get(`https://dev.theotters.net/movies/randoms?type=${type}`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        })
        setContent(res.data.ro); // 가져온 데이터를 피쳐 컨텐츠(홈페이지 큰 화면에 들어가는 것)로 설정
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();

  }, [type]);

  useEffect(async () => {
    try {
      const resp  = await axios.get(`https://dev.theotters.net/signedUrl?movieId=${content.id}`, {
        headers: {
          Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        }
      });
      setSignedUrl(resp.data.signedUrl);
    } catch (err) {
      console.log(err)
    }
  })

  const onClick = async () => {
    history.push("/watch", { signedUrl });
  }

  return (
    <div className="featured">
      {type && ( // 분류에서 type 은 영화와 시리즈 둘로 나뉨(movies 아니면 Series로 감)
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      {/* 큰 화면으로 보이는 무작위 컨텐츠 이미지 */}
      <img src={content.thumbnail} alt="featured content image" />
      <div className="info">
        <span className="contentTitle">{content.title}</span>
        <span className="desc">{content.desc}</span>
        <div className="buttons">
            <button className="play" onClick={onClick}>
              <PlayArrow />
              <span>Play</span>
            </button>
          {/* 컨텐츠 상세 보기 페이지를 만들 경우 링크 연결           */}
            <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
