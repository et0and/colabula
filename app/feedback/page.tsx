"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "sonner";
import { submitFeedback } from "@/app/actions/form";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { feedbackFormContent } from "@/lib/strings";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/(landing-page)/site-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackFormData } from "@/types/feedback";
import Image from "next/image";
import Script from "next/script";

interface SplitProps {
  left: JSX.Element;
}

declare global {
  interface Window {
    onTurnstileSuccess: (token: string) => void;
  }
}

const Split = (props: React.PropsWithChildren<SplitProps>) => {
  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen lg:max-w-[1800px] mx-auto">
      <div className="flex-1 gap-6 mb-3 lg:mb-0 lg:border-r-[1px] border-border border-solid">
        <div className="top-0 w-full px-12 lg:sticky lg:h-screen xl:px-28 lg:py-9">
          {props.left}
        </div>
      </div>
      <div className="flex-1">
        <main id="main" className="px-12 xl:px-28 lg:py-9">
          {props.children}
        </main>
      </div>
    </div>
  );
};

const formSchema = yup.object({
  firstName: yup
    .string()
    .required()

    .max(50)
    .matches(
      /^[a-zA-Z\s-']+$/,
      "Only letters, spaces, hyphens and apostrophes allowed"
    ),
  lastName: yup
    .string()
    .required()

    .max(50)
    .matches(
      /^[a-zA-Z\s-']+$/,
      "Only letters, spaces, hyphens and apostrophes allowed"
    ),
  school: yup.string().required(),
  pastExperience: yup
    .string()
    .required()

    .max(2000)
    .matches(/^[\w\s.,!?()-]+$/, "Invalid characters detected"),
  email: yup.string().email().required().max(254),
  generalFeedback: yup
    .string()
    .required()

    .max(5000)
    .matches(/^[\w\s.,!?()-]+$/, "Invalid characters detected"),
});

export default function RouterForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
    };
  }, []);

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      school: "",
      pastExperience: "",
      email: "",
      generalFeedback: "",
    },
  });

  const LeftContent = (
    <div className="flex h-full flex-col justify-center">
      <div className="hidden md:inline">
        <Image src={"/feedback.svg"} alt="" width={200} height={200} />
      </div>
      <h1 className="font-bold flex items-center md:text-5xl text-3xl my-8">
        {feedbackFormContent.title}
      </h1>
      <p className="mb-4">{feedbackFormContent.intro}</p>
    </div>
  );

  async function onSubmit(data: FeedbackFormData) {
    setIsSubmitting(true);
    try {
      // Include the Turnstile token with other form data
      const success = await submitFeedback({ ...data, turnstileToken });
      if (success) {
        toast.success(feedbackFormContent.toasts.success);
        router.push("/feedback/thanks");
      } else {
        toast.error(feedbackFormContent.toasts.error);
      }
    } catch (error) {
      toast.error(feedbackFormContent.toasts.submitError);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col mx-auto mb-8">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <SiteHeader />
      <Split left={LeftContent}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-8"
          >
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-action="submit"
              data-callback="onTurnstileSuccess"
              data-response-field="cf-turnstile-response"
              style={{ display: "none" }}
            ></div>

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Miki"
                      {...field}
                      type="string"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Yufu" {...field} type="string" />
                  </FormControl>
                  <FormDescription>
                    Enter your surname/family name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="miki@yufugumi.com"
                      {...field}
                      type="email"
                      required
                    />
                  </FormControl>
                  <FormDescription>Enter your school email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a school" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {feedbackFormContent.schools.map((school) => (
                        <SelectItem key={school.value} value={school.value}>
                          {school.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Please select where you currently teach
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pastExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {feedbackFormContent.pastExperience.label}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        feedbackFormContent.pastExperience.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {feedbackFormContent.pastExperience.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generalFeedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {feedbackFormContent.generalFeedback.label}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        feedbackFormContent.generalFeedback.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {feedbackFormContent.generalFeedback.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </Split>
    </div>
  );
}
