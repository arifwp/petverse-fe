import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import type { Dispatch, Key, ReactNode, SetStateAction } from 'react'

export interface DialogBasePaginationSearch {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export interface DialogBasePaginationProps<TItem> {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string
  description?: string

  items: ReadonlyArray<TItem>
  getItemKey: (item: TItem) => Key
  renderItem: (item: TItem, index: number) => ReactNode

  page: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void

  search?: DialogBasePaginationSearch
  emptyState?: ReactNode

  loading?: boolean
  loadingState?: ReactNode

  className?: string
  listClassName?: string
}

const DefaultLoadingSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="py-3 flex items-center gap-3">
        <div className="size-10 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <div className="flex-1 gap-2 flex flex-col">
          <div className="h-3 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        </div>
        <div className="h-8 w-20 rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      </div>
    ))}
  </div>
)

export const DialogBasePagination = <TItem,>({
  open,
  setOpen,
  title,
  description,
  items,
  getItemKey,
  renderItem,
  page,
  pageSize,
  totalItems,
  onPageChange,
  search,
  emptyState,
  loading = false,
  loadingState,
  className,
  listClassName,
}: DialogBasePaginationProps<TItem>) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1
  const end = Math.min(safePage * pageSize, totalItems)

  const canPrev = !loading && safePage > 1
  const canNext = !loading && safePage < totalPages
  const isEmpty = !loading && items.length === 0
  const showSkeleton = loading && items.length === 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('gap-4', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {search && (
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              placeholder={search.placeholder ?? m.search()}
            />
          </InputGroup>
        )}

        <div
          className={cn(
            'flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 transition-opacity',
            loading && items.length > 0 && 'opacity-60 pointer-events-none',
            listClassName,
          )}
          aria-busy={loading}
        >
          {showSkeleton
            ? (loadingState ?? <DefaultLoadingSkeleton rows={pageSize} />)
            : isEmpty
              ? (emptyState ?? (
                  <p className="py-8 text-center text-sm text-secondary-foreground">
                    {m.no_results()}
                  </p>
                ))
              : items.map((item, index) => (
                  <div key={getItemKey(item)}>{renderItem(item, index)}</div>
                ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-secondary-foreground font-medium">
            {m.pagination_range({
              start: String(start),
              end: String(end),
              total: String(totalItems),
            })}
          </p>

          <div className="gap-2 flex items-center">
            <Button
              size="icon-sm"
              variant="outline"
              disabled={!canPrev}
              onClick={() => onPageChange(safePage - 1)}
              aria-label={m.previous_page()}
            >
              <ChevronLeft />
            </Button>

            <p className="text-sm font-medium">
              {m.pagination_page({
                page: String(safePage),
                total: String(totalPages),
              })}
            </p>

            <Button
              size="icon-sm"
              variant="outline"
              disabled={!canNext}
              onClick={() => onPageChange(safePage + 1)}
              aria-label={m.next_page()}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
