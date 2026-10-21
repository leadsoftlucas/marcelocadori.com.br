import Header from '../components/Header'
import Hero from '../components/Hero'
import ServicesCarousel from '../components/ServicesCarousel'
import Process from '../components/Process'
import FaqNews from '../components/FaqNews'
import AboutMarcelo from '../components/AboutMarcelo'
import AboutShop from '../components/AboutShop'
import Location from '../components/Location'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

/** Landing page única. A ordem das seções segue a jornada do cliente (ver Memoria/04 - Site). */
export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#servicos" title="Pular o menu e ir direto aos serviços">Pular para os serviços</a>
      <Header />
      <main>
        <Hero />
        <ServicesCarousel />
        <Process />
        <FaqNews />
        <AboutMarcelo />
        <AboutShop />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
