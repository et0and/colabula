export function GetStartedSection() {
  return (
    <section className="container px-4 md:px-6 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">
            Unlock better results.
          </h2>
          <img
            src="/logo.svg"
            alt="Aratuku Logo"
            className="w-96 hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}
