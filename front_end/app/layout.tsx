"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
const navlinks = [
  { name: "Home", href: "/" },
  { name: "Discuss", href: "/discussion" },
  { name: "Proposals", href: "/proposals" },
  { name: "Portal", href: "/portal" },
  { name: "About", href: "/about" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <html>
      <head>
        <title>BUNN DAO | TEAM-B</title>
      </head>
      <body className={inter.className + " body"}>
        <div>
          <header className="p-6 bg-green-700 text-center text-2xl font-mono font-bold">
            BUNN DApp MVP for Decentralized Autonomous Organizations
          </header>

          <div className="text-center">
            {navlinks.map((link) => {
              const isActive = pathName == link.href;
              return (
                <Link
                  href={link.href}
                  key={link.name}
                  className={
                    "navs inline-block w-32 bg-green-950 active:bg-green-900 hover:bg-black p-3 " +
                    (isActive ? " font-bold text-green-500 " : "")
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

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
