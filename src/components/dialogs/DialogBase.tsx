import { m } from '#/paraglide/messages'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import type { Dispatch, SetStateAction } from 'react'
import { cn } from '#/lib/utils'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string
  description?: string
  onPrimaryButtonHandle?: VoidFunction
  buttonText?: string
  children: React.ReactNode
  className?: string
  footerClassName?: string
  primaryButtonClassName?: string
}

export const DialogBase = ({
  open,
  setOpen,
  title,
  description,
  onPrimaryButtonHandle,
  buttonText = m.save_changes(),
  children,
  className,
  footerClassName,
  primaryButtonClassName,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <div className={cn('gap-4 flex flex-col', className)}>{children}</div>

          <DialogFooter className={cn(footerClassName)}>
            <DialogClose asChild>
              <Button variant="outline">{m.close()}</Button>
            </DialogClose>

            {onPrimaryButtonHandle && (
              <Button
                onClick={onPrimaryButtonHandle}
                className={cn('text-white', primaryButtonClassName)}
              >
                {buttonText}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
