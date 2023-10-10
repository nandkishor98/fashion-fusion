export default function SkeletalLoader() {
    return (
      <div className="card" aria-hidden="true">
        <div className="card-header">
          <div className="spinner-border text-secondary">
            <span className="visually-hidden text-center">Loading...</span>
          </div>
        </div>
  
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
          <div className="flex">
            <div className="justify-content-center"></div>
            <a
              href="#"
              className="btn btn-secondary disabled placeholder col-2"
            ></a>
            <a
              href="#"
              className="btn btn-secondary disabled placeholder col-2"
            ></a>
          </div>
        </div>
      </div>
    );
  }