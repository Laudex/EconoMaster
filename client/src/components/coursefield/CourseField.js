import './CourseField.css'

function CourseField(props) {

    function getFixed(first, second) {
        return parseFloat((first / second).toFixed(1))
    }

    return (
        <div>
            {props.firstCur.rate > props.secondCur.rate
                ? <div className="Course-field-group">
                    <div className="Course-field">
                        <span>1</span>
                        <img src={props.secondCur.icon}/>
                    </div>
                    <span className="Equal">=</span>
                    <div className="Course-field">
                        <div>{getFixed(props.firstCur.rate, props.secondCur.rate)}</div>
                        <img src={props.firstCur.icon}/>
                    </div>
                </div>
                : <div className="Course-field-group">
                    <div className="Course-field">
                        <span>1</span>
                        <img src={props.firstCur.icon}/>
                    </div>
                    <span className="Equal">=</span>
                    <div className="Course-field">
                        <div>{getFixed(props.secondCur.rate, props.firstCur.rate)}</div>
                        <img src={props.secondCur.icon}/>
                    </div>
                </div>}
        </div>
    )
}

export default CourseField