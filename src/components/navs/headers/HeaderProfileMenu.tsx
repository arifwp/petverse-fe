import { m } from '#/paraglide/messages'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Menu } from './Header'
import { Link } from '@tanstack/react-router'

const profileMenus: Menu[] = [
  {
    id: 1,
    label: m.account_profile(),
    href: '/account-profile',
  },
  {
    id: 2,
    label: m.settings(),
    href: '/settings',
  },
]

export const HeaderProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="gap-2 flex items-center">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/picsum/100/100" />
            <AvatarFallback>AW</AvatarFallback>
          </Avatar>

          <div className="flex md:hidden items-center">
            <p className="text-sm text-ellipsis">Arif Wahyu Prasetyo</p>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {profileMenus.map((item) => (
            <DropdownMenuItem key={item.id}>
              <Link to={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-400">
            {m.logout()}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
