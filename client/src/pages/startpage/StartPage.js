import MainLogo from "../../assets/main-logo.svg";
import Button from "../../buttons/Button";
import '../../buttons/Button.css'
import './StartPage.css'
import GameLogo from "../../components/gamelogo/GameLogo";

function StartPage(props) {
    return (
        <div className="Start-page-layout">
            <div className="Econo-and-logo">
                <img src={MainLogo} className="Main-logo"/>
                <div className="Econo-master">
                    <span>Econo master</span>
                </div>
            </div>

            <div className="Main-buttons">
                <Button classname="Sample-button" func={() => props.openActualCourse()}>
                    ACTUAL COURSE</Button>
                <Button classname="Play-button" func={() => props.startGame()}>Play!</Button>
            </div>
        </div>
    )
}

export default StartPage