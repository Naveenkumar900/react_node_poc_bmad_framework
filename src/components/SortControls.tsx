import React from 'react'

type SortField = 'name' | 'city'
type SortDirection = 'asc' | 'desc'

type Props = {
  field: SortField
  direction: SortDirection
  onFieldChange: (field: SortField) => void
  onDirectionToggle: () => void
}

export default function SortControls({ field, direction, onFieldChange, onDirectionToggle }: Props) {
  return (
    <div className="sort-controls">
      <label>
        Sort by
        <select
          className="sort-select"
          value={field}
          onChange={(event) => onFieldChange(event.target.value as SortField)}
        >
          <option value="name">Name</option>
          <option value="city">City</option>
        </select>
      </label>
      <button type="button" className="primary sort-direction" onClick={onDirectionToggle}>
        {direction === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  )
}
