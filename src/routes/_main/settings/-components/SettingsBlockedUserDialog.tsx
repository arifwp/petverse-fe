import { DialogBasePagination } from '#/components/dialogs/DialogBasePagination'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import { useDebouncedValue } from '#/lib/string'
import { m } from '#/paraglide/messages'
import type { BlockedUser } from '#/utils/blockedUsers/blockedUsers'
import {
  useBlockedUsersQuery,
  useUnblockUserMutation,
} from '#/utils/blockedUsers/blockedUsers.queries'
import moment from 'moment'
import { useEffect, useState } from 'react'

const AVATAR_COLORS = [
  'bg-orange-400 text-white',
  'bg-blue-400 text-white',
  'bg-green-400 text-white',
  'bg-pink-400 text-white',
  'bg-purple-400 text-white',
  'bg-amber-400 text-white',
  'bg-teal-400 text-white',
  'bg-rose-400 text-white',
]

const colorForId = (id: string) => {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

const PAGE_SIZE = 6

export const SettingsBlockedUserDialog = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 300)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const { data, isFetching } = useBlockedUsersQuery(
    { search: debouncedSearch, page, pageSize: PAGE_SIZE },
    { enabled: open },
  )

  const unblockMutation = useUnblockUserMutation()

  const items = data?.items ?? []
  const total = data?.total ?? 0

  return (
    <DialogBasePagination<BlockedUser>
      open={open}
      setOpen={setOpen}
      title={m.blocked_users()}
      description={m.blocked_users_desc({ count: String(total) })}
      items={items}
      getItemKey={(u) => u.id}
      page={page}
      pageSize={PAGE_SIZE}
      totalItems={total}
      onPageChange={setPage}
      loading={isFetching}
      search={{
        value: search,
        onChange: setSearch,
        placeholder: m.search_blocked_users(),
      }}
      renderItem={(user) => (
        <div className="py-3 flex items-center justify-between gap-3">
          <div className="gap-3 flex items-center min-w-0">
            <Avatar className="size-10">
              <AvatarFallback className={colorForId(user.id)}>
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="gap-0 flex flex-col min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-secondary-foreground truncate">
                @{user.username} ·{' '}
                {m.blocked_on({
                  date: moment(user.blockedAt).format('MMM YYYY'),
                })}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={
              unblockMutation.isPending && unblockMutation.variables === user.id
            }
            onClick={() => unblockMutation.mutate(user.id)}
          >
            {m.unblock()}
          </Button>
        </div>
      )}
    />
  )
}
