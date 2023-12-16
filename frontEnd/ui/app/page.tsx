import Image from 'next/image'
import "./page.css"

export default function Home() {
  return <>
    <div className='sidebar'>
      side bar
    </div>

    <div className='main'>

      <div className='header'>
        header
      </div>

      <section className='section'>main section</section>

      <footer className='footer'>footer</footer>
    </div>
  </>
}
