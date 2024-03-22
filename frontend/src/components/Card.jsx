function Card({title, imgSRC}){
    return(
        <div className="card">
            <img src={imgSRC}/>
            <h2>{title}</h2>
        </div>
    );
}

export default Card