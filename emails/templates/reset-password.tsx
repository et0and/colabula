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
import {
  main,
  container,
  section,
  footer,
  logo,
  heading,
  paragraph,
  link,
} from "../styles";
import * as React from "react";

interface ResetPasswordEmailProps {
  url: string;
}

export const ResetPasswordEmail = ({ url }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Colabula password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={200} src="https://colabula.com/logo-dark.svg" />
          </Section>
          <Section style={section}>
            <Text style={heading}>Reset your password</Text>
            <Text style={paragraph}>
              Click the button below to reset your password
            </Text>
            <Link style={link} href={url}>
              Reset password
            </Link>

            <Text style={paragraph}>
              If you didn&apos;t request this, you can safely ignore this email.
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

ResetPasswordEmail.PreviewProps = {} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
