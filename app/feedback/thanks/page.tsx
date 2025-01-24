import { SiteHeader } from "@/components/(landing-page)/site-header";
import { feedbackThanksContent } from "@/lib/strings";

export const metadata = {
  title: "Thanks! | Colabula",
  description: "Thank you for your feedback",
};

export default function ThanksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto p-6 max-w-3xl text-center">
          <p className="font-medium md:text-5xl text-3xl mb-4">
            {feedbackThanksContent.title}
          </p>
          <p>{feedbackThanksContent.message}</p>
        </div>
      </main>
    </div>
  );
}
