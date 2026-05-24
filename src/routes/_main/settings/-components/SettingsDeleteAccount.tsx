import { DialogBase } from '#/components/dialogs/DialogBase'
import { m } from '#/paraglide/messages'
import { AlertCircleIcon, ChevronRight, InfoIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Button } from '#/components/ui/button'

export const SettingsDeleteAccount = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="w-full gap-2 flex flex-col">
        <p className="text-secondary-foreground font-semibold uppercase text-md">
          {m.account_profile()}
        </p>

        <div className="w-full bg-white dark:bg-neutral-900 rounded-lg flex flex-col">
          <div
            className="w-full p-6 gap-4 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="gap-4 flex items-center">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950">
                <Trash2 className="size-6 text-red-400" />
              </div>

              <div className="flex flex-col">
                <p className="text-md font-semibold text-red-400">
                  {m.delete_account()}
                </p>

                <p className="text-secondary-foreground text-sm">
                  {m.delete_account_desc()}
                </p>
              </div>
            </div>

            <ChevronRight className="size-6 text-secondary-foreground" />
          </div>
        </div>
      </div>

      {open && (
        <DialogBase
          open={open}
          setOpen={setOpen}
          title={m.you_sure()}
          onPrimaryButtonHandle={() => {}}
          buttonText={m.delete_account()}
          primaryButtonClassName="bg-red-400 hover:bg-red-500"
        >
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{m.delete_account()}</AlertTitle>
            <AlertDescription>
              {m.delete_account_confirm_desc()}
            </AlertDescription>
          </Alert>
        </DialogBase>
      )}
    </>
  )
}
