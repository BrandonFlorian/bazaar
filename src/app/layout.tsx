import RootStyleRegistry from "./emotion";

export const metadata = {
  title: "Elysian Emporium",
  description:
    "A mystical marketplace where exotic treasures, enchanted artifacts, and magical wares from realms beyond converge, catering to heroes and adventurers seeking the extraordinary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
