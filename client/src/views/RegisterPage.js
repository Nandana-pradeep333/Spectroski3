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
    name: "",
    email: "",
    phone: "",
    branch: "",
    batch: "",
    id: "",
    name1: "",
    email1: "",
    phone1: "",
    branch1: "",
    batch1: "",
    id1: "",
    pass: "",
  });
  let [step, setStep] = useState(false);

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

  const register = () => {
    if (step) {
      if (
        data.name &&
        data.email &&
        data.phone &&
        data.branch &&
        data.batch &&
        data.id &&
        data.name1 &&
        data.email1 &&
        data.phone1 &&
        data.branch1 &&
        data.batch1 &&
        data.id1 &&
        data.pass
      ) {
        axios
          .post("/api/register", data)
          .then((res) => {
            if (res.data.email) {
              window.sessionStorage.setItem("email", res.data.email);
              window.sessionStorage.setItem("api", res.data.pass);
              setStep(!step);
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
    } else {
      setStep(!step);
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
                      <CardTitle tag="h4">Register</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <div
                          style={{
                            visibility: step ? "hidden" : "visible",
                            position: step ? "absolute" : "relative",
                          }}
                        >
                          <h2>Member 1</h2>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Full Name"
                              type="text"
                              onChange={(e) => changeData(e, "name")}
                            />
                          </InputGroup>
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
                                <i className="tim-icons icon-mobile" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Phone"
                              type="text"
                              onChange={(e) => changeData(e, "phone")}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-pencil" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Branch"
                              type="select"
                              onChange={(e) => changeData(e, "branch")}
                            >
                              <option disabled selected value="">
                                Branch
                              </option>
                              <option className="bg-primary"  >CE</option>
                              <option className="bg-primary">CSE</option>
                              <option className="bg-primary" >ECE</option>
                              <option className="bg-primary" >EEE</option>
                              <option className="bg-primary">ME</option>
                            </Input>
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-bank" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Batch"
                              type="select"
                              onChange={(e) => changeData(e, "batch")}
                            >
                              <option  className="bg-white"disabled selected value="">
                                Batch
                              </option>
                              <option className="bg-primary">2019</option>
                              <option className="bg-primary">2020</option>
                              <option className="bg-primary">2021</option>
                            </Input>
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-badge" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="IEEE Membership ID"
                              type="text"
                              onChange={(e) => changeData(e, "id")}
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
                        </div>
                        <div
                          style={{
                            visibility: !step ? "hidden" : "visible",
                            position: !step ? "absolute" : "relative",
                          }}
                        >
                          <h2>Member 2</h2>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Full Name"
                              type="text"
                              onChange={(e) => changeData(e, "name1")}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              onChange={(e) => changeData(e, "email1")}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-mobile" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Phone"
                              type="text"
                              onChange={(e) => changeData(e, "phone1")}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-pencil" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Branch"
                              type="select"
                              onChange={(e) => changeData(e, "branch1")}
                            >
                              <option disabled selected value="">
                                Branch
                              </option>
                              <option className="bg-primary">CE</option>
                              <option className="bg-primary">CSE</option>
                              <option className="bg-primary">ECE</option>
                              <option className="bg-primary">EEE</option>
                              <option className="bg-primary">ME</option>
                            </Input>
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-bank" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Batch"
                              type="select"
                              onChange={(e) => changeData(e, "batch1")}
                            >
                              <option disabled selected value="">
                                Batch
                              </option>
                              <option className="bg-primary">2019</option>
                              <option className="bg-primary">2020</option>
                              <option className="bg-primary">2021</option>
                            </Input>
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-badge" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="IEEE Membership ID"
                              type="text"
                              onChange={(e) => changeData(e, "id1")}
                            />
                          </InputGroup>
                        </div>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={register}
                      >
                        {step ? "Register" : "Next"}
                      </Button>{" "}
                      <span>
                        {" "}
                        <NavLink
                          to="/login"
                          tag={Link}
                          className="d-inline text-primary"
                        >
                          Or Login
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
