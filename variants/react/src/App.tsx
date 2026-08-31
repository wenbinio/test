import { Masthead, SiteFooter } from './components/Layout'
import { Home } from './routes/Home'
import { Log } from './routes/Log'
import { Pee } from './routes/Pee'
import { Poo } from './routes/Poo'
import { RedFlags } from './routes/RedFlags'
import { useRouter } from './router'

export default function App() {
  const { route, headingRef } = useRouter()

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead route={route} />
      <main id="main">
        {route === '/' ? <Home headingRef={headingRef} /> : null}
        {route === '/pee' ? <Pee headingRef={headingRef} /> : null}
        {route === '/poo' ? <Poo headingRef={headingRef} /> : null}
        {route === '/red-flags' ? <RedFlags headingRef={headingRef} /> : null}
        {route === '/log' ? <Log headingRef={headingRef} /> : null}
      </main>
      <SiteFooter />
    </>
  )
}
