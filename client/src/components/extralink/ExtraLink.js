import './ExtraLink.css'
import ArrowIcon from '../../assets/icons/Arrow-right.svg'
import {useCallback} from "react";
import Axios from "axios";

function ExtraLink(props) {
    const handleClick = useCallback(() => {
		/*Axios.get(
            `/sendExtraLink?id=${props.messageId}`
        ).then().catch(error => {
        })*/
        //window.Telegram.WebApp.openLink("https://t.me/+l4tosHEq9UxhOGY6")
        //window.location.href = 'https://t.me/+l4tosHEq9UxhOGY6'
        window.location.href = 'https://t.me/economastergame'
        //window.Telegram.WebApp.close()
    }, [props.messageId]);

    return (
            <div className="Extra-link-layout" onClick={handleClick}>
                {/*<a href="https://t.me/+l4tosHEq9UxhOGY6" rel="noopener" target='_blank'>*/}
                    <div className="Extra-link-box">
                        <span className="Extra-link-text">To get pro, with real money!</span>
                        <div className="Extra-link-next">
                            <img src={ArrowIcon}/>
                        </div>
                    </div>
                {/*</a>*/}
            </div>
    
    )
}

export default ExtraLink