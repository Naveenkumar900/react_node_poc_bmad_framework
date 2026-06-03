import React from 'react'

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="controls">
      <label className="visually-hidden">Search users</label>
      <input
        aria-label="Search users"
        placeholder="Search by name, username or email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
