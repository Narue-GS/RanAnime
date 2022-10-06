import React from "react";
import "../css/anime.css";
import {BsArrowRightSquareFill} from "react-icons/bs"
import SortAnime from "./sortAnime";
import AnimeDetail from "./animeDetail"
const Anime = () => {
  const [anime, setData] = React.useState("");
  const [animeImage, setImage] = React.useState(null);
  const [loaded, setLoad] = React.useState(false)
  const [modal, setModal] = React.useState(false)  
  const sortId = (n) => {
    return parseInt(Math.random()*n)
  }
  const showModal = () => setModal(true)

  const getAnime = async() => {
    await fetch(`https://kitsu.io/api/edge/anime/${sortId(5000)}`)
    .then((res) => res.json())
    .then((data) => setTimeout(() => {
      setData(data.data.attributes)
      setImage(data.data.attributes.posterImage.medium)
      setTimeout(() => {
        setLoad(true)
      }, 500);
    }, 1500))
  }
  // posterImage.medium
  
  React.useEffect(() => {
    if(anime == ""){
      getAnime()
    }
  }, []);
 
  return (
    <>
      <div className="loading-anime" style={loaded? {display:"none"} : {display:"block"}}>
        <SortAnime/>
      </div>
      <div className="anime-galery" style={!loaded || modal? {display:"none"} : {display:"flex"}}>
        <div className="anime" id="secundary-card">
          <img  src={animeImage} />
          <span id="secundary-card-text" className="anime-title">{!anime.canonicalTitle? "Carregando..." : anime.canonicalTitle }</span>
        </div>
        <div className="anime" id="main-card" onClick={showModal}>
          <img  src={animeImage} />
          <span id="main-card-title" className="anime-title">{!anime.canonicalTitle? "Carregando..." : anime.canonicalTitle }</span>
        </div>
        <div className="anime" id="secundary-card">
          <img  src={animeImage} />
          <span id="secundary-card-text" className="anime-title">{!anime.canonicalTitle? "Carregando..." : anime.canonicalTitle }</span>
        </div>
        <div onClick={getAnime}>
          <BsArrowRightSquareFill className="anime-galery-left-arrow"/>
        </div>
      </div>
      <div style={!modal? {display:"none"}:{}}>
        <AnimeDetail text={anime.canonicalTitle} image={animeImage} synopsis={anime.synopsis} score={anime.averageRating}/>
      </div>
    </>
  ); 
}
export default Anime;
