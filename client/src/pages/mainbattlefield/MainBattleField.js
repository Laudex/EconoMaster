import {useCallback, useEffect, useState} from "react";
import {calculateBaskets, calculateBasketFinalValue, randomSign} from '../../utils/Utils';
import Button from "../../buttons/Button";
import './MainBattleField.css'
import YesIcon from '../../assets/yes-icon.svg'
import NoIcon from '../../assets/no-icon.svg'
import Basket from '../../components/basket/Basket';
import GameLogo from "../../components/gamelogo/GameLogo";

function MainBattleField(props) {
    const [overallTime, setOverallTime] = useState(10);
    const [timeRangeIncrease, setTimeRangeIncrease] = useState(3)
    const [timeRangeDecrease, setTimeRangeDecrease] = useState(5)
    const [tickDecrease, setTickDecrease] = useState(1/overallTime)
    const [increaseValue, setIncreaseValue] = useState(timeRangeIncrease * (100 / overallTime))
    const [decreaseValue, setDecreaseValue] = useState(timeRangeDecrease * (100 / overallTime))
    const [round, setRound] = useState(1)
    const [counterWidth, setCounterWidth] = useState(100)
    const [baskets, setBaskets] = useState(() => calculateBaskets(round, props.currencyJson))
    const [score, setScore] = useState(0)
    const [sign, setSign] = useState(randomSign)


    function yesButton() {
        const leftValue = calculateBasketFinalValue(baskets[0])
        const rightValue = calculateBasketFinalValue(baskets[1])
        if (sign === ">") {
            if (leftValue > rightValue) {
                increase()
            } else {
                decrease()
            }
        } else {
            if (leftValue < rightValue) {
                increase()
            } else {
                decrease()
            }
        }
    }

    function noButton() {
        const leftValue = calculateBasketFinalValue(baskets[0])
        const rightValue = calculateBasketFinalValue(baskets[1])
        if (sign === ">") {
            if (leftValue <= rightValue) {
                increase()
            } else {
                decrease()
            }
        } else {
            if (leftValue >= rightValue) {
                increase()
            } else {
                decrease()
            }
        }
    }

    function updateRandomValues() {
        const nextRound = round + 1
        setRound(nextRound)
        setBaskets(calculateBaskets(nextRound, props.currencyJson))
        setSign(randomSign)
    }

    function increase() {
        if (counterWidth > 100 - increaseValue) {
            setCounterWidth(100)
        } else {
            setCounterWidth(prevState => prevState + increaseValue)
        }
        setScore(prevState => prevState + 1)
        updateRandomValues()
    }

    function decrease() {
        if (counterWidth <= decreaseValue) {
            setCounterWidth(0)
        } else {
            setCounterWidth(prevState => prevState - decreaseValue)
        }
        updateRandomValues()
    }

    const tick = useCallback(() => {
        if (counterWidth >= 0) {
            setCounterWidth(prevState => prevState - tickDecrease)
        }
    }, [tickDecrease, counterWidth])
    

    useEffect(() => {
        const timerId = setInterval(tick, 10);
        return () => clearInterval(timerId);
    })

    useEffect(() => {
        if (counterWidth < 0) {
            props.endGame(score)
        }
    }, [counterWidth, props, score])

    return (
        <div>
            <div className="Main-battle-field-layout">
                <GameLogo/>
                <div className="Score-text">Score: {score}</div>
                <div className="Baskets">
                    <Basket number={baskets[0].curNum} icon={baskets[0].curData.icon}/>
                    <div className="Sign">{sign}</div>
                    <Basket number={baskets[1].curNum} icon={baskets[1].curData.icon}/>
                </div>
                <div className="Counter-bar">
                    <div className="Counter-timer" style={{width: `${counterWidth}%`}}>
                    </div>
                </div>
                <div className="Choose-buttons">
                    <Button classname="No-button" func={noButton}>
                        <img src={NoIcon}/>
                    </Button>
                    <Button classname="Yes-button" func={yesButton}>
                        <img src={YesIcon}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MainBattleField