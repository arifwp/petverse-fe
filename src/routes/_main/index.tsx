import { m } from '#/paraglide/messages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({ component: App })

function App() {
  return <h1>{m.adopt()}</h1>
}
