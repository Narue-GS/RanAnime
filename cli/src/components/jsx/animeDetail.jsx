import "../css/animeDetail.css"
import React from "react"
import {FaWindowClose} from "react-icons/fa"

const AnimeDetail = (prop) => {
    const [formDisplay, setForm] = React.useState("none")
    const [evaluation, setEvaluation] = React.useState(0.00);
    const evaluationBody= {id: prop.id, value:evaluation}

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
    const changeDisplay = () =>{setForm("flex")}
    const changeEvaluation = () => {
        let input = document.getElementById("evaluateInput");
        setEvaluation(input.valueAsNumber)
    }
    const postRequest = async() => {

        await fetch("http://127.0.0.1:3001/api/evaluate",{
            method: "POST",
            mode:'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type':'application/json',
            },
            body: JSON.stringify(evaluationBody)
        }).then(res => res.json())
        .then(data =>{prop.setAverage(data.response)})
        
    }
    const closeModal = () => prop.setModal(false)
    React.useEffect(() => {
      }, []);
    return(
        <div style={{display:"flex", justifyContent:"center"}}>
            <div className="modal">
                <div className="modal-content">
                    <div className="column-1">
                        <img className="poster" src={prop.image} alt="" /><br/>
                        <span className="title">{prop.name}</span>
                    </div>
                    <div className="column-2">
                        <div className="synopsis">
                            <div className="synopsis-text">
                                {prop.synopsis}
                            </div>
                        </div>
                        <div className="anime-score-box">
                            <span style={{backgroundColor:scoreColor(prop.average)}} className="score">{prop.average}</span>
                        <div style={{display:"flex"}}>
                                <div className="evaluationForm" style={{display:formDisplay}}>
                                    <span>{evaluation}</span>
                                    <input type="range" min={10} max={100} step={5} id={"evaluateInput"} value={evaluation} onChange={changeEvaluation}/>
                                </div>
                                <button className="evaluate-button" onClick={postRequest} style={{display:formDisplay}}>Avaliar</button>
                                <button className="evaluate-button" style={formDisplay == "flex"? {display:"none"} : {}} onClick={changeDisplay}>Avaliar</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div onClick={closeModal} className="close-modal">
                <FaWindowClose/>
            </div>
        </div>
    )
}
export default AnimeDetail