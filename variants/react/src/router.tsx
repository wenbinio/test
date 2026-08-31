import { useCallback, useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'

/** React 18 types a `useRef<T | null>(null)` as a MutableRefObject, which is
 *  what every route receives for its <h1>. Shared here so the routes agree. */
export type HeadingRef = MutableRefObject<HTMLHeadingElement | null>

/**
 * A hash router, deliberately.
 *
 * pushState routing needs the host to rewrite every unknown path back to
 * index.html. A hash route works from a plain static bucket, from a sub-path,
 * and from a file:// URL with no server configuration at all — which matters
 * for a page someone may well save and open offline.
 */

export const ROUTES = ['/', '/pee', '/poo', '/red-flags', '/log'] as const
export type RoutePath = (typeof ROUTES)[number]

export const ROUTE_TITLES: Record<RoutePath, string> = {
  '/': 'Ins & Outs — a field guide to peeing and pooing',
  '/pee': 'Peeing — Ins & Outs',
  '/poo': 'Pooing — Ins & Outs',
  '/red-flags': 'Warning signs — Ins & Outs',
  '/log': 'The logbook — Ins & Outs',
}

function normalise(raw: string): RoutePath {
  let path = raw
  if (path.indexOf('#') === 0) path = path.slice(1)
  if (path.length === 0) path = '/'
  if (path.charAt(0) !== '/') path = '/' + path
  // Drop any query or nested fragment so "#/pee?x=1" still resolves.
  const q = path.indexOf('?')
  if (q !== -1) path = path.slice(0, q)
  if (path.length > 1 && path.charAt(path.length - 1) === '/') {
    path = path.slice(0, path.length - 1)
  }
  for (let i = 0; i < ROUTES.length; i += 1) {
    if (ROUTES[i] === path) return ROUTES[i]
  }
  return '/'
}

function currentRoute(): RoutePath {
  if (typeof window === 'undefined') return '/'
  return normalise(window.location.hash)
}

export function useRouter() {
  const [route, setRoute] = useState<RoutePath>(currentRoute)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Title on every route, focus only after a real navigation. Moving focus on
  // first paint would yank it away from a reader who arrived mid-page.
  useEffect(() => {
    document.title = ROUTE_TITLES[route]
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    const heading = headingRef.current
    if (heading) heading.focus()
  }, [route])

  const navigate = useCallback((to: RoutePath) => {
    if (window.location.hash === '#' + to) {
      setRoute(to)
      return
    }
    window.location.hash = '#' + to
  }, [])

  return { route, navigate, headingRef }
}

export function hrefFor(path: RoutePath): string {
  return '#' + path
}
