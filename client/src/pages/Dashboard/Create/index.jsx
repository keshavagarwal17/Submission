import { React, useState, useEffect } from "react";
import "./Create.scss";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  Icon,
  Button,
  Container,
  Header,
  Form,
  Dropdown
} from "semantic-ui-react";
import Axios from "axios";
import useToken from "../../../utils/customHooks/token";
import HamburgerMenu from "../../../components/HamburgerMenu/index";

const Create = () => {
  const history = useHistory();
  const [questionCount, setquestionCount] = useState(0);
  const [questionsInput, setquestionsInput] = useState([]);
  const [questionAndAnswers, setquestionAndAnswers] = useState([
    { question: "", answer: "" },
  ]);
  const [quizDateAndTimeAndTitleAndBatch, setQuizDateAndTimeAndTitleAndBatch] =
    useState({
      date: "",
      time: "",
      title: "",
      batch: "",
      endtime: "",
      phno: "",
    });
  const [batches, setBatches] = useState([]);

  const incrementAndRender = () => {
    questionsInput.push(questionCount);
    setquestionCount(questionCount + 1);
    setquestionsInput(questionsInput);
  };

  const { getToken } = useToken();
  const token = getToken();

  const renderQuestionInput = () =>
    questionsInput.map((ele, index) => (
      <Form.Field>
        <label>Question: {ele}</label>
        <input
          placeholder="Enter your question"
          name={"question" + ele}
          id={"question"}
        />
        <label> Add options for question {ele} </label>
        <input
          placeholder="a)option1 b)option2 c)option3"
          name={"options" + ele}
          id={"answer"}
        />
      </Form.Field>
    ));

  const saveAndParse = async () => {
    let questions = document.querySelectorAll("#question");
    let answers = document.querySelectorAll("#answer");
    let i = 0;
    questions.forEach((ele) => {
      questionAndAnswers.push({
        question: ele.value,
        answer: answers[i].value,
      });
      i++;
    });

    setquestionAndAnswers(questionAndAnswers);
    const finalQnA = questionAndAnswers.filter(
      (element) => !!element.value || !!element.answer
    );
    console.log(questionAndAnswers);
    await Axios.post(
      "https://peaceful-island-93608.herokuapp.com/dashboard/saveQuiz",
      {
        finalQnA,
        time: moment(quizDateAndTimeAndTitleAndBatch.time, "h:mm A", true).isValid() ?  moment(quizDateAndTimeAndTitleAndBatch.time, ["h:mm A"]).format("HH:mm"): quizDateAndTimeAndTitleAndBatch.time,
        date: quizDateAndTimeAndTitleAndBatch.date,
        title: quizDateAndTimeAndTitleAndBatch.title,
        endtime: moment(quizDateAndTimeAndTitleAndBatch.endtime, "h:mm A", true).isValid() ?  moment(quizDateAndTimeAndTitleAndBatch.endtime, ["h:mm A"]).format("HH:mm"): quizDateAndTimeAndTitleAndBatch.endtime,
        batch: quizDateAndTimeAndTitleAndBatch.batch,
        phno: quizDateAndTimeAndTitleAndBatch.phno,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    history.push("/dashboard");
  };

  useEffect(() => {
    const token = getToken();
    let endpoint =
      "https://peaceful-island-93608.herokuapp.com/dashboard/quizbatches";
    Axios.get(endpoint, {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      console.log(response);
      setBatches(response.data);
    });

  }, []);

  const setDateAndTimeAndTitle = (e) => {
    setQuizDateAndTimeAndTitleAndBatch({
      ...quizDateAndTimeAndTitleAndBatch,
      [e.target.name]: e.target.value,
    });
    console.log(quizDateAndTimeAndTitleAndBatch);
  };

  const handleBatchSelection = (event, data) => {
    setQuizDateAndTimeAndTitleAndBatch({
      ...quizDateAndTimeAndTitleAndBatch,
      [data.name]: data.value,
    });
  };

  const buttonStyle = { marginTop: "40px" };

  return (
    <div>
      <HamburgerMenu>
        <Container>
          <Header as="h2">
            Start creating quiz 😎
            <Button primary floated="right" onClick={() => saveAndParse()}>
              <Icon name="save" /> Save
            </Button>
          </Header>
          <Form>
            <label> <Header>Quiz Title</Header></label>
            <input
              name="title"
              onChange={(e) => setDateAndTimeAndTitle(e)}
              type="text"
            ></input>
            <label> <Header> Select quiz batch </Header></label>
            <Dropdown
              floated="right"
              clearable
              options={batches}
              name="batch"
              selection
              onChange={(e, data) => handleBatchSelection(e, data)}
            />
            <label style={buttonStyle}> <Header> Schedule Quiz </Header> </label>
            <input
              name="date"
              placeholder="Enter quiz date"
              onChange={(e) => setDateAndTimeAndTitle(e)}
              type="date"
            ></input>
            <label style={buttonStyle}> <Header> Enter quiz start time </Header></label>
            <input
              name="time"
              placeholder="Enter quiz start time"
              onChange={(e) => setDateAndTimeAndTitle(e)}
              type="time"
            ></input>
            <label style={buttonStyle}> <Header> Enter quiz end time </Header></label>
            <input
              name="endtime"
              placeholder="Enter quiz end time"
              onChange={(e) => setDateAndTimeAndTitle(e)}
              type="time"
            ></input>
            <label style={buttonStyle}><Header>  Enter Phone Number </Header></label>
            <input
              name="phno"
              placeholder="Enter phone for accepting responses"
              onChange={(e) => setDateAndTimeAndTitle(e)}
              type="text"
            ></input>
            {renderQuestionInput()}
          </Form>
          <Button
            icon = "add"
            style={buttonStyle}
            labelPosition="left"
            floated="right"
            onClick={() => incrementAndRender()}
            content="Add"
            color="green"
           />
        </Container>
      </HamburgerMenu>
    </div>
  );
};

export default Create;
