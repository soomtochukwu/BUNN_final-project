import Link from "next/link";
import "./header.css"
import { usePathname } from "next/navigation";
import Image from "next/image";

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
        <header className="sticky top-0 flex items-center backdrop-blur-lg">
            <Image
                className="m-3 inline "
                src="/header/bunn-dao-logo.png" // Path relative to the public directory
                alt="Bunn DAO Logo"
                width={80}
                height={80}
            />
            <span className="menu hidden inline rounded-xl px-3 m-3 ml-auto">menu</span>

            <nav className="default-nav inline m-3 ml-auto">

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
            </nav>
            <nav className="drop-nav hidden inline m-3 ml-auto">
                {navlinks.map((link) => {
                    const isActive = pathName == link.href;
                    return (
                        <Link
                            href={link.href}
                            key={link.name}
                            className=" border-2 m-4"
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
