import react from "react";
import "../css/animeDetail.css"
const AnimeDetail = (prop) => {
    const scoreColor = (score) =>{
        if(score < 70.0){
            return "rgba(250, 0, 0, 0.500)"
        }
        if(score > 70.0 && score < 90){
            return "rgba(0, 255, 0, 0.500)"
        }
        if(score > 90.0) {
            return "rgba(255,255,0,0.500)"
        }
    }
    return(
    <>
        <div className="modal">
            <div className="modal-content">
                <div className="column-1">
                    <img className="poster" src={prop.image} alt="" /><br/>
                    <span className="title">{prop.text}</span>
                </div>
                <div className="column-2">
                    <div className="synopsis">
                        <div className="synopsis-text">
                            {prop.synopsis}
                        </div>
                        <div className="synopsis-more">
                            Continuar lendo
                        </div>
                    </div>
                    <span style={{backgroundColor:scoreColor(parseFloat(prop.score))}} className="score">{prop.score}</span>
                </div>
            </div>
        </div>
    </>
    )
}
export default AnimeDetail