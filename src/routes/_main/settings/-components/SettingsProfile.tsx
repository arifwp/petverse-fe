import { DialogBase } from '#/components/dialogs/DialogBase'
import { Button } from '#/components/ui/button'
import { m } from '#/paraglide/messages'
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { AtSign, Camera, ChevronRight, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'

export const SettingsProfile = () => {
  const [openPicture, setOpenPicture] = useState<boolean>(false)

  return (
    <>
      {/* PROFILE */}
      <div className="w-full bg-white dark:bg-neutral-900 rounded-lg flex flex-col">
        <div className="w-full px-6 py-8 gap-4 flex items-center border-b border-b-neutral-200 dark:border-b-neutral-800">
          <Avatar
            className="size-16 sm:size-20 md:size-24 lg:size-28 aspect-square cursor-pointer"
            onClick={() => setOpenPicture((prev) => !prev)}
          >
            <AvatarImage src="https://github.com/arifwp.png" alt="@arifwp" />
            <AvatarFallback>AW</AvatarFallback>
            <AvatarBadge className="group-data-[size=default]/avatar:size-6 sm:group-data-[size=default]/avatar:size-7 md:group-data-[size=default]/avatar:size-8 lg:group-data-[size=default]/avatar:size-9 group-data-[size=default]/avatar:[&>svg]:size-3 sm:group-data-[size=default]/avatar:[&>svg]:size-3.5 md:group-data-[size=default]/avatar:[&>svg]:size-4 lg:group-data-[size=default]/avatar:[&>svg]:size-4 ring-2 sm:ring-4 ring-white dark:ring-neutral-900 bg-primary text-primary-foreground ">
              <Camera className="text-white" />
            </AvatarBadge>
          </Avatar>

          <div className="gap-0 flex flex-col">
            <h1 className="text-lg font-bold">Arif Wahyu Prasetyo</h1>

            <h2 className="text-sm text-secondary-foreground lg:text-sm font-medium">
              @arifwahyu
            </h2>
          </div>
        </div>

        {/* Name */}
        <div className="w-full p-6 gap-4 flex items-center justify-between border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <User className="size-6 text-secondary-foreground" />
            </div>

            <p className="text-md font-semibold">{m.name()}</p>
          </div>

          <div className="gap-2 flex items-center">
            <p className="text-md text-secondary-foreground font-medium">
              Arif Wahyu Prasetyo
            </p>

            <ChevronRight className="size-6 text-secondary-foreground" />
          </div>
        </div>

        {/* Username */}
        <div className="w-full p-6 gap-4 flex items-center justify-between border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <AtSign className="size-6 text-secondary-foreground" />
            </div>

            <p className="text-md font-semibold">Username</p>
          </div>

          <div className="gap-2 flex items-center">
            <p className="text-md text-secondary-foreground font-medium">
              arifwahyu
            </p>

            <ChevronRight className="size-6 text-secondary-foreground" />
          </div>
        </div>

        {/* Email */}
        <div className="w-full p-6 gap-4 flex items-center justify-between border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <Mail className="size-6 text-secondary-foreground" />
            </div>

            <p className="text-md font-semibold">Email</p>
          </div>

          <div className="gap-2 flex items-center">
            <p className="text-md text-secondary-foreground font-medium">
              arif.wpras@gmail.com
            </p>

            <ChevronRight className="size-6 text-secondary-foreground" />
          </div>
        </div>

        {/* Change Password */}
        <div className="w-full p-6 gap-4 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
          <div className="gap-4 flex items-center">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950">
              <Lock className="size-6 text-secondary-foreground" />
            </div>

            <p className="text-md font-semibold">{m.change_password()}</p>
          </div>

          <div className="gap-2 flex items-center">
            <ChevronRight className="size-6 text-secondary-foreground" />
          </div>
        </div>
      </div>

      {openPicture && (
        <DialogBase
          open={openPicture}
          setOpen={setOpenPicture}
          title={m.update_profile_photo()}
          description={m.update_profile_photo_desc()}
          onPrimaryButtonHandle={() => {}}
          className="gap-6 items-center"
        >
          <Avatar
            className="size-16 sm:size-20 md:size-24 lg:size-28 aspect-square cursor-pointer"
            onClick={() => setOpenPicture((prev) => !prev)}
          >
            <AvatarImage src="https://github.com/arifwp.png" alt="@arifwp" />
            <AvatarFallback>AW</AvatarFallback>
            <AvatarBadge className="group-data-[size=default]/avatar:size-6 sm:group-data-[size=default]/avatar:size-7 md:group-data-[size=default]/avatar:size-8 lg:group-data-[size=default]/avatar:size-9 group-data-[size=default]/avatar:[&>svg]:size-3 sm:group-data-[size=default]/avatar:[&>svg]:size-3.5 md:group-data-[size=default]/avatar:[&>svg]:size-4 lg:group-data-[size=default]/avatar:[&>svg]:size-4 ring-2 sm:ring-4 ring-white dark:ring-neutral-900 bg-primary text-primary-foreground ">
              <Camera className="text-white" />
            </AvatarBadge>
          </Avatar>

          <div className="w-full gap-2 flex flex-col">
            <Button className="w-full" variant={'secondary'}>
              {m.upload_from_gallery()}
            </Button>

            <Button className="w-full" variant={'destructive'}>
              {m.remove_current_image()}
            </Button>
          </div>
        </DialogBase>
      )}
    </>
  )
}
