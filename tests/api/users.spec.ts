import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchUsers } from '../../src/api/users'

describe('fetchUsers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns parsed user data when the request succeeds', async () => {
    const mockUsers = [
      { id: 1, name: 'Jane Doe', username: 'jdoe', email: 'jane@example.com', address: { street: '123 Main St', suite: 'Apt 1', city: 'Springfield', zipcode: '12345' } },
    ]

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    }))

    const result = await fetchUsers()
    expect(result).toEqual(mockUsers)
  })

  it('throws an error when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server error' }),
    }))

    await expect(fetchUsers()).rejects.toThrow('Failed to fetch users')
  })
})
