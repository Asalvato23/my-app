import "./globals.css";
import ToastProvider from "./components/ToastProvider";
import WatchlistProvider from "./components/WatchlistProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <WatchlistProvider>{children}</WatchlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}