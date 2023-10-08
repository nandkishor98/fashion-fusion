import { FaGithub, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            Fashion Fusion
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            &copy; 2023 Fashion, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              target="_blank"
              rel="noreferrer"
              className="text-body-secondary"
              href="https://github.com/rakimsth"
            >
              <FaGithub />
            </a>
          </li>
          <li className="ms-3">
            <a
              target="_blank"
              rel="noreferrer"
              className="text-body-secondary"
              href="https://www.linkedin.com/in/raktim-shrestha-63a780109"
            >
              <FaLinkedinIn />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;