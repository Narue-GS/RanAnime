import React from "react";
import { GiPerspectiveDiceSixFacesFive } from 'react-icons/gi';
import "../css/sortAnime.css"
const SortAnime = () => {
    return(
        <>
            <div className="sort-anime">
                <div className="sort-anime-dice">
                    <GiPerspectiveDiceSixFacesFive color="gray" fontSize="clamp(12rem, 20vw, 5000px)" className="sort-icon"/>
                </div>
            </div>
            <div className="sort-confirm">
                <button>Começe a explorar!</button>
            </div>
        </>
    )
}
export default SortAnime;