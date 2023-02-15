
const MealPhotos= (props) => {



    return (

<div className="carousel-item active">
                        <img src={props.meal.url} alt='' />
                    </div>
    );
}

export default MealPhotos
