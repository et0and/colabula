import CommandMenu from "@/components/command-menu";
import Providers from "@/components/providers";

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
