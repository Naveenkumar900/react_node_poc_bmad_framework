import type { User } from './api/users'

export function userMatchesSearch(user: User, query: string) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return true
  return [user.name, user.username, user.email]
    .join(' ')
    .toLowerCase()
    .includes(normalizedQuery)
}

export function sortUsers(users: User[], field: 'name' | 'city', direction: 'asc' | 'desc') {
  return [...users].sort((a, b) => {
    const valueA = field === 'name' ? a.name : a.address.city
    const valueB = field === 'name' ? b.name : b.address.city
    const comparison = valueA.localeCompare(valueB, undefined, { sensitivity: 'base' })
    return direction === 'asc' ? comparison : -comparison
  })
}

export function paginateUsers(users: User[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  return users.slice(start, start + pageSize)
}
