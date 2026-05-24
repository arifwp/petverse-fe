import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/adopt')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/adopt"!</div>
}
