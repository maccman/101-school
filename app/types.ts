export interface SearchResult {
  type: 'course' | 'unit'
  id: string
  title: string
  path: string
  icon?: string
  image?: string
}
