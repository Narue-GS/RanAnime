import React from "react";
import "../css/anime.css";
import {BsArrowRightSquareFill} from "react-icons/bs"
import SortAnime from "./sortAnime";
import AnimeDetail from "./animeDetail"
const Anime = () => {
  const [anime, setData] = React.useState("");
  const [animeImage, setImage] = React.useState(null);
  const [evaluations, setEvaluation] = React.useState({});
  const [average, setAverage] = React.useState(0.00);
  const [animeId, setId] = React.useState("");
  const [loaded, setLoad] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const sortId = (n) => {
    return parseInt(Math.random()*n)
  }
  const showModal = () =>{
    setModal(true)
    checkAnimeInDB()
  }
  const checkAnimeInDB = async() =>{
    const checkBody = {id: animeId, image: animeImage, synopsis:anime.synopsis, name:anime.canonicalTitle, evaluations:evaluations}
    await fetch("http://127.0.0.1:3001/api/getAnime",{
    method: "POST",
    mode:'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type':'application/json',
    },
    body: JSON.stringify(checkBody)
    })  .then(res => res.json())
        .then(data =>{setAverage(data.response)})
}
  const getAnime = async() => {
    setLoad(false)
    await fetch(`https://kitsu.io/api/edge/anime/${sortId(5000)}`)
    .then((res) => res.json())
    .then((data) => setTimeout(() => {
      if(data.data != undefined){
        setData(data.data.attributes)
        setEvaluation(data.data.attributes.ratingFrequencies);
        setImage(data.data.attributes.posterImage.medium)
        setId(data.data.id)
        setTimeout(() => {
          setLoad(true)
        }, 500)} else {
          getAnime();
        }      
    }, 1500))
    
  }
  // posterImage.medium
  
  React.useEffect(() => {
    getAnime()
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
        <div className="anime-galery-left-arrow-box" onClick={getAnime}>
          <BsArrowRightSquareFill className="anime-galery-left-arrow"/>
        </div>
      </div>
      <div style={!modal? {display:"none"}:{}}>
        <AnimeDetail setModal={setModal} setAverage={setAverage} average={average} evaluations={evaluations} id={animeId} name={anime.canonicalTitle} image={animeImage} synopsis={anime.synopsis}/>
      </div>
    </>
  ); 
}
export default Anime;