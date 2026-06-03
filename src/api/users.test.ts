import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchUsers, type User } from './users'

describe('fetchUsers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches users from JSONPlaceholder and returns parsed JSON', async () => {
    const mockedResponse = [
      {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        address: { street: '1 Test St', suite: 'Apt 1', city: 'Test City', zipcode: '12345' },
        phone: '555-1234',
        website: 'example.com',
        company: { name: 'Example Co' },
      },
    ] satisfies User[]

    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockedResponse),
      }) as any,
    )

    vi.stubGlobal('fetch', fetchMock)

    const users = await fetchUsers()

    expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')
    expect(users).toEqual(mockedResponse)
  })

  it('throws when the network response is not ok', async () => {
    const fetchMock = vi.fn(() => Promise.resolve({ ok: false }) as any)
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchUsers()).rejects.toThrow('Failed to fetch users')
  })
})
