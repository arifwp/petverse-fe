import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import { getLocale } from '#/paraglide/runtime'
import { ThemeProvider } from '#/utils/theme/ThemeProvider'
import { DEFAULT_THEME_MODE, THEME_INIT_SCRIPT } from '#/utils/theme/theme'
import { getThemeCookie } from '#/utils/theme/theme.functions'

import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import appCss from '../styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }

    const themeMode = await getThemeCookie()
    return { themeMode }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { themeMode } = useRouteContext({ from: '__root__' })
  const resolved =
    themeMode === 'light' || themeMode === 'dark' ? themeMode : undefined

  return (
    <html
      lang={getLocale()}
      className={resolved}
      data-theme={resolved ?? DEFAULT_THEME_MODE}
      style={resolved ? { colorScheme: resolved } : undefined}
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
        <script
          // Runs before paint to resolve `system` mode and avoid FOUC.
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>

      <body>
        <Toaster position="bottom-center" reverseOrder={false} />

        <ThemeProvider initialThemeMode={themeMode}>
          <main>{children}</main>
        </ThemeProvider>

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
