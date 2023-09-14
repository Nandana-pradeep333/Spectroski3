import React, { useEffect, useState } from "react";
import "assets/css/blk-design-system-react.css";
import "assets/css/demo.css";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  NavLink,
} from "reactstrap";

import { Link } from "react-router-dom";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";

import bigChartData from "variables/charts.js";
import axios from "axios";


function LandingPage() {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    document.body.classList.toggle("landing-page");

    const counterUp = window.counterUp.default;
    document.querySelectorAll(".numbers .card-title").forEach((el) => {
      counterUp(el, {
        duration: 500,
        delay: 5,
      });
    });

    axios
      .get("/api/leaders")
      .then((res) => {
        setLeaderBoard(res.data.leaders);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="wrapper pt-5 pt-md-0">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left ">
              <Col md="5" className="section-safe">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/posternew.jpeg")}
                />
                <Card className="card-stats bg-danger">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">4</CardTitle>
                        <p className="card-category text-white">Months</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-stats bg-info">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">4</CardTitle>
                        <p className="card-category text-white">Magazines</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-stats card3"  >
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">8</CardTitle>
                        <p className="card-category text-white">Quizzes</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" className="text-center">
                <h1 className="text-primary text-bold text-center">
                  SPECTROSKI 3.0 <br />
                </h1>
                <p className="text-white mb-3 text-left">
                  SPECTROSKI is a series of 8 spectrum quizzes in which the
                  questions are purely based on IEEE Spectrum Magazine and General Knowledge.
                  The quiz is gonna conducted online through the website. Come,
                  participate and tickle your brain cells while contributing to
                  the noble cause.
                </p>
                <NavLink to="/login" tag={Link}>
                
                 <Button color="primary"  >Login</Button> 
                </NavLink>
              </Col>
            </Row>
          </div>
        </div>
        <section className="section section-lg">
          <h1 className="text-primary text-bold text-center">Leader Board</h1>
          <Row className="justify-content-center">
            <table class="leader-board">
              <tr>
                <th>Team</th>
                <th>Points</th>
              </tr>
              {leaderBoard.map((leader) => (
                <tr>
                  <td>
                    {leader.name} <br /> {leader.name1}
                  </td>
                  <td>{leader.points}</td>
                </tr>
              ))}
            </table>
          </Row>
        </section>
        <section className="section section-lg">
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col className="mt-lg-5" md="5">
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-trophy text-warning" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">Monthly</CardTitle>
                                <p />
                                <p className="card-category">2  Quizzes</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats upper bg-default">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-coins text-white" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">Live</CardTitle>
                                <p />
                                <p className="card-category">Leader board</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-gift-2 text-info" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">Exciting</CardTitle>
                                <p />
                                <p className="card-category">Prizes</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-credit-card text-success" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">Hybrid</CardTitle>
                                <p />
                                <p className="card-category">Mode</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <br />
                    <h1>Rules</h1>
                    <p>♦️ Students can participate as a team of 2.</p>
                    <p>♦️ Each quiz consist of 20 questions. 15 from IEEE Spectrum Magazine and 5 from General Knowledge.</p>
                    <p>♦️ Each question is of one point.</p>
                    <p>
                      ♦️ Those who receive all the 20 points first will be given a
                      bonus of 5 points ,and the second will be given a bonus of
                      3 points followed by 2 points for the third team 
                      receiving 20 points.
                    </p>
                    <p>
                      ♦️ Complete the quiz as soon as possible to Stay atop the
                      leader board. 
                    </p>
                     <p>
                      ♦️ Maximum points for each quiz is 25. 
                      <br/>
                      <br/> 
                      <b>Get ready for the quiz and bash the
                      opportunity to grab exciting prizes</b>
                    </p>   
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </section>
        {/* <section className="section section-lg">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <img
              alt="..."
              className="path2"
              src={require("assets/img/path5.png")}
            />
            <img
              alt="..."
              className="path3"
              src={require("assets/img/path2.png")}
            />
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <h1 className="text-center">Your best benefit</h1>
                  <Row className="row-grid justify-content-center">
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-primary">
                          <i className="tim-icons icon-money-coins" />
                        </div>
                        <h4 className="info-title">Low Commission</h4>
                        <hr className="line-primary" />
                        <p>
                          Divide details about your work into parts. Write a few
                          lines about each one. A paragraph describing a feature
                          will.
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-warning">
                          <i className="tim-icons icon-chart-pie-36" />
                        </div>
                        <h4 className="info-title">High Incomes</h4>
                        <hr className="line-warning" />
                        <p>
                          Divide details about your product or agency work into
                          parts. Write a few lines about each one. A paragraph
                          describing feature will be a feature.
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="tim-icons icon-single-02" />
                        </div>
                        <h4 className="info-title">Verified People</h4>
                        <hr className="line-success" />
                        <p>
                          Divide details about your product or agency work into
                          parts. Write a few lines about each one. A paragraph
                          describing be enough.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section> */}
        {/* <section className="section section-lg section-safe">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path5.png")}
            />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col md="5">
                  
                </Col>
                <Col md="6">
                  <div className="px-md-5">
                    <hr className="line-success" />
                    <h3>Awesome features</h3>
                    <p>
                      The design system comes with three pre-built pages to help
                      you get started faster. You can change the text and images
                      and you're good to go.
                    </p>
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-success mb-2">
                            <i className="tim-icons icon-vector" />
                          </div>
                          <div className="ml-3">
                            <h6>Carefully crafted components</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-success mb-2">
                            <i className="tim-icons icon-tap-02" />
                          </div>
                          <div className="ml-3">
                            <h6>Amazing page examples</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-success mb-2">
                            <i className="tim-icons icon-single-02" />
                          </div>
                          <div className="ml-3">
                            <h6>Super friendly support team</h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section> */}
        {/* <section className="section section-lg">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <img
              alt="..."
              className="path2"
              src={require("assets/img/path2.png")}
            />
            <Col md="12">
              <Card className="card-chart card-plain">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <hr className="line-info" />
                      <h5 className="card-category">Total Investments</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={bigChartData.data}
                      options={bigChartData.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </section> */}
        {/* <section className="section section-lg section-coins">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path3.png")}
            />
            <Container>
              <Row>
                <Col md="4">
                  <hr className="line-info" />
                  <h1>
                    Choose the coin{" "}
                    <span className="text-info">that fits your needs</span>
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid"
                        src={require("assets/img/bitcoin.png")}
                      />
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">Light Coin</h4>
                          <span>Plan</span>
                          <hr className="line-primary" />
                        </Col>
                      </Row>
                      <Row>
                        <ListGroup>
                          <ListGroupItem>50 messages</ListGroupItem>
                          <ListGroupItem>100 emails</ListGroupItem>
                          <ListGroupItem>24/7 Support</ListGroupItem>
                        </ListGroup>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button className="btn-simple" color="primary">
                        Get plan
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid"
                        src={require("assets/img/etherum.png")}
                      />
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">Dark Coin</h4>
                          <span>Plan</span>
                          <hr className="line-success" />
                        </Col>
                      </Row>
                      <Row>
                        <ListGroup>
                          <ListGroupItem>150 messages</ListGroupItem>
                          <ListGroupItem>1000 emails</ListGroupItem>
                          <ListGroupItem>24/7 Support</ListGroupItem>
                        </ListGroup>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button className="btn-simple" color="success">
                        Get plan
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid"
                        src={require("assets/img/ripp.png")}
                      />
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">Bright Coin</h4>
                          <span>Plan</span>
                          <hr className="line-info" />
                        </Col>
                      </Row>
                      <Row>
                        <ListGroup>
                          <ListGroupItem>350 messages</ListGroupItem>
                          <ListGroupItem>10K emails</ListGroupItem>
                          <ListGroupItem>24/7 Support</ListGroupItem>
                        </ListGroup>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button className="btn-simple" color="info">
                        Get plan
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section> */}
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
