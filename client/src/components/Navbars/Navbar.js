/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

function PagesNavbar(props) {
  let [collapseOpen, setCollapseOpen] = useState(false);
  let [collapseOut, setCollapseOut] = useState("");
  let [color, setColor] = useState("navbar-transparent");
  let [isMobile, setIsMobile] = useState(false);

  let changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-dark");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  let toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };

  let onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };

  let onCollapseExited = () => {
    setCollapseOut("");
  };

  useEffect(() => {
    window.setInterval(() => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }, 100);
  }, []);

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div
          className="navbar-translate"
          style={
            isMobile
              ? {
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                }
              : {}
          }
        >
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <b>SPECTROSKI 3.0</b>
          </NavbarBrand>
          {/* <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button> */}
          {isMobile && (
            <NavLink to="/login" tag={Link} className="p-0">
              <Button className="d-lg-block" color="secondary">
                Login
              </Button>
            </NavLink>
          )}
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="9">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  SPECTROSKI 3.0
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="3">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav>
            <NavItem>
              <NavLink to="/register" tag={Link}>
                <Button className="d-none d-lg-block" color="primary">
                  Register
                </Button>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/login" tag={Link}>
                <Button className="d-lg-block" color="secondary">
                  Login
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default PagesNavbar;
