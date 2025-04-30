import { useEffect } from 'react'

/**
 * Focus trap for modal dialogs.
 * Locks Tab navigation inside the given modalRef.
 */
export function useFocusTrap (modalRef) {
  useEffect(() => {
    const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const modalNode = modalRef.current
    if (!modalNode) return

    const focusableElements = modalNode.querySelectorAll(selectors)
    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    function handleKeyDown (e) {
      if (e.key !== 'Tab') return

      if (focusableElements.length === 0) return

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalRef])
}
