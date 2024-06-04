import React from "react";
import { Container, Row, Col, Image} from "react-bootstrap";
import logo from "../../assets/images/logo.jpg";
const Footer = () => {
  return (
    <>
    <footer className="footer mt-5">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col md={3} className="footer-col">
            <ul className="list-unstyled">
              <li><a className="navbar-brand" href="#">
           Home
          </a></li>
              <li><a className="navbar-brand" href="/#/usedCar">
           UsedCar
          </a></li>
              <li><a className="navbar-brand" href="/#/usedCar">
           NewCar
          </a></li>
              <li><a className="navbar-brand" href="/#/sellCar">SellCar</a></li>
              <li>
                Get Connect With Us
                <div className="social-icons">
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-twitter"></i>
                </div>
              </li>
            </ul>
          </Col>
          <Col md={3} className="footer-col">
            <Image src={logo} alt="Logo" className="footer-logo" />
            <div className="app-links">
              <Image
                src="https://media.hatla2eestatic.com/images/general/google_play_link_new.png"
                alt="Google Play"
                className="app-link"
              />
              <Image src="https://media.hatla2eestatic.com/images/svg/icons/Download_on_the_App_Store_Badge_US-UK_135x40.svg" alt="App Store" className="app-link" />
              <Image
                src="https://media.hatla2eestatic.com/images/general/huawei_icon_new.png"
                alt="App Gallery"
                className="app-link"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
    <Row className='bg-black text-light w-100 p-0 m-0'>
          <Col className="text-center">
            <p>&copy; AutoCAr 2024</p>
          </Col>
        </Row>
    </>
  );
};

export default Footer;
