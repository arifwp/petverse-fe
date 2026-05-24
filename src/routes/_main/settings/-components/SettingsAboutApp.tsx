import { m } from '#/paraglide/messages'
import { Link } from '@tanstack/react-router'
import { ChevronRight, CircleAlert, Handshake, ShieldCheck } from 'lucide-react'

export const SettingsAboutApp = () => {
  return (
    <div className="w-full gap-2 flex flex-col">
      <p className="text-secondary-foreground font-semibold uppercase text-md">
        {m.about()}
      </p>

      <div className="w-full bg-white dark:bg-neutral-900 rounded-lg flex flex-col">
        {/* App Version */}
        <div className="w-full p-6 gap-4 flex items-center justify-between border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <CircleAlert className="size-6 text-secondary-foreground" />
            </div>

            <p className="text-md font-semibold">{m.app_version()}</p>
          </div>

          <p className="text-md text-secondary-foreground font-medium">1.0.0</p>
        </div>

        {/* Privacy Policy */}
        <Link
          to="/privacy-policy"
          className="w-full p-6 gap-4 flex items-center justify-between border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
        >
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <ShieldCheck className="size-6 text-secondary-foreground" />
            </div>

            <p className="text-md font-semibold">{m.privacy_policy()}</p>
          </div>

          <ChevronRight className="size-6 text-secondary-foreground" />
        </Link>

        {/* TNC */}
        <Link
          to="/tnc"
          className="w-full p-6 gap-4 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
        >
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <Handshake className="size-6 text-secondary-foreground" />
            </div>

            <p className="text-md font-semibold">{m.tnc()}</p>
          </div>

          <ChevronRight className="size-6 text-secondary-foreground" />
        </Link>
      </div>
    </div>
  )
}
