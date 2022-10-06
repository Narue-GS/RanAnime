import React from "react";
import "./App.css";
import Anime from "./components/jsx/anime";
const App = () => { 
  const test = "test suscefull"
  return (
    <>
      <Anime />
    </>
  ); 
}
export default App;

// import React from "react";
// import "./App.css";
// import { GiPerspectiveDiceSixFacesFive } from 'react-icons/gi';
// import "./components/anime/sortAnime.css"
// const App = () => {
//   const [anime, setData] = React.useState("Carregando");
//   const [animeImage, setImage] = React.useState(null);
//   const [animeList, setList] = React.useState([])
//   const [init, setInit] = React.useState(false);
//   const sortId = (n) => {
//     return parseInt(Math.random()*n)
//   }



//   const getAnime = async() => {
//     await fetch(`https://kitsu.io/api/edge/anime/${sortId(5000)}`)
//     .then((res) => res.json())
//     .then((data) => setTimeout(() => {
//       setData(data.data.attributes)
//       setImage(data.data.attributes.posterImage.medium)
//       setTimeout(() => {
//         setInit(true)
//       }, 500);
//     }, 1500))
//   }
//   // posterImage.medium
  
//   React.useEffect(() => {
//     if(anime == "Carregando"){
//       getAnime()
//     }
//   }, []);
 
//   return (
//     <>
//       <div className="anime-galery" style={!init? {display:"none"} : {display:"block"}}>
//         <div  className="anime" id="secundary-card">
//           <img  src={animeImage} />
//           <span id="secundary-card-text" className="anime-title">{!anime.canonicalTitle? "Carregando..." : anime.canonicalTitle }</span>
//         </div>
//         <div  className="anime" id="main-card">
//           <img  src={animeImage} />
//           <span id="main-card-title" className="anime-title">{!anime.canonicalTitle? "Carregando..." : anime.canonicalTitle }</span>
//         </div>
//         <div  className="anime" id="secundary-card">
//           <img  src={animeImage} />
//           <span id="secundary-card-text" className="anime-title">{!anime.canonicalTitle? "Carregando..." : anime.canonicalTitle }</span>
//         </div>
//       </div>
//     </>
//   ); 
// }
// export default App;