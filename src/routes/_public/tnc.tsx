import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/tnc')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/tnc"!</div>
}
