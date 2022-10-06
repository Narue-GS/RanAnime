import React from "react";
import "./sortAnime.css"
const LoadingModal = () => {
    const [loadingText, setText] = React.useState("Carregando");

    const loadText = () =>{
        setInterval(() => {
            setText("Carregando")
            setTimeout(() => {
                setText("Carregando...")
            }, 250);
        }, 500);
    }
    React.useEffect(() =>{
        loadText()
    }, [])
    return(
        <>
            <div className="loading-modal">
                <img  src="https://gifimage.net/wp-content/uploads/2017/09/anime-girl-running-gif-13.gif" alt="rem is trying her best!" />
                <span>{loadingText}</span>
            </div>
        </>
    )
}
export default LoadingModal;