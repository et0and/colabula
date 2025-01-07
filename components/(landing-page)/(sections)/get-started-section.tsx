export function GetStartedSection() {
  return (
    <section className="container px-4 md:px-6 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold sm:text-2xl md:text-3xl mb-2">
            Because teachers deserve a better way{" "}
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
