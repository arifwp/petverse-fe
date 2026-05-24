import { createFileRoute } from '@tanstack/react-router'
import { SettingsProfile } from './-components/SettingsProfile'

export const Route = createFileRoute('/_main/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full flex flex-col">
      <SettingsProfile />
    </div>
  )
}
