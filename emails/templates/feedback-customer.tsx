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
import * as React from "react";

export const FeedbackCustomerEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your feedback!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={200} src="https://colabula.com/logo-dark.svg" />
          </Section>
          <Section style={section}>
            <Text style={heading}>Thank you for your feedback!</Text>
            <Text style={paragraph}>
              Feel free to reach out to us if you have any questions or need
              further assistance.
            </Text>

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

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const footer = {
  margin: "0 auto",
  fontSize: "12px",
  maxWidth: "580px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

export default FeedbackCustomerEmail;
