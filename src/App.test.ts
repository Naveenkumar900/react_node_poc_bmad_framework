import { describe, expect, it } from 'vitest'
import { paginateUsers, sortUsers, userMatchesSearch } from './App.helpers'
import type { User } from './api/users'

const sampleUser: User = {
  id: 1,
  name: 'Jane Doe',
  username: 'jdoe',
  email: 'jane@example.com',
  address: { street: '123 Main St', suite: 'Apt 1', city: 'Springfield', zipcode: '12345' },
}

describe('userMatchesSearch', () => {
  it('returns true when the query is empty', () => {
    expect(userMatchesSearch(sampleUser, '')).toBe(true)
  })

  it('matches by name case-insensitively', () => {
    expect(userMatchesSearch(sampleUser, 'jane')).toBe(true)
    expect(userMatchesSearch(sampleUser, 'DOE')).toBe(true)
  })

  it('matches by username and email', () => {
    expect(userMatchesSearch(sampleUser, 'jdoe')).toBe(true)
    expect(userMatchesSearch(sampleUser, 'example.com')).toBe(true)
  })

  it('returns false when there is no match', () => {
    expect(userMatchesSearch(sampleUser, 'notfound')).toBe(false)
  })
})

describe('sortUsers', () => {
  const users: User[] = [
    {
      id: 1,
      name: 'Beth Harris',
      username: 'beth',
      email: 'beth@example.com',
      address: { street: '3 Elm St', suite: 'Suite 3', city: 'Seattle', zipcode: '98101' },
    },
    {
      id: 2,
      name: 'Aaron Clark',
      username: 'aaron',
      email: 'aaron@example.com',
      address: { street: '1 Oak St', suite: 'Suite 1', city: 'Austin', zipcode: '73301' },
    },
  ]

  it('sorts by name ascending', () => {
    expect(sortUsers(users, 'name', 'asc').map((user) => user.name)).toEqual(['Aaron Clark', 'Beth Harris'])
  })

  it('sorts by name descending', () => {
    expect(sortUsers(users, 'name', 'desc').map((user) => user.name)).toEqual(['Beth Harris', 'Aaron Clark'])
  })

  it('sorts by city ascending', () => {
    expect(sortUsers(users, 'city', 'asc').map((user) => user.address.city)).toEqual(['Austin', 'Seattle'])
  })

  it('sorts by city descending', () => {
    expect(sortUsers(users, 'city', 'desc').map((user) => user.address.city)).toEqual(['Seattle', 'Austin'])
  })
})

describe('paginateUsers', () => {
  const users: User[] = Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    username: `user${index + 1}`,
    email: `user${index + 1}@example.com`,
    address: { street: 'Street', suite: 'Suite', city: 'City', zipcode: '00000' },
  }))

  it('returns the first page of results', () => {
    expect(paginateUsers(users, 1, 5).map((user) => user.id)).toEqual([1, 2, 3, 4, 5])
  })

  it('returns the second page of results', () => {
    expect(paginateUsers(users, 2, 5).map((user) => user.id)).toEqual([6, 7])
  })

  it('returns an empty array when the page is out of range', () => {
    expect(paginateUsers(users, 3, 5)).toEqual([])
  })
})
