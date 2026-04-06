import "./globals.css";

export const metadata = {
  title: "Betting AI Dashboard",
  description: "Mobilvänlig frontend för Betting AI"
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
