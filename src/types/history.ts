import type { LiveSession } from "./live-session"

export interface HistoryListParams {
  page: number
  limit: number
  search: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedLiveSessions {
  data: LiveSession[]
  meta: PaginationMeta
}
