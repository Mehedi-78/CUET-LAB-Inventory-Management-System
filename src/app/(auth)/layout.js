import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import "../globals.css";
import Provider from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex justify-center items-center pb-16`}>
        <Provider>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <MantineProvider>
            {children}
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}