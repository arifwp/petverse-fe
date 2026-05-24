import { Tabs, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { m } from '#/paraglide/messages'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight, Eye, Globe, Lock, Shield } from 'lucide-react'
import { useState } from 'react'
import { SettingsBlockedUserDialog } from './SettingsBlockedUserDialog'

type ProfileVisibility = 'public' | 'private'

type VisibilityOption = {
  value: ProfileVisibility
  icon: LucideIcon
  label: () => string
}

const VISIBILITY_OPTIONS: ReadonlyArray<VisibilityOption> = [
  { value: 'public', icon: Globe, label: () => m.public() },
  { value: 'private', icon: Lock, label: () => m.private() },
]

export const SettingsPrivacy = () => {
  const [visibility, setVisibility] = useState<ProfileVisibility>('public')
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="w-full gap-2 flex flex-col">
        <p className="text-secondary-foreground font-semibold uppercase text-md">
          {m.privacy()}
        </p>

        <div className="w-full bg-white dark:bg-neutral-900 rounded-lg flex flex-col">
          {/* Blocked Users */}
          <div
            className="w-full p-6 gap-4 flex items-center justify-between border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="gap-4 flex items-center">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
                <Shield className="size-6 text-secondary-foreground" />
              </div>

              <p className="text-md font-semibold">{m.blocked_users()}</p>
            </div>

            <div className="gap-2 flex items-center">
              <p className="text-md text-secondary-foreground font-medium">3</p>

              <ChevronRight className="size-6 text-secondary-foreground" />
            </div>
          </div>

          <div className="w-full p-6 gap-4 flex flex-col">
            <div className="gap-4 flex items-center">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
                <Eye className="size-6 text-secondary-foreground" />
              </div>

              <div className="gap-0 flex flex-col">
                <p className="text-md font-semibold">
                  {m.profile_visibility()}
                </p>
                <p className="text-sm text-secondary-foreground font-medium">
                  {m.profile_visibility_desc()}
                </p>
              </div>
            </div>

            <Tabs
              value={visibility}
              onValueChange={(next) => setVisibility(next as ProfileVisibility)}
              className="w-full"
            >
              <TabsList className="w-full p-1">
                {VISIBILITY_OPTIONS.map(({ value, icon: Icon, label }) => (
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

      {open && <SettingsBlockedUserDialog open={open} setOpen={setOpen} />}
    </>
  )
}
