import { LOGO_URL } from '#/constants/url.ts'
import { m } from '#/paraglide/messages.js'
import { Link } from '@tanstack/react-router'
import { HeaderMobile } from './HeaderMobile.tsx'
import { HeaderProfileMenu } from './HeaderProfileMenu.tsx'

export interface Menu {
  id: number
  label: string
  href: string
}

export const headerMenus: Menu[] = [
  {
    id: 1,
    label: m.home(),
    href: '/',
  },
  {
    id: 2,
    label: m.search(),
    href: '/search',
  },
  {
    id: 3,
    label: m.discussions(),
    href: '/discussions',
  },
  {
    id: 4,
    label: m.adopt(),
    href: '/adopt',
  },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-20 px-4 bg-white dark:bg-neutral-900 border-b border-b-neutral-200 dark:border-b-neutral-800">
      <nav className="h-full gap-4 flex items-center justify-between">
        <div className="gap-4 flex items-center">
          <Link to="/" className="text-lg font-bold flex items-center gap-2">
            <img
              src={LOGO_URL}
              alt={import.meta.env.VITE_APP_NAME + ' Logo'}
              className="w-12 h-12 aspect-square object-contain"
            />

            <span>{import.meta.env.VITE_APP_NAME}</span>
          </Link>
        </div>

        <div className="gap-2 flex items-center">
          <HeaderMobile />

          <div className="hidden md:flex gap-4 items-center">
            {headerMenus.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}

            <HeaderProfileMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}
