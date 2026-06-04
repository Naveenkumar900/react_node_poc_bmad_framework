import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../src/App'

const sampleUsers = [
  {
    id: 1,
    name: 'Aaron Clark',
    username: 'aaron',
    email: 'aaron@example.com',
    address: { street: '1 Oak St', suite: 'Suite 1', city: 'Austin', zipcode: '73301' },
    phone: '555-0001',
    website: 'aaron.example.com',
    company: { name: 'Oak Ventures' },
  },
  {
    id: 2,
    name: 'Beth Harris',
    username: 'beth',
    email: 'beth@example.com',
    address: { street: '3 Elm St', suite: 'Suite 3', city: 'Seattle', zipcode: '98101' },
    phone: '555-0002',
    website: 'beth.example.com',
    company: { name: 'Elm Studio' },
  },
  {
    id: 3,
    name: 'Cara Lee',
    username: 'clee',
    email: 'cara@example.com',
    address: { street: '4 Pine St', suite: 'Suite 4', city: 'Boston', zipcode: '02101' },
    phone: '555-0003',
    website: 'cara.example.com',
    company: { name: 'Pine Labs' },
  },
  {
    id: 4,
    name: 'Derek Stone',
    username: 'dstone',
    email: 'derek@example.com',
    address: { street: '5 Birch St', suite: 'Suite 5', city: 'Denver', zipcode: '80201' },
    phone: '555-0004',
    website: 'derek.example.com',
    company: { name: 'Birch Co.' },
  },
  {
    id: 5,
    name: 'Eve Torres',
    username: 'evet',
    email: 'eve@example.com',
    address: { street: '6 Cedar St', suite: 'Suite 6', city: 'Miami', zipcode: '33101' },
    phone: '555-0005',
    website: 'eve.example.com',
    company: { name: 'Cedar Works' },
  },
  {
    id: 6,
    name: 'Frank Vega',
    username: 'fvega',
    email: 'frank@example.com',
    address: { street: '7 Spruce St', suite: 'Suite 7', city: 'Portland', zipcode: '97201' },
    phone: '555-0006',
    website: 'frank.example.com',
    company: { name: 'Spruce Labs' },
  },
  {
    id: 7,
    name: 'Gina Wallace',
    username: 'gwallace',
    email: 'gina@example.com',
    address: { street: '8 Maple St', suite: 'Suite 8', city: 'Chicago', zipcode: '60601' },
    phone: '555-0007',
    website: 'gina.example.com',
    company: { name: 'Maple Systems' },
  },
]

describe('React User Dashboard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads users, filters by search, paginates, and opens the detail modal', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => sampleUsers,
    }))

    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading users...')

    await screen.findByText('Aaron Clark')
    expect(screen.queryByText('Loading users...')).toBeNull()

    const sortButton = screen.getByRole('button', { name: /ascending/i })
    await user.click(sortButton)
    expect(sortButton).toHaveTextContent('Descending')

    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)
    await waitFor(() => {
      expect(screen.getByText('Beth Harris')).toBeTruthy()
    })

    const pageTwoCard = screen.getByText('Beth Harris').closest('article')
    expect(pageTwoCard).toBeTruthy()

    const searchInput = screen.getByRole('textbox', { name: /search users/i })
    await user.clear(searchInput)
    await user.type(searchInput, 'Gina')

    expect(screen.getByText('Gina Wallace')).toBeTruthy()
    expect(screen.queryByText('Aaron Clark')).toBeNull()
    expect(screen.queryByRole('navigation')).toBeNull()

    const card = screen.getByText('Gina Wallace').closest('article')
    expect(card).toBeTruthy()
    const viewButton = within(card as HTMLElement).getByRole('button', { name: /view details/i })
    await user.click(viewButton)

    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByText('gina@example.com')).toBeTruthy()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
