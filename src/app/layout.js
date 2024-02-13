import ReduxProvider from "../../provider/redux/ReduxProvider";
import "./globals.css";

import { Quicksand } from "next/font/google";

const QuicksandDataFont = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Trang quản trị BK truyện audio",
  description: "Manager BK story ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/images/icons/bk_icon.png" sizes="any" />
      <body className={QuicksandDataFont.className}>
        <ReduxProvider>{children} </ReduxProvider>
      </body>
    </html>
  );
}
