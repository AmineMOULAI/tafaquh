import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Axes from '@/components/Axes'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import LoadingAnimation from '@/components/LoadingAnimation'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  
  return (
    <main className="min-h-screen">
      <LoadingAnimation lng={lang} />
      <Header lng={lang} />
      <Hero lng={lang} />
      <About lng={lang} />
      <Axes lng={lang} />
      <ContactForm lng={lang} />
      <Footer lng={lang} />
    </main>
  )
}
