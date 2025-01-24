import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Text,
} from "@react-email/components";
import {
  main,
  container,
  section,
  footer,
  logo,
  heading,
  paragraph,
} from "../styles";
import * as React from "react";

interface FeedbackAdminEmailProps {
  firstName: string;
  lastName: string;
  school: string;
  email: string;
  pastExperience: string;
  generalFeedback: string;
}

export const FeedbackAdminEmail = ({
  firstName,
  lastName,
  school,
  email,
  pastExperience,
  generalFeedback,
}: FeedbackAdminEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Someone just submitted feedback on Colabula</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={200} src="https://colabula.com/logo-dark.svg" />
          </Section>
          <Section style={section}>
            <Text style={heading}>New feedback received</Text>
            <Text style={paragraph}>First Name: {firstName}</Text>
            <Text style={paragraph}>Last Name: {lastName}</Text>
            <Text style={paragraph}>School: {school}</Text>
            <Text style={paragraph}>Email: {email}</Text>
            <Text style={paragraph}>Past Experience: {pastExperience}</Text>
            <Text style={paragraph}>General Feedback: {generalFeedback}</Text>

            <Text style={footer}>
              © {new Date().getFullYear()} Cold Sundays, All Rights Reserved.
              Te Awa Kairangi ki Uta, Aotearoa.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
export default FeedbackAdminEmail;
