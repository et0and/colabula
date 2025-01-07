import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  url: string;
}

export const VerificationEmail = ({ url }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your Aratuku account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={200} src="https://tabula-sand.vercel.app/logo.svg" />
          </Section>
          <Section style={section}>
            <Text style={heading}>Verify your account</Text>
            <Text style={paragraph}>
              Click the button below to verify your Aratuku account
            </Text>
            <Link style={link} href={url}>
              Confirm
            </Link>

            <Text style={paragraph}>
              If you didn&apos;t request this, you can safely ignore this email.
            </Text>
            <Text style={footer}>
              © 2025 Cold Sundays, All Rights Reserved. Te Awa Kairangi ki Uta,
              Aotearoa.
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

const link = {
  backgroundColor: "#000000",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  width: "auto",
  padding: "14px 28px",
  margin: "0 0 15px",
  cursor: "pointer",
};

VerificationEmail.PreviewProps = {} as VerificationEmailProps;

export default VerificationEmail;
