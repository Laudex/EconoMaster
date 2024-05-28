import './Basket.css'

function Basket(props) {
    return (
        <div className="Basket-layout">
            <img src={props.icon} />
            <div className="Basket-number">{props.number}</div>
        </div>
    )
}

export default Basket