import { m } from '#/paraglide/messages'
import type { Community } from '#/types/community.types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Globe } from 'lucide-react'
import { useState } from 'react'

export const HomePostShareTo = () => {
  const [selected, setSelected] = useState<Community | undefined>(undefined)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-fit h-fit px-1.5 py-1 text-sm rounded-md bg-transparent text-primary border-border flex items-center hover:bg-primary/10">
          Open
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm font-semibold">
            Choose Audience
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <div className="p-2 rounded-full bg-primary">
              <Globe className="size-4" />
            </div>{' '}
            Everyone
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium">
            {m.community()}
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />

            <div className="flex flex-col">
              <p className="font-medium line-clamp-1">
                Dogs Community Dogs Community Dogs Community
              </p>

              <p className="text-xs text-secondary-foreground">2k Members</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />

            <div className="flex flex-col">
              <p className="font-medium line-clamp-1">
                Dogs Community Dogs Community Dogs Community
              </p>

              <p className="text-xs text-secondary-foreground">2k Members</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />

            <div className="flex flex-col">
              <p className="font-medium line-clamp-1">
                Dogs Community Dogs Community Dogs Community
              </p>

              <p className="text-xs text-secondary-foreground">2k Members</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
