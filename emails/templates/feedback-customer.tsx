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

export default FeedbackCustomerEmail;
