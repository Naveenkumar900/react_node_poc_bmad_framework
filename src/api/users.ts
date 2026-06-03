export type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
}

export type Company = {
  name: string
  catchPhrase?: string
  bs?: string
}

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone?: string
  website?: string
  company?: Company
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}
