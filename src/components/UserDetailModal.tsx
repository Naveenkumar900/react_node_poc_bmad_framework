import React, { useEffect, useRef } from 'react'
import { User } from '../api/users'

export default function UserDetailModal({ user, onClose }: { user: User | null; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!user) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const getFocusableElements = () => {
      if (!modalRef.current) return [] as HTMLElement[]
      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'))
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusableElements()
      if (!focusable.length) return

      const activeElement = document.activeElement as HTMLElement
      const currentIndex = focusable.indexOf(activeElement)

      if (event.shiftKey) {
        if (currentIndex <= 0) {
          event.preventDefault()
          focusable[focusable.length - 1].focus()
        }
      } else {
        if (currentIndex === focusable.length - 1 || currentIndex === -1) {
          event.preventDefault()
          focusable[0].focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [user, onClose])

  if (!user) return null

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-detail-title"
      aria-describedby="user-detail-description"
      onClick={handleOverlayClick}
    >
      <div className="modal" ref={modalRef}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close user details"
          ref={closeButtonRef}
        >
          ×
        </button>
        <h2 id="user-detail-title">{user.name}</h2>
        <div id="user-detail-description" className="modal-body">
          <p>{user.email}</p>
          <p className="muted">{user.username} · {user.address.city}</p>
          <div className="modal-meta">
            <p><strong>Phone:</strong> {user.phone ?? 'N/A'}</p>
            <p><strong>Website:</strong> {user.website ?? 'N/A'}</p>
            <p><strong>Company:</strong> {user.company?.name ?? 'N/A'}</p>
          </div>
          <pre className="muted">{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
