import './ScoreTable.css'

function ScoreTable(props) {
    return (
        <div className="Score-table-layout">
            <span>Scoring table</span>
            <div className="Score-table">
                {props.highScores.map((score, i) => {
                    return (
                        <div key={i} className="Score-cell">
                            <span className="Score-cell-position">{i+1}</span>
                            <span className="Score-cell-name">{score.user.first_name}</span>
                            <span>{score.score}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ScoreTable