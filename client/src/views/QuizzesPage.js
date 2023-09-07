import Footer from "components/Footer/Footer";
import React, { useEffect, useState } from "react";
import InsideNav from "../components/Navbars/InsideNav.js";

import { Card, CardBody, Container, Row, Col } from "reactstrap";
import Quiz from "components/Quiz.js";
import axios from "axios";

function Quizzes() {
  let [squares1to6, setsSquares1to6] = useState("");
  let [squares7and8, setsSquares7and8] = useState("");
  let [start, setStart] = useState("");
  let [end, setEnd] = useState(0);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    axios
      .post("/api/quiz", {
        email: window.sessionStorage.getItem("email"),
        pass: window.sessionStorage.getItem("api"),
      })
      .then((res) => {
        let temp = res.data;
        if (temp.status === "true" && temp.start) {
          setStart(temp.start);
          setEnd(temp.end);
          axios
            .post("/api/questions", {
              email: window.sessionStorage.getItem("email"),
              pass: window.sessionStorage.getItem("api"),
              name: temp.name,
            })
            .then((res) => {
              if (res.data.status === "true") {
                console.log(res.data.data);
                setData(res.data.data);
              }

              if (res.data.msg) {
                alert(res.data.msg);
              }
            })
            .catch((e) => {
              alert("Something Went Wrong");
              console.log(e);
            });
        }

        if (temp.msg) {
          alert(res.data.msg);
        }
      })
      .catch((e) => {
        alert("Something Went Wrong");
        console.log(e);
      });

    // window.setInterval(() => {
    //   let time = new Date().getTime();
    //   if (time > end) {
    //     setEnd(0);
    //   }
    // }, 100);
  }, []);

  return (
    <>
      <InsideNav />
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
                    <CardBody>
                      {start ? (
                        <>
                          {/* <p>
                            You will see the quiz here, once it started.
                            Meanwhile enjoy this mock quiz and join the
                            following group for more information
                          </p>
                          <a
                            href="https://bit.ly/watsapp-spectroski3"
                            target="_blank"
                            className="text-primary"
                            rel="noreferrer"
                          >
                            https://bit.ly/watsapp-spectroski3
                          </a>
                          <h2>Mock Quiz</h2> */}
                          <Quiz data={data} />
                        </>
                      ) : (
                        <>
                          <p>
                            You will see the quiz here, once it started.
                            Meanwhile join the following group for more
                            information
                          </p>
                          <a
                            href="https://bit.ly/watsapp-spectroski3"
                            target="_blank"
                            className="text-primary"
                            rel="noreferrer"
                          >
                            https://bit.ly/watsapp-spectroski3
                          </a>
                        </>
                      )}
                    </CardBody>
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

export default Quizzes;
