import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/community/$communityId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/community/$communityId"!</div>
}
