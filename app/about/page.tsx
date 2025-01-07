import { SiteHeader } from "@/components/(landing-page)/site-header";
import { SiteFooter } from "@/components/(landing-page)/site-footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="font-bold flex items-center md:text-5xl text-3xl mb-8">
            About Aratuku
          </h1>

          <p className="mb-4">
            Aratuku is an open-source platform designed to empower teachers and
            facilitate the sharing of educational resources, specifically
            catering to visual arts education. Developed by{" "}
            <a href="https://cold-sundays.com" className="link" target="_blank">
              Cold Sundays Ltd
            </a>{" "}
            (a subsidiary of{" "}
            <a href="https://yufugumi.com" className="link" target="_blank">
              Yufugumi Holdings
            </a>
            ), Aratuku aims to provide a secure and transparent environment for
            educators to collaborate, discover, and share inspiring artwork and
            teaching materials.
          </p>

          <h2 className="font-semibold text-xl">Our mission</h2>
          <p className="mb-4">
            We believe in fostering a vibrant community where teachers can
            connect, learn from each other, and access high-quality resources to
            enhance their teaching practice. By providing a dedicated platform
            for visual arts education, we strive to support creativity and
            innovation in the classroom.
          </p>

          <h2 id="promise" className="font-semibold text-xl">
            The Aratuku Promise
          </h2>
          <p className="mb-4">
            We are committed to the long-term sustainability of Aratuku and the
            valuable content shared within our community. We promise to provide
            full data exports to our users should the platform ever cease
            operations, ensuring the preservation of your valuable resources.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
