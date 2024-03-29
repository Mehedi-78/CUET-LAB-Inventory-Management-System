import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import "../../app/globals.css";
import Provider from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import getUserSession from "@/helper/getUserSession";
import ContextProvider from "@/context/ContextProvider";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.className} w-full`}>
        <ContextProvider>
          <Provider>
            <MantineProvider>
              <Toaster
                position="top-center"
                reverseOrder={false}
              />
              <Layout >
                {children}
              </Layout>
            </MantineProvider>
          </Provider>
        </ContextProvider>
      </body>
    </html>
  );
}