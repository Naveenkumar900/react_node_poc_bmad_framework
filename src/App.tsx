import React, { useEffect, useRef, useState } from 'react'
import { User, fetchUsers } from './api/users'
import { paginateUsers, sortUsers, userMatchesSearch } from './App.helpers'
import SearchBar from './components/SearchBar'
import SortControls from './components/SortControls'
import PaginationControls from './components/PaginationControls'
import UserDetailModal from './components/UserDetailModal'
import UserCard from './components/UserCard'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState('')
  const [sortField, setSortField] = useState<'name' | 'city'>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const previousFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    async function loadUsers() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchUsers()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const filteredUsers = users.filter((user) => userMatchesSearch(user, query))
  const sortedUsers = sortUsers(filteredUsers, sortField, sortDirection)
  const [page, setPage] = useState(1)
  const pageSize = 5
  const pageCount = Math.max(1, Math.ceil(sortedUsers.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageUsers = paginateUsers(sortedUsers, currentPage, pageSize)

  useEffect(() => {
    setPage(1)
  }, [query, sortField, sortDirection])

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage)
    }
  }, [currentPage, page])

  const openUserDetail = (user: User) => {
    previousFocusedElement.current = document.activeElement as HTMLElement | null
    setSelectedUser(user)
  }

  const closeUserDetail = () => {
    setSelectedUser(null)
    previousFocusedElement.current?.focus()
  }

  return (
    <div className="container">
      <header>
        <h1>React User Dashboard</h1>
      </header>
      <main>
        <div className="controls">
          <SearchBar value={query} onChange={setQuery} />
          <SortControls
            field={sortField}
            direction={sortDirection}
            onFieldChange={setSortField}
            onDirectionToggle={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          />
        </div>
        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}
        {loading ? (
          <p className="status-message" role="status" aria-live="polite">
            Loading users...
          </p>
        ) : (
          <>
            <section className="user-grid">
              {sortedUsers.length === 0 ? (
                <p className="empty-state">No users found.</p>
              ) : (
                pageUsers.map((u) => (
                  <UserCard key={u.id} user={u} onViewDetails={() => openUserDetail(u)} />
                ))
              )}
            </section>
            <PaginationControls
              currentPage={currentPage}
              totalPages={pageCount}
              onPageChange={setPage}
            />
            <UserDetailModal user={selectedUser} onClose={closeUserDetail} />
          </>
        )}
      </main>
    </div>
  )
}
