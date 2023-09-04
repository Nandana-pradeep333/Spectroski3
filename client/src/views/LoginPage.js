import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  NavLink,
} from "reactstrap";

import { Link } from "react-router-dom";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "axios";

function RegisterPage() {
  let [squares1to6, setsSquares1to6] = useState("");
  let [squares7and8, setsSquares7and8] = useState("");
  let [data, setData] = useState({
    email: "",
    pass: "",
  });

  useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);

    return () => {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

  let followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setsSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );

    setsSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  const login = () => {
    if (data.email && data.pass) {
      axios
        .post("/api/login", data)
        .then((res) => {
          if (res.data.email) {
            window.sessionStorage.setItem("email", res.data.email);
            window.sessionStorage.setItem("api", res.data.pass);
          }

          if (res.data.msg) {
            alert(res.data.msg);
          }
        })
        .catch((e) => {
          alert("Something Went Wrong");
          console.log(e);
        });
    } else {
      alert("All fields are required");
    }
  };

  const changeData = (e, key) => {
    let temp = data;
    temp[key] = e.target.value;
    setData(temp);
  };

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                      />
                      <CardTitle tag="h4">Login</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            onChange={(e) => changeData(e, "email")}
                          />
                        </InputGroup>

                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => changeData(e, "pass")}
                          />
                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={login}
                      >
                        Login
                      </Button>{" "}
                      <span>
                        {" "}
                        <NavLink
                          to="/register"
                          tag={Link}
                          className="d-inline text-primary"
                        >
                          Or Register
                        </NavLink>
                      </span>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RegisterPage;
