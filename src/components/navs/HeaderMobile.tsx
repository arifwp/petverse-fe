import { LOGO_URL } from '#/constants/url'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { headerMenus } from './Header'
import { HeaderProfileMenu } from './HeaderProfileMenu'
import { Separator } from '../ui/separator'

export const HeaderMobile = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div
        className="md:hidden p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Menu className="size-6" />
      </div>

      {open && (
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="gap-2 flex flex-row items-center">
              <img
                src={LOGO_URL}
                alt={import.meta.env.VITE_APP_NAME + ' Logo'}
                className="w-12 h-12 aspect-square object-contain"
              />

              <DrawerTitle className="text-lg font-bold">
                {import.meta.env.VITE_APP_NAME}
              </DrawerTitle>
            </DrawerHeader>

            <div className="no-scrollbar overflow-y-auto px-4 flex flex-col">
              {headerMenus.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="p-2 text-sm font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <DrawerFooter>
              <Separator />

              <HeaderProfileMenu />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
