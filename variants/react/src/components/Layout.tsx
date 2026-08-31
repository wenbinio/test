import type { ReactNode } from 'react'
import { hrefFor, ROUTES } from '../router'
import type { RoutePath } from '../router'
import { ThemeToggle } from './ThemeToggle'

const NAV_LABELS: Record<RoutePath, string> = {
  '/': 'Start here',
  '/pee': 'Peeing',
  '/poo': 'Pooing',
  '/red-flags': 'Warning signs',
  '/log': 'The logbook',
}

export function Masthead({ route }: { route: RoutePath }) {
  return (
    <header className="masthead">
      <div className="shell">
        <div className="masthead__bar">
          <a className="masthead__brand" href={hrefFor('/')}>
            Ins <span>&amp;</span> Outs
          </a>
          <p className="masthead__strap">A field guide to the plumbing</p>
          <div className="masthead__tools noPrint">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <nav className="nav" aria-label="Sections">
        <div className="shell">
          <ul className="nav__list">
            {ROUTES.map((path) => (
              <li key={path}>
                <a
                  className="nav__link"
                  href={hrefFor(path)}
                  aria-current={route === path ? 'page' : undefined}
                >
                  {NAV_LABELS[path]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <p className="footer__disclaimer">
              This is general health information. It is not medical advice.
            </p>
            <p>
              It cannot examine you, it does not know your history, and it is no
              substitute for a clinician who can do both. If something here is
              described as urgent, treat it as urgent. If something feels badly
              wrong and this site does not mention it, that is a reason to be
              seen, not a reason to wait.
            </p>
            <p>
              Figures come from mainstream clinical sources and are given as
              ranges, because that is how bodies work. Where the evidence is
              weak — cranberry juice, probiotics, most of what you have been
              told about hydration — it says so rather than smoothing it over.
            </p>
            <p>
              Nothing you type into the logbook is sent anywhere. There is no
              analytics, no account and no network request. It lives in your
              own browser until you clear it.
            </p>
          </div>
          <nav aria-label="All sections">
            <ul className="footer__nav">
              {ROUTES.map((path) => (
                <li key={path}>
                  <a href={hrefFor(path)}>{NAV_LABELS[path]}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export function Section({
  id,
  children,
}: {
  id?: string
  children: ReactNode
}) {
  return (
    <section className="section" id={id}>
      <div className="shell">{children}</div>
    </section>
  )
}

/** Editorial two-column split: sticky heading column, content column. */
export function Split({
  aside,
  children,
}: {
  aside: ReactNode
  children: ReactNode
}) {
  return (
    <div className="split">
      <div className="split__aside">{aside}</div>
      <div>{children}</div>
    </div>
  )
}

export function Scroller({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  /* tabIndex makes the scroll container reachable by keyboard, which is the
     documented fix for scrollable regions that would otherwise be unreachable
     without a pointer. */
  return (
    <div className="scroller" tabIndex={0} role="group" aria-label={label}>
      {children}
    </div>
  )
}
