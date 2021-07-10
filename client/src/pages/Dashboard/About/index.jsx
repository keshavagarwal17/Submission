import React from "react";
import { Divider, Header, Button, Container } from "semantic-ui-react";
import "./About.scss";
import Navbar from "../../../components/Navigation";
import * as aboutApp from "../../../contents/aboutus.json";
const margin = { marginBottom: "10%" };

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-body">
        <div className="header">About OffQuiz</div>
        <Divider />
        <div className="sub-header">The Problem!!</div>
        <div className="para">{aboutApp["header"]}</div>
        <div className="para">{aboutApp["description"]}</div>
        <Divider />
        <div className="sub-header">What is OffQuiz?</div>
        <div className="para">{aboutApp["app-description"]}</div>
        <Divider />
        <div className="sub-header">How Does it work?</div>
        <div className="para">
          <ul>
            {aboutApp.working.map((data) => (
              <li className="points">{data.point}</li>
            ))}
          </ul>
          <Header as="h1" textAlign="center">
            Download our app
          </Header>
          <Container textAlign="center">
            <Button
              content="Download"
              icon="download"
              labelPosition="left"
              style={margin}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default About;
