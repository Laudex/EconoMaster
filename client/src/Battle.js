import './Battle.css'
import './buttons/Button.css'
import {useCallback, useEffect, useState} from "react";
import ActualCoursePage from "./pages/actualcourse/ActualCoursePage";
import Axios from 'axios';
import StartPage from "./pages/startpage/StartPage";
import MainBattleField from "./pages/mainbattlefield/MainBattleField";
import GameOverPage from "./pages/gameover/GameOverPage";
import {getCurrencyIcon, getMessageId, getPlayerId} from "./utils/Utils"

function Battle() {
    const [showGamePage, setShowGamePage] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [totalScore, setTotalScore] = useState(0)
    const [showActualCourse, setShowActualCourse] = useState(false)
    const [initialCurrency, setInitialCurrency] = useState("usd");
    const [currencyJson, setCurrencyJson] = useState([]);
    const [messageId, setMessageId] = useState(getMessageId)
    const [playerId, setPlayerId] = useState(getPlayerId)
    const [highScores, setHighScores] = useState([])

    const updateHighScores = useCallback(newScore => {
        const newHighScore = highScores.map(score => {
            if (score.user.id === playerId && newScore > score.score) {
                return {...score, score: newScore}
            }
            return score
        }).sort((a, b) => (a.score > b.score) ? -1 : ((a.score < b.score) ? 1 : 0))
        setHighScores(newHighScore)
    },[highScores, playerId])

    function sendHighScore(score) {
        if (messageId) {
            Axios.get(
                `/highscore/${score}?id=${messageId}`
            ).then().catch(error => {
            })
        }
    }

    const getHighScores = useCallback(() => {
        if (messageId) {
            Axios.get(
                `/gethighscores?id=${messageId}`
            ).then(res => {
                setHighScores(res.data)
            }).catch(error => {
            })
        }
    }, [messageId])


    function startGame() {
        setShowGamePage(true)
        setShowActualCourse(false)
        setGameOver(false)
    }

    const endGame = useCallback(score => {
        setGameOver(true)
        setShowGamePage(false)
        setTotalScore(score)
        updateHighScores(score)
        sendHighScore(score)
    },[sendHighScore, updateHighScores])

    function openActualCourse() {
        setShowActualCourse(true)
        setGameOver(false)
    }

    function hideActualCourse() {
        setShowActualCourse(false)
    }

    const setCurrencyData = useCallback((res) => {
        const data = res.data[initialCurrency]
        setCurrencyJson([
            {
                name: 'EUR',
                rate: data.eur,
                icon: getCurrencyIcon('EUR')
            },
            {
                name: 'USD',
                rate: data.usd,
                icon: getCurrencyIcon('USD')
            },
            {
                name: 'RUB',
                rate: data.rub,
                icon: getCurrencyIcon('RUB')
            },
            {
                name: 'GBP',
                rate: data.gbp,
                icon: getCurrencyIcon('GBP')
            },
            {
                name: 'JPY',
                rate: data.jpy,
                icon: getCurrencyIcon('JPY')
            },
        ])
    }, [initialCurrency])

    useEffect(() => {
        Axios.get(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${initialCurrency}.json`)
            .then(setCurrencyData).catch(error => {
        })
    }, [initialCurrency, setCurrencyData])

    useEffect(() => {
        getHighScores()
    }, [getHighScores])


    return (
        <div className="Main-layout">
            {gameOver
                ? <GameOverPage playerId={playerId} messageId={messageId} score={totalScore} highScores={highScores} openActualCourse={openActualCourse} startGame={startGame}/>
                : <div>
                    {showGamePage ?
                        <MainBattleField currencyJson={currencyJson} endGame={endGame}/>
                        : showActualCourse ?
                            <ActualCoursePage currencyJson={currencyJson} hideActualCourse={hideActualCourse}
                                              startGame={startGame}/> :
                            <StartPage openActualCourse={openActualCourse} startGame={startGame}/>
                    }
                </div>
            }
        </div>
    )
}

export default Battle