import Link from "next/link"

import "./main.css"
const Main = () => {
    return (
        <div className='section'>
            <Link href="/app/main_section">discuss</Link>
            <Link href="./propose">propose</Link>
        </div>
    )
}

export { Main }