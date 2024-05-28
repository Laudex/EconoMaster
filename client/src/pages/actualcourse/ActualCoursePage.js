import './ActualCoursePage.css'
import Button from "../../buttons/Button";
import "../startpage/StartPage.css";
import "../../buttons/Button.css";
import CourseField from "../../components/coursefield/CourseField";

function ActualCoursePage(props) {

    const eur = props.currencyJson.find((data) => data.name === 'EUR')
    const usd = props.currencyJson.find((data) => data.name === 'USD')
    const rub = props.currencyJson.find((data) => data.name === 'RUB')
    const gbp = props.currencyJson.find((data) => data.name === 'GBP')
    const jpy = props.currencyJson.find((data) => data.name === 'JPY')


    return (
        <div className="Actual-course-page-layout">
            <div className="Actual-course-header">ACTUAL COURSE</div>
            <div className="Actual-course-table">
                <div className="Course-cell"><CourseField firstCur={usd} secondCur={eur}/></div>
                <div className="Course-cell"><CourseField firstCur={rub} secondCur={eur}/></div>
                <div className="Course-cell"><CourseField firstCur={usd} secondCur={rub}/></div>
                <div className="Course-cell"><CourseField firstCur={jpy} secondCur={eur}/></div>
                <div className="Course-cell"><CourseField firstCur={jpy} secondCur={usd}/></div>
                <div className="Course-cell"><CourseField firstCur={gbp} secondCur={eur}/></div>
                <div className="Course-cell"><CourseField firstCur={gbp} secondCur={usd}/></div>
                <div className="Course-cell"><CourseField firstCur={jpy} secondCur={rub}/></div>
                <div className="Course-cell"><CourseField firstCur={gbp} secondCur={rub}/></div>
                <div className="Course-cell"><CourseField firstCur={jpy} secondCur={gbp}/></div>
            </div>
            <div className="Main-buttons">
                <Button classname="Play-button" func={() => props.startGame()}>Play!</Button>
                <Button classname="Sample-button" func={() => props.hideActualCourse()}>
                    Menu</Button>

            </div>
        </div>
    )
}

export default ActualCoursePage