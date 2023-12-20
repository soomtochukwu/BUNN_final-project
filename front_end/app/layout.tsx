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
        <title>
          BUNN DAO | TEAM-B
        </title>
      </head>
      <body className={inter.className}>
        <div>
          <header className="p-6 bg-green-700 text-center text-2xl font-mono font-bold">
            BUNN DApp MVP for Decentralized Autonomous Organizations
          </header>

          <div className="text-center p-3">
            {navlinks.map((link) => {
              const isActive = (pathName == link.href);
              return (
                <Link
                  href={link.href}
                  key={link.name}
                  className={
                    "hover:rounded-2xl  hover:border-b-4 hover:border-t-2 hover:border-green-300 p-3" +
                    (isActive ? "font-bold p-3 text-green-500" : "")
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-green-100 text-black">{children}</div>

        <div className="bottom-0 bg-green-700 text-center p-6">
          <footer>
            Created by <br />

            <a href="https://github.com/soomtochukwu" target="Somtochukwu">
              Somtochukwu
            </a>

            <br />

            <a href="https://github.com/favxlaw" target="Favour">
              Favour
            </a>

            <br />

            <a href="" target="Franklin">
              Franklin
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
