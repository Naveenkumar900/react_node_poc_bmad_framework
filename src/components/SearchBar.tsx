import React from 'react'

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="controls">
      <label className="visually-hidden" htmlFor="search-users">
        Search users
      </label>
      <input
        id="search-users"
        aria-label="Search users"
        placeholder="Search by name, username or email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
