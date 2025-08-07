import * as React from "react";
import { FlashcardAPI } from "../../api/flashcard_api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@mui/material/Button";
import { OptionList } from "../../components/OptionList";
import List from "@mui/material/List";

export function FlashCard() {
  const [questionValue, setQuestionValue] = React.useState("");
  const [answerValue, setAnswerValue] = React.useState("");
  const [optionsValue, setOptionsValue] = React.useState([]);
  const [scoreValue, setScoreValue] = React.useState(0);
  const [countValue, setCountValue] = React.useState(0);
  const [messageValue, setMessageValue] = React.useState("Click Next to Begin");

  async function getFlashcard(e) {
    const payload = {};
    await FlashcardAPI.flashcard_data(payload).then((res) => {
      const data = res.data;
      console.log(data);
      setQuestionValue(data.question);
      setAnswerValue(data.answer);
      setOptionsValue(data.options);
      setMessageValue("");
    });
  }

  const handleOptionClick = (value) => {
    if (value == answerValue) {
      setScoreValue(scoreValue + 1);
      setCountValue(countValue + 1);
      setMessageValue("Correct!");
    } else {
      setCountValue(countValue + 1);
      setMessageValue("Wrong! The correct answer is " + answerValue);
    }
  };

  return (
    <Container fluid>
      <Row>
        <p>
          Score: {scoreValue} / {countValue}
        </p>
      </Row>
      <Row>
        <Col xs={4}>
          <p>{questionValue}</p>
        </Col>
        <Col xs={4}>
          <List sx={{ width: "100%" }}>
            {optionsValue.map((item) => (
              <OptionList
                text={item}
                onClick={(event) => handleOptionClick(item)}
              />
            ))}
          </List>
        </Col>
        <Col xs={4}>
          <p>{messageValue}</p>
          <Button
            variant="contained"
            size="large"
            sx={{ mx: 1, p: 1 }}
            onClick={getFlashcard}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
