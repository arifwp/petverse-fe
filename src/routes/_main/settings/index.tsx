import { createFileRoute } from '@tanstack/react-router'
import { SettingsPreferences } from './-components/SettingsPreferences'
import { SettingsProfile } from './-components/SettingsProfile'
import { SettingsPrivacy } from './-components/SettingsPrivacy'
import { SettingsAboutApp } from './-components/SettingsAboutApp'
import { SettingsDeleteAccount } from './-components/SettingsDeleteAccount'

export const Route = createFileRoute('/_main/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4 lg:px-0 flex flex-col">
      <div className="w-full gap-8 flex flex-col items-center justify-center">
        <SettingsProfile />

        <SettingsPreferences />

        <SettingsPrivacy />

        <SettingsAboutApp />

        <SettingsDeleteAccount />
      </div>
    </div>
  )
}
