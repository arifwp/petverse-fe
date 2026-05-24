import Header from '#/components/navs/headers/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-full bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  )
}
