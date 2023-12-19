import Image from 'next/image'
import "./page.css"
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Main } from './components/main_section/page'
import { Sidebar } from './components/sidebar/sidebar'

export default function Home() {
  return <>
    <Sidebar />

    <div className='main'>
      <Header />
      <Main />
      <Footer />
    </div>
  </>
}