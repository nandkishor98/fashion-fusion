import "./ProductDetail.css";
// import { useParams } from "react-router-dom";

const ProductDetail = () => {
  // const { id } = useParams();
  return (
    <section className="">
      <div className="container flex mt-2 d-flex justify-content-center">
        <div className="col-lg-8 border p-2 bg-white">
          <div className="row hedding m-0 pl-3 pt-0 pb-3">
            Product Detail Design Using Bootstrap 4.0
          </div>
          <div className="row m-0">
            <div className="col-lg-4 left-side-product-box pb-3">
              <img
                src="http://nicesnippets.com/demo/pd-image1.jpg"
                className="border p-3"
              />
              <span className="sub-img">
                <img
                  src="http://nicesnippets.com/demo/pd-image2.jpg"
                  className="border p-2"
                />
                <img
                  src="http://nicesnippets.com/demo/pd-image3.jpg"
                  className="border p-2"
                />
                <img
                  src="http://nicesnippets.com/demo/pd-image4.jpg"
                  className="border p-2"
                />
              </span>
            </div>
            <div className="col-lg-8">
              <div className="right-side-pro-detail border p-3 m-0">
                <div className="row">
                  <div className="col-lg-12">
                    <span>Who What Wear</span>
                    <p className="m-0 p-0">Womens Velvet Dress</p>
                  </div>
                  <div className="col-lg-12">
                    <p className="m-0 p-0 price-pro">$30</p>
                    <hr className="p-0 m-0" />
                  </div>
                  <div className="col-lg-12 pt-2">
                    <h5>Product Detail</h5>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris.
                    </span>
                    <hr className="m-0 pt-2 mt-2" />
                  </div>
                  <div className="col-lg-12">
                    <p className="tag-section">
                      <strong>Tag : </strong>
                      <a href="">Woman</a>
                      <a href="">,Man</a>
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <h6>Quantity :</h6>
                    <input
                      type="number"
                      className="form-control text-center w-100"
                      value="1"
                    />
                  </div>
                  <div className="col-lg-12 mt-3">
                    <div className="row">
                      <div className="col-lg-6 pb-2">
                        <a href="#" className="btn btn-danger w-100">
                          Add To Cart
                        </a>
                      </div>
                      <div className="col-lg-6">
                        <a href="#" className="btn btn-success w-100">
                          Shop Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center pt-3">
              <h4>More Product</h4>
            </div>
          </div>
          <div className="row mt-3 p-0 text-center pro-box-section">
            <div className="col-lg-3 pb-2">
              <div className="pro-box border p-0 m-0">
                <img src="http://nicesnippets.com/demo/pd-b-image1.jpg" />
              </div>
            </div>
            <div className="col-lg-3 pb-2">
              <div className="pro-box border p-0 m-0">
                <img src="http://nicesnippets.com/demo/pd-b-images2.jpg" />
              </div>
            </div>
            <div className="col-lg-3 pb-2">
              <div className="pro-box border p-0 m-0">
                <img src="http://nicesnippets.com/demo/pd-b-images3.jpg" />
              </div>
            </div>
            <div className="col-lg-3 pb-2">
              <div className="pro-box border p-0 m-0">
                <img src="http://nicesnippets.com/demo/pd-b-images4.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;