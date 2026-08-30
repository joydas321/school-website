import "./globals.css";

export const metadata = {
  title: "PM SHRI Adarsh Vidyalaya",
  description:
    "Official website of PM SHRI Adarsh Vidyalaya, Barkhetri, Nalbari, Assam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}