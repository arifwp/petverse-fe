import { m } from '#/paraglide/messages'

export const HomeNavMenu = () => {
  return (
    <div className="w-full gap-4 flex flex-col">
      <h5 className="text-md font-medium">{m.followed_community()}</h5>
    </div>
  )
}
