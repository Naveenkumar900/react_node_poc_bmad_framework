import React from 'react'
import { User } from '../api/users'

export default function UserCard({
  user,
  onViewDetails,
}: {
  user: User
  onViewDetails?: () => void
}) {
  return (
    <article className="card">
      <h3>{user.name}</h3>
      <p className="muted">{user.email} • {user.address.city}</p>
      <div className="card-actions">
        <button type="button" className="primary" onClick={onViewDetails} aria-haspopup="dialog">
          View details
        </button>
      </div>
    </article>
  )
}
