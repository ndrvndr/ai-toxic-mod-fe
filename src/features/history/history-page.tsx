import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"

import { useDebounce } from "@/hooks/use-debounce"

import { SessionList } from "./components/session-list"
import { useHistoryList } from "./hooks/use-history-list"

const PAGE_SIZE = 10

export function HistoryPage() {
  const [{ page, search }, setHistoryParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
  })
  const debouncedSearch = useDebounce(search)
  const { sessions, meta, isLoading, isFetching } = useHistoryList({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch,
  })

  const handleSearchChange = (value: string) => {
    void setHistoryParams({ search: value, page: 1 })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">History</h1>
      <SessionList
        sessions={sessions}
        meta={meta}
        search={search}
        onSearchChange={handleSearchChange}
        onPageChange={(nextPage) => {
          void setHistoryParams({ page: nextPage })
        }}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </div>
  )
}
