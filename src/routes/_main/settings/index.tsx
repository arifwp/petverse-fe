import { createFileRoute } from '@tanstack/react-router'
import { SettingsProfile } from './-components/SettingsProfile'

export const Route = createFileRoute('/_main/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full py-4 px-4 lg:px-0 lg flex flex-col">
      <SettingsProfile />
    </div>
  )
}
