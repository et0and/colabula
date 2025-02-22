import CommandMenu from "@/app/(frontend)/(dashboard)/portal/_components/command-menu";
import Providers from "@/app/(frontend)/(dashboard)/portal/_components/providers";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>{children}</Providers>
      <CommandMenu />
    </>
  );
}
