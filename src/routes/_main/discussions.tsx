import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/discussions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/discussions"!</div>
}
