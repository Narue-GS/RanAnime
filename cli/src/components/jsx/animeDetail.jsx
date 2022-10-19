import "../css/animeDetail.css"
import React from "react"
const AnimeDetail = (prop) => {
    const [formDisplay, setForm] = React.useState("none")
    const [evaluation, setEvaluation] = React.useState(0.00)
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
    const changeDisplay = () =>{setForm("block")}
    const changeEvaluation = () => {
        let input = document.getElementById("evaluateInput");
        setEvaluation(input.valueAsNumber)
    }
    const postRequest = async() => {
        let url = `https://kitsu.io/api/oauth/token `
        let value = evaluation
        let evaluationBody = {
            grant_type: 'password',
            username: 'narutogbzlol@gmail.com',
            password: 'Narue@999' // RFC3986 URl encoded string
        }

        await fetch(url,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: evaluationBody
        })
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
                        </div>
                        <div className="anime-score-box">
                            <span style={{backgroundColor:scoreColor(parseFloat(prop.score))}} className="score">{prop.score}</span>
                            <div>
                                <input style={{display:formDisplay}} type="number" min={0} max={10} step={0.5} placeholder={0} id={"evaluateInput"} onChange={changeEvaluation}/>
                                <button onClick={postRequest} style={{display:formDisplay}}>Avaliar</button>
                                <button style={formDisplay == "block"? {display:"none"} : {}} onClick={changeDisplay}>Avaliar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AnimeDetail