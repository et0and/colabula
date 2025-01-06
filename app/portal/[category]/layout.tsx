import CommandMenu from "@/components/command-menu";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CommandMenu />
    </>
  );
}
