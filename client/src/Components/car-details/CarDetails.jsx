import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useCar, useDeleteCar } from "../../services/carService";

import './CarDetails.css'

export default function CarDetails() {
  const navigate = useNavigate();
  const { email, userId } = useAuth();
  const { carId } = useParams();
  const { car } = useCar(carId);
  const { deleteCar } = useDeleteCar();

  const carDeleteHandler = async () => {
    const areYouSure = confirm(`Are you sure you want to delete ${car.brand} ${car.model} ?`);

    if (!areYouSure) {
      return;
    }

    await deleteCar(carId);

    navigate('/catalog');
  }



  return (
    <>
      <section id="new-cars" className="new-cars">
        <div className="container">
     
          <div className="new-cars-content">
            <div className="owl-carousel owl-theme" id="new-cars-carousel">
              <div className="new-cars-item">
                <div className="single-new-cars-item">
                  <div className="row">
                    <div className="col-md-7 col-sm-12">
                      <div className="new-cars-img">
                        <img
                          src={car.imageUrl}
                          alt="img"
                        />
                      </div>
                      {/*/.new-cars-img*/}
                    </div>
                    <div className="col-md-5 col-sm-12">
                      <div className="new-cars-txt">
                        <h2>
                          <a href="#">
                            {car.brand} <span> {car.model} </span>
                          </a>
                        </h2>
                        Description:
                        <p>
                          {car.description}
                        </p>
                        <p className="new-cars-para2">
                          <p>Year:  {car.year}</p>
                          <p>Transmission: {car.transmission}</p>
                          <p>Price: {car.price}$</p>
                        </p>
                        <div className="button-group">

                          <Link to={`/cars/${carId}/edit`} className="edit-btn">
                            Edit
                          </Link>
                          <button className="delete-btn" onClick={carDeleteHandler}>
                            Delete
                          </button>
                        </div>

                      </div>
                      {/*/.new-cars-txt*/}
                    </div>
                    {/*/.col*/}
                  </div>
                  {/*/.row*/}
                </div>
                {/*/.single-new-cars-item*/}
              </div>
              {/*/.new-cars-item*/}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

