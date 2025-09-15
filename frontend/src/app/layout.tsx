import "./globals.css";
import { Toaster } from "react-hot-toast";
import { TaskProvider } from "./context/TaskContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>{children}</TaskProvider>
        <Toaster />
      </body>
    </html>
  );
}
