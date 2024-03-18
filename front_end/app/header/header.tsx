import Link from "next/link";
import "./header.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getAccount, readContract } from "@wagmi/core";

// getAccount().address

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  governor_abi,
  governor_address,
  utility_token_abi,
  utility_token_address,
} from "../var";
import { useState } from "react";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "Discuss", href: "/discussion" },
  { name: "Proposals", href: "/proposals" },
  { name: "Portal", href: "/portal" },
  { name: "About", href: "/about" },
];
export const Header = () => {
  const pathName = usePathname(),
    [balance, setBalance] = useState(0),
    [Admin, setAdmin] = useState(false),
    ShowBalance = async () => {
      const _balance = await readContract({
        address: utility_token_address,
        abi: utility_token_abi,
        functionName: "balanceOf",
        args: [getAccount().address],
      });
      setBalance(Number(_balance));
    },
    isAdmin = async () => {
      const admin = await readContract({
        address: governor_address,
        abi: governor_abi,
        functionName: "admin",
        args: [getAccount().address],
      });
      // @ts-ignore
      setAdmin(admin[0]);
    };
  isAdmin();
  ShowBalance();
  return (
    <header className="sticky p-2 header top-0 flex items-center backdrop-blur-lg">
      <Link href="/" key="/">
        <Image
          className="inline ml-3"
          src="/header/bunn-dao-logo.png" // Path relative to the public directory
          alt="Bunn DAO Logo"
          width={90}
          height={90}
        />
      </Link>

      <div>
        <ConnectButton
          label="Connect"
          showBalance={false}
          accountStatus="avatar"
        />
        <div className="bg-gray-900 p-1 flex text-center rounded-xl w-full font-bold ">
          <Link href="/buy" title="Buy More BUNN" className="mx-auto">
            <b>{balance} BUNN</b>
          </Link>
        </div>
      </div>
      <span className="menu hidden inline rounded-xl px-3 py-1 ml-auto mr-3">
        menu
      </span>

      <nav className="default-nav inline ml-auto">
        {navlinks.map((link) => {
          const isActive = pathName == link.href;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={
                "navs inline-block  active:bg-green-950 hover:bg-green-900 text-center" +
                (isActive ? " font-bold text-green-500 " : "")
              }
            >
              {link.name}
            </Link>
          );
        })}
        {Admin == true ? (
          <Link
            href="/dashboard"
            key="dashboard"
            className={
              "navs inline-block  active:bg-green-950 hover:bg-green-900 text-center font-bold text-green-700 "
            }
          >
            Dashboard
          </Link>
        ) : null}
      </nav>
      <nav className="drop-nav hidden inline ml-auto">
        {navlinks.map((link) => {
          const isActive = pathName == link.href;
          return (
            <Link
              href={link.href}
              key={link.name}
              className="block p-3 w-56
                            hover:text-green-500 m-2"
            >
              {link.name}
              <br />
            </Link>
          );
        })}
        {Admin == true ? (
          <Link
            href="/dashboard"
            key="dashboard"
            className={
              "navs inline-block  active:bg-green-950 hover:bg-green-900 text-center font-bold text-green-700 "
            }
          >
            Admin
          </Link>
        ) : null}
      </nav>
    </header>
  );
};
