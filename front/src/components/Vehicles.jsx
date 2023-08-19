const Vehicles = ({ details, children, src }) => {
  return (
    <div className="container text-center">
      <div className="row row-cols-1 row-cols-lg-2 p-3">
        <div className="col my-3">
          <div className="ratio ratio-1x1">
            <img src={src} className="img-fluid object-fit-cover"></img>
          </div>
        </div>
        <div className="col my-3">
          <h1>{details.name}</h1>
          {children}
        </div>
      </div>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 my-3 p-3 py-5 g-2 border-top border-danger text-danger">
        <div className="col">
          <h5>Name</h5>
          <p>{details.name}</p>
        </div>
        <div className="col">
          <h5>Model</h5>
          <p>{details.model}</p>
        </div>
        <div className="col">
          <h5>Manufacturer</h5>
          <p>{details.manufacturer}</p>
        </div>
        <div className="col">
          <h5>Length</h5>
          <p>{details.length}</p>
        </div>
        <div className="col">
          <h5>Crew</h5>
          <p>{details.crew}</p>
        </div>
        <div className="col">
          <h5>Max speed</h5>
          <p>{details.max_atmosphering_speed}</p>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
