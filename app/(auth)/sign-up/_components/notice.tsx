"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Banner } from "@/components/ui/banner";

export function NoticeBanner() {
  const [show, setShow] = useState(true);

  return (
    <Banner
      show={show}
      onHide={() => setShow(false)}
      icon={<AlertCircle className="m-px h-4 w-4 text-green-800" />}
      title={
        <>
          Only schools participating in the private beta can currently sign up
          for an account. If you would like to give Aratuku a go, please contact
          us.
        </>
      }
      learnMoreUrl="mailto:info@colabula.com"
    />
  );
}
