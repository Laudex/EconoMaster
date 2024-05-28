import BFLogo from "../../assets/battle-field-logo.svg";
import './GameLogo.css'

function GameLogo() {
    return (
        <div className="Econo-and-logo-game">
            <img src={BFLogo} className="Main-logo-game"/>
            <div className="Econo-master-game">
                <span>Econo master</span>
            </div>
        </div>
    )
}

export default GameLogo