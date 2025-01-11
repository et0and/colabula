import CommandMenu from "@/app/portal/_components/command-menu";
import Providers from "@/app/portal/_components/providers";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>{children}</Providers>
      <CommandMenu />
    </>
  );
}
