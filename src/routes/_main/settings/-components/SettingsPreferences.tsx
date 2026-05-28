// Locale switcher refs:
// - Paraglide docs: https://inlang.com/m/gerre34r/library-inlang-paraglideJs
// - Router example: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#switching-locale
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Switch } from '#/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { useTheme } from '#/utils/theme/ThemeProvider'
import type { ThemeMode } from '#/utils/theme/theme'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'
import type { Locale } from '#/paraglide/runtime'
import { getLocale, locales, setLocale } from '#/paraglide/runtime'
import type { LucideIcon } from 'lucide-react'
import { Bell, ChevronRight, Globe, Moon, Palette, Sun } from 'lucide-react'

// ISO 3166-1 alpha-2 country code per locale, used to build the
// regional indicator emoji. Keep these as country codes (e.g. 'GB'),
// not language codes — 'EN' is not a country.
const LOCALE_COUNTRY: Record<Locale, string> = {
  en: 'GB',
  id: 'ID',
}

const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa Indonesia',
}

type ThemeOption = {
  value: Exclude<ThemeMode, 'system'>
  icon: LucideIcon
  label: () => string
}

const THEME_OPTIONS: ReadonlyArray<ThemeOption> = [
  { value: 'light', icon: Sun, label: () => m.theme_light() },
  { value: 'dark', icon: Moon, label: () => m.theme_dark() },
]

const REGIONAL_INDICATOR_OFFSET = 0x1f1e6 - 'A'.charCodeAt(0)

function countryCodeToFlagEmoji(code: string): string {
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split('')
      .map((char) => char.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET),
  )
}

const renderFlag = (locale?: Locale) => {
  if (!locale) return

  const country = LOCALE_COUNTRY[locale]

  if (!country) return

  return (
    <span
      role="img"
      aria-label={`${locale} flag`}
      className="text-base leading-none"
    >
      {countryCodeToFlagEmoji(country)}
    </span>
  )
}

export const SettingsPreferences = () => {
  const currentLocale = getLocale()
  const { themeMode, setThemeMode } = useTheme()

  const handleThemeChange = (next: string) => {
    setThemeMode(next as ThemeMode)
  }

  return (
    <div className="w-full gap-2 flex flex-col">
      <p className="text-secondary-foreground font-semibold uppercase text-md">
        {m.preferences()}
      </p>

      <div className="w-full bg-white dark:bg-neutral-900 rounded-lg flex flex-col">
        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="w-full p-6 gap-4 flex items-center justify-between border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
              aria-label={m.language()}
            >
              <div className="gap-4 flex items-center">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
                  <Globe className="size-6 text-secondary-foreground" />
                </div>

                <p className="text-md font-semibold">{m.language()}</p>
              </div>

              <div className="gap-2 flex items-center">
                {renderFlag(currentLocale)}

                <p className="text-md text-secondary-foreground font-medium">
                  {LOCALE_LABEL[currentLocale]}
                </p>

                <ChevronRight className="size-6 text-secondary-foreground" />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-40 py-2">
            {locales.map((locale) => (
              <DropdownMenuItem
                key={locale}
                onSelect={() => setLocale(locale)}
                aria-selected={locale === currentLocale}
                className={cn(
                  'gap-2 py-2.5 text-md',
                  locale === currentLocale && 'font-semibold',
                )}
              >
                {renderFlag(locale)}
                {LOCALE_LABEL[locale]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-full p-6 gap-4 flex items-center justify-between border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <Bell className="size-6 text-secondary-foreground" />
            </div>

            <p className="text-md font-semibold">{m.notifications()}</p>
          </div>

          <Switch id="enable_notifications" />
        </div>

        {/* Theme */}
        <div className="w-full p-6 gap-4 flex flex-col">
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <Palette className="size-6 text-secondary-foreground" />
            </div>

            <div className="gap-0 flex flex-col">
              <p className="text-md font-semibold">{m.theme()}</p>
              <p className="text-sm text-secondary-foreground font-medium">
                {m.theme_desc()}
              </p>
            </div>
          </div>

          <Tabs
            value={themeMode}
            onValueChange={handleThemeChange}
            className="w-full"
          >
            <TabsList className="w-full p-1">
              {THEME_OPTIONS.map(({ value, icon: Icon, label }) => (
                <TabsTrigger key={value} value={value}>
                  <Icon />
                  {label()}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
