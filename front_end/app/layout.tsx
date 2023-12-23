"use client";

import "./globals.css";
import { Header } from "./header/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>BUNN DAO | TEAM-B</title>
      </head>
      <body className={"" + " body"}>
        <Header />

        <div className="children bg-green-100 text-black">{children}</div>

        <div className="bottom-0 bg-green-700 text-center p-6">
          <footer className="footer text-black">
            Created by <br />
            <a
              href="https://github.com/soomtochukwu"
              target="Somtochukwu"
              className="hover:border-l-2 p-2 border-black active:bg-green-900"
            >
              Somtochukwu
            </a>
            <br />
            <a
              href="https://github.com/favxlaw"
              target="Favour"
              className="hover:border-l-2 p-2 border-black active:bg-green-900"
            >
              Favour
            </a>
            <br />
            <a
              href=""
              target="Franklin"
              className="hover:border-l-2 p-2 border-black active:bg-green-900"
            >
              Franklin
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
