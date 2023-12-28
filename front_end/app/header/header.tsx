import Link from "next/link";
import "./header.css"
import { usePathname } from "next/navigation";
import Image from "next/image";


import {
    ConnectButton,
} from '@rainbow-me/rainbowkit';

const navlinks = [
    { name: "Home", href: "/" },
    { name: "Discuss", href: "/discussion" },
    { name: "Proposals", href: "/proposals" },
    { name: "Portal", href: "/portal" },
    { name: "About", href: "/about" },
];
export const Header = () => {
    const pathName = usePathname();
    return (
        <header className="sticky p-2 header top-0 flex items-center backdrop-blur-lg">
            <Image
                className="inline ml-3"
                src="/header/bunn-dao-logo.png" // Path relative to the public directory
                alt="Bunn DAO Logo"
                width={70}
                height={70}
            />
            <ConnectButton
                label='Connect'
                showBalance={false}
                accountStatus="avatar"
            />
            <span className="menu hidden inline rounded-xl px-3 py-1 ml-auto mr-3">menu</span>

            <nav className="default-nav inline ml-auto">

                {navlinks.map((link) => {
                    const isActive = pathName == link.href;
                    return (
                        <Link
                            href={link.href}
                            key={link.name}
                            className={
                                "navs inline-block w-28  active:bg-green-950 hover:bg-green-900 text-center py-2 " +
                                (isActive ? " font-bold text-green-700 " : "")
                            }
                        >
                            {link.name}
                        </Link>
                    );
                })}
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
            </nav>
        </header>
    )
}
