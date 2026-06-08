import { useState, useRef, useEffect } from 'react'

/**
 * On-brand custom dropdown that replaces a native <select>.
 * - SSR-safe: renders closed; all document/window access is inside effects.
 * - Netlify: renders a hidden <input name value> so the field is detectable
 *   and submitted (unless `suppressHidden`, used by the DOB part-dropdowns).
 * - Accessible: button + listbox roles, aria-activedescendant, keyboard nav.
 *
 * Props: { name, value, onChange(value), options:[{value,label}], placeholder,
 *          side='day', suppressHidden, id }
 */
export default function Dropdown({ name, value, onChange, options, placeholder = 'Select an option', side = 'day', suppressHidden = false, id, ariaLabel }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)
  const baseId = id || `dd-${name}`

  const selected = options.find((o) => o.value === value)

  // Close on outside click — only while open.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const openMenu = () => {
    const idx = options.findIndex((o) => o.value === value)
    setActiveIndex(idx >= 0 ? idx : 0)
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }
  const select = (v) => {
    onChange(v)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        openMenu()
      }
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % options.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + options.length) % options.length)
        break
      case 'Home':
        e.preventDefault(); setActiveIndex(0); break
      case 'End':
        e.preventDefault(); setActiveIndex(options.length - 1); break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (activeIndex >= 0) select(options[activeIndex].value)
        break
      case 'Escape':
        e.preventDefault(); close(); break
      case 'Tab':
        setOpen(false); break
      default:
        break
    }
  }

  return (
    <div className={`dn-dropdown ${side}`} data-open={open} ref={wrapRef}>
      {!suppressHidden && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        ref={triggerRef}
        className="dn-dropdown-trigger"
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-activedescendant={open && activeIndex >= 0 ? `${baseId}-opt-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? 'val' : 'placeholder'}>{selected ? selected.label : placeholder}</span>
        <span className="dn-dropdown-chev" aria-hidden="true" />
      </button>
      {open && (
        <ul className="dn-dropdown-list" role="listbox" tabIndex={-1}>
          {options.map((opt, i) => (
            <li
              key={opt.value}
              id={`${baseId}-opt-${i}`}
              role="option"
              aria-selected={opt.value === value}
              className={`dn-dropdown-option ${opt.value === value ? 'selected' : ''} ${i === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => select(opt.value)}
            >
              <span className="label">{opt.label}</span>
              {opt.value === value && <span className="check" aria-hidden="true">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
