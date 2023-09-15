import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Label, Input, Badge } from "reactstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Quiz({ data }) {
  let [step, setStep] = useState(0);
  let [seconds, setSeconds] = useState(45);
  let [current, setCurrent] = useState("");
  const [parent] = useAutoAnimate(/* optional config */);

  let sendAnswer = (id, name) => {
    let radios = document.getElementsByName(id);
    let answer;
    for (let i = 0; i < radios.length; i++) {
      if ((radios[i].type = "radio")) {
        if (radios[i].checked) {
          answer = radios[i].value;
        }
      }
    }
    setCurrent(data[step + 1]);
    setStep(step + 1);
    axios
      .post("/api/answer", {
        name: name,
        question: id,
        email: window.sessionStorage.getItem("email"),
        pass: window.sessionStorage.getItem("api"),
        answer: answer ? answer : "",
      })
      .then((res) => {
        if (res.data.msg) {
          alert(res.data.msg);
        }
      })
      .catch((e) => {
        alert("Something Went Wrong");
        console.log(e);
      });
  };

  useEffect(() => {
    let start = Date.now();
    function timer() {
      let temp = 45 - (((Date.now() - start) / 1000) | 0);

      if (temp <= 0) {
        sendAnswer(current._id, current.name);
      } else {
        setSeconds(temp);
      }
    }
    timer();
    let interval = window.setInterval(timer, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [step]);

  return (
    <div ref={parent}>
      {step !== data.length ? (
        data.map(
          (q, i) =>
            step === i && (
              <div>
                <Badge className="text-large" color="danger">
                  {seconds}
                </Badge>
                <div>
                  <h4>
                    {i + 1}. {q.question}
                  </h4>
                  <div>
                    <div className="form-check-radio">
                      <Label
                        className="form-check-label"
                        style={{ position: "relative", paddingLeft: "30px" }}
                      >
                        <Input type="radio" name={q._id} value="a" />
                        {q.a}
                        <span className="form-check-sign"></span>
                      </Label>
                    </div>
                    <div className="form-check-radio">
                      <Label
                        className="form-check-label"
                        style={{ position: "relative", paddingLeft: "30px" }}
                      >
                        <Input type="radio" name={q._id} value="b" />
                        {q.b}
                        <span className="form-check-sign"></span>
                      </Label>
                    </div>
                    <div className="form-check-radio">
                      <Label
                        className="form-check-label"
                        style={{ position: "relative", paddingLeft: "30px" }}
                      >
                        <Input type="radio" name={q._id} value="c" />
                        {q.c}
                        <span className="form-check-sign"></span>
                      </Label>
                    </div>
                    <div className="form-check-radio">
                      <Label
                        className="form-check-label"
                        style={{ position: "relative", paddingLeft: "30px" }}
                      >
                        <Input type="radio" name={q._id} value="d" />
                        {q.d}
                        <span className="form-check-sign"></span>
                      </Label>
                    </div>
                  </div>
                </div>
                <Button
                  className="btn-round"
                  color="primary"
                  size="lg"
                  onClick={() => sendAnswer(q._id, q.name)}
                >
                  Next
                </Button>
              </div>
            )
        )
      ) : (
        <>
          <p>Quiz Completed. Please Don't Close This Window.</p>
        </>
      )}
    </div>
  );
}

export default Quiz;
