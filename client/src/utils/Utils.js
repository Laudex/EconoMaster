import euroIcon from '../assets/icons/EUR.svg'
import usdIcon from '../assets/icons/USD.svg'
import rubIcon from '../assets/icons/RUB.svg'
import gbpIcon from '../assets/icons/Funt.svg'
import jpyIcon from '../assets/icons/YEN.svg'
import cryptoJs from 'crypto-js'

const signs = [">", "<"]

export const getMessageId = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('id')
    /*if (messageId) {
        const bytes = cryptoJs.AES.decrypt(messageId, "Test")
        return bytes.toString(cryptoJs.enc.Utf8)
    }*/
}

export const getPlayerId = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return parseInt(urlParams.get('userId'))
}

export const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

/* Return 2 random currencies descending order of price */
export const randomCurrency = (currencyJson) => {
    const curLength = currencyJson.length
    const firstIndex = randomNumberInRange(0, curLength)
    const firstCur = currencyJson[firstIndex]
    let secondCur
    let done = true
    while (done) {
        const secondIndex = randomNumberInRange(0, curLength)
        if (secondIndex != firstIndex) {
            secondCur = currencyJson[secondIndex]
            done = false
        }
    }
    if (firstCur.rate > secondCur.rate) {
        return [secondCur, firstCur]
    } else {
        return [firstCur, secondCur]
    }

}

export const randomSign = () => {
    const signIndex = randomNumberInRange(0, 2)
    return signs[signIndex]
}

export const getCurrencyIcon = (currencyName) => {
    switch (currencyName) {
        case 'EUR':
            return euroIcon
        case 'USD':
            return usdIcon
        case 'RUB':
            return rubIcon
        case 'GBP':
            return gbpIcon
        case 'JPY':
            return jpyIcon
    }
}

export const calculateBasketFinalValue = (basket) => {
    return basket.curNum * ((1 / basket.curData.rate).toFixed(2))
}

export const getCurrentDate = () => {
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentMonth = new String(date.getMonth() + 1).padStart(2, "0")
    const currentDay = String(date.getDate()).padStart(2, '0');
    return `${currentYear}-${currentMonth}-${currentDay}`
}

export const calculateBaskets = (round, currencyJson) => {
    const currency = randomCurrency(currencyJson)
    const course = (currency[1].rate / currency[0].rate).toFixed(1)
    const minFirstBasket = Math.floor(Math.pow(round, 0.85))
    const maxFirstBasket = Math.floor(Math.pow(round, 0.98)) + 2

    const firstBasket = 2 + randomNumberInRange(minFirstBasket, maxFirstBasket + 1)
    const delta = 5 / (round + 4)

    const minSecondBasket = Math.floor(firstBasket * (1 - delta))
    const maxSecondBasket = Math.floor((firstBasket * (1 + delta)) * course) + 1
    const secondBasket = randomNumberInRange(minSecondBasket, maxSecondBasket + 1)

    const randomValue = randomNumberInRange(0, 2)
    if (randomValue === 1) {
        return [{curNum: firstBasket, curData: currency[0]}, {curNum: secondBasket, curData: currency[1]}]
    } else {
        return [{curNum: secondBasket, curData: currency[1]}, {curNum: firstBasket, curData: currency[0]}]
    }
}