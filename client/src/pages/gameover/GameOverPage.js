import './GameOverPage.css'
import '../../buttons/Button.css'
import '../startpage/StartPage.css'
import Button from "../../buttons/Button";
import ExtraLink from "../../components/extralink/ExtraLink";
import ScoreTable from "../../components/scoretable/ScoreTable";

function GameOverPage(props) {
    return (
        <div className="Game-over-page-layout">
            <div className="Total-score">
                <span>Total score</span>
                <span className="Total-score-value">{props.score}</span>
            </div>
            <ScoreTable highScores={props.highScores} playerId={props.playerId}/>
            <ExtraLink messageId={props.messageId}/>
            <div className="Main-buttons">
                <Button classname="Sample-button" func={() => props.openActualCourse()}>
                    ACTUAL COURSE</Button>
                <Button classname="Play-button" func={() => props.startGame()}>Play Again</Button>
            </div>
        </div>
    )
}

export default GameOverPage