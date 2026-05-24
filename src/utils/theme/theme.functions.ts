import { THEME_COOKIE, parseThemeMode } from '#/utils/theme/theme'
import type { ThemeMode } from '#/utils/theme/theme'
import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'

export const getThemeCookie = createServerFn({ method: 'GET' }).handler(() => {
  return parseThemeMode(getCookie(THEME_COOKIE))
})

export const setThemeCookie = createServerFn({ method: 'POST' })
  .inputValidator((mode: ThemeMode) => parseThemeMode(mode))
  .handler(({ data }) => {
    setCookie(THEME_COOKIE, data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  })
