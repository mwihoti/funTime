import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import Header from "./components/Header";
import { ClerkProvider } from '@clerk/nextjs'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "chat-app",
  description: "chat-app by mwihoti",
};
export default function RootLayout({
  children,
}) {
  return (
   
    <html lang="en">
      <body
        className=''
      >
         <ClerkProvider>
        <Providers>
          <Header />
          <div className="flex justify-center items-center p-24">
          <main>{children}</main>
          </div>
       
        </Providers>
        </ClerkProvider>
      
          
          
     
      </body>
    </html>
  
  );
}       