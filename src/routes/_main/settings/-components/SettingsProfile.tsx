import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Camera } from 'lucide-react'

export const SettingsProfile = () => {
  return (
    <div className="w-full px-6 py-10 gap-4 bg-white dark:bg-neutral-900 rounded-xl flex flex-col">
      <div className="w-full gap-4 flex items-center">
        <Avatar className="size-16 sm:size-20 md:size-24 lg:size-28 aspect-square">
          <AvatarImage
            src="https://github.com/pranathip.png"
            alt="@pranathip"
          />
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge className="group-data-[size=default]/avatar:size-6 sm:group-data-[size=default]/avatar:size-7 md:group-data-[size=default]/avatar:size-8 lg:group-data-[size=default]/avatar:size-9 group-data-[size=default]/avatar:[&>svg]:size-3 sm:group-data-[size=default]/avatar:[&>svg]:size-3.5 md:group-data-[size=default]/avatar:[&>svg]:size-4 lg:group-data-[size=default]/avatar:[&>svg]:size-4 ring-2 sm:ring-4 ring-white dark:ring-neutral-900 bg-primary text-primary-foreground">
            <Camera className="text-white" />
          </AvatarBadge>
        </Avatar>

        <div className="gap-0 flex flex-col">
          <h1 className="text-lg font-bold">Arif Wahyu Prasetyo</h1>

          <h2 className="text-xs lg:text-sm font-medium">@arifwahyu</h2>
        </div>
      </div>
    </div>
  )
}
