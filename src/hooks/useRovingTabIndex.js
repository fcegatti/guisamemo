import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * Custom hook for implementing roving tabindex pattern
 * Supports both linear (1D) and grid (2D) navigation strategies
 *
 * @param {Object} config - Configuration object
 * @param {number} config.itemCount - Total number of items
 * @param {'linear'|'grid'} config.navigationStrategy - Navigation pattern
 * @param {number} [config.gridColumns] - Number of columns (required for grid strategy)
 * @param {number} [config.initialIndex=0] - Initial focused index
 * @param {function} [config.onActivate] - Callback when item is activated (Enter/Space)
 *
 * @returns {Object} Hook utilities
 */
export function useRovingTabIndex ({
  itemCount,
  navigationStrategy,
  gridColumns = null,
  initialIndex = 0,
  onActivate = null
}) {
  const [currentFocusIndex, setCurrentFocusIndex] = useState(initialIndex)
  const itemRefs = useRef([])

  // Initialize and cleanup refs array
  useEffect(() => {
    itemRefs.current = Array.from({ length: itemCount }, (_, i) => itemRefs.current[i] || null)
  }, [itemCount])

  // Calculate next index based on navigation strategy
  const calculateNextIndex = useCallback((currentIndex, direction) => {
    if (navigationStrategy === 'linear') {
      return calculateLinearNavigation(currentIndex, direction, itemCount)
    } else if (navigationStrategy === 'grid') {
      if (!gridColumns) {
        console.warn('[useRovingTabIndex] gridColumns required for grid navigation')
        return currentIndex
      }
      return calculateGridNavigation(currentIndex, direction, gridColumns, itemCount)
    }
    return currentIndex
  }, [navigationStrategy, gridColumns, itemCount])

  // Linear navigation (1D)
  const calculateLinearNavigation = (currentIndex, direction, totalItems) => {
    switch (direction) {
      case 'ArrowLeft':
      case 'ArrowUp':
        return currentIndex > 0 ? currentIndex - 1 : currentIndex // Stop at beginning
      case 'ArrowRight':
      case 'ArrowDown':
        return currentIndex < totalItems - 1 ? currentIndex + 1 : currentIndex // Stop at end
      default:
        return currentIndex
    }
  }

  // Grid navigation (2D)
  const calculateGridNavigation = (currentIndex, direction, columns, totalItems) => {
    const rows = Math.ceil(totalItems / columns)
    const currentRow = Math.floor(currentIndex / columns)
    const currentCol = currentIndex % columns

    // 🐛 DEBUG: Temporary logging
    if (import.meta.env.MODE === 'development') {
      console.log('Grid Navigation INPUT:', {
        currentIndex,
        direction,
        columns,
        totalItems,
        rows,
        currentRow,
        currentCol,
        gridLayout: `${rows} rows x ${columns} cols`
      })
    }

    let nextIndex = currentIndex

    switch (direction) {
      case 'ArrowLeft':
        if (currentCol > 0) {
          nextIndex = currentIndex - 1
        }
        break
      case 'ArrowRight':
        if (currentCol < columns - 1 && currentIndex < totalItems - 1) {
          nextIndex = currentIndex + 1
        }
        break
      case 'ArrowUp':
        if (currentRow > 0) {
          const targetIndex = currentIndex - columns
          // Ensure target exists (should always be true if currentRow > 0)
          if (targetIndex >= 0) {
            nextIndex = targetIndex
          }
        }
        break
      case 'ArrowDown':
        // Move down to same column in next row, stop at bottom or if target does not exist
        if (currentRow < rows - 1) {
          const targetIndex = currentIndex + columns
          // Ensure target exists (important for incomplete last row)
          if (targetIndex < totalItems) {
            nextIndex = targetIndex
          }
        }
        break

      default:
        // No movement for unknown keys
        break
    }

    // 🐛 DEBUG: Log result in development mode
    if (import.meta.env.MODE === 'development' && nextIndex !== currentIndex) {
      console.log('Grid Navigation RESULT:', {
        from: currentIndex,
        to: nextIndex,
        movement: direction,
        fromPosition: `row ${currentRow}, col ${currentCol}`,
        toPosition: `row ${Math.floor(nextIndex / columns)}, col ${nextIndex % columns}`
      })
    }
    return nextIndex
  }

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    const { key } = event

    // 🔍 DIAGNOSTIC: Log EVERY keyboard event received
    if (import.meta.env.MODE === 'development') {
      console.log('🔍 KEYBOARD EVENT:', {
        key,
        target: event.target.tagName,
        currentTarget: event.currentTarget.tagName,
        defaultPrevented: event.defaultPrevented,
        screenReaderMode: window.navigator.userAgent.includes('NVDA') || window.speechSynthesis,
        timestamp: Date.now()
      })
    }

    // Navigation keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      if (import.meta.env.MODE === 'development') {
        console.log('🎯 ARROW KEY DETECTED - About to preventDefault and navigate')
      }
      event.preventDefault()

      setCurrentFocusIndex((prevIndex) => {
        if (import.meta.env.MODE === 'development') {
          console.log('🔄 SET CURRENT FOCUS INDEX - Calculating next from:', prevIndex)
        }
        const nextIndex = calculateNextIndex(prevIndex, key)

        if (import.meta.env.MODE === 'development') {
          console.log('🎯 CALCULATED NEXT INDEX:', { from: prevIndex, to: nextIndex, key })
        }

        if (nextIndex !== prevIndex) {
          if (import.meta.env.MODE === 'development') {
            console.log('🎯 FOCUS WILL CHANGE - Setting timeout for DOM focus')
          }
          // Focus the new element after state update
          setTimeout(() => {
            const nextElement = itemRefs.current[nextIndex]
            if (import.meta.env.MODE === 'development') {
              console.log('🎯 ATTEMPTING DOM FOCUS:', {
                nextIndex,
                element: nextElement,
                elementTag: nextElement?.tagName,
                elementExists: !!nextElement
              })
            }
            if (nextElement) {
              nextElement.focus()
              if (import.meta.env.MODE === 'development') {
                console.log('✅ DOM FOCUS APPLIED')
              }
            } else {
              if (import.meta.env.MODE === 'development') {
                console.log('❌ DOM FOCUS FAILED - Element not found')
              }
            }
          }, 0)
        } else {
          if (import.meta.env.MODE === 'development') {
            console.log('🎯 NO MOVEMENT - Staying at same index')
          }
        }

        return nextIndex
      })
      return
    }

    // Activation keys
    if ((key === 'Enter' || key === ' ') && onActivate) {
      if (import.meta.env.MODE === 'development') {
        console.log('🎯 ACTIVATION KEY DETECTED:', key)
      }
      event.preventDefault()
      onActivate(currentFocusIndex)
      return
    }

    if (import.meta.env.MODE === 'development') {
      console.log('🚫 KEY IGNORED:', key)
    }
  }, [currentFocusIndex, calculateNextIndex, onActivate])

  // Get tabindex value for an item
  const getTabIndex = useCallback((index) => {
    return index === currentFocusIndex ? 0 : -1
  }, [currentFocusIndex])

  // Get ref for an item (to be used in ref={getItemRef(index)})
  const getItemRef = useCallback((index) => {
    return (element) => {
      if (itemRefs.current[index] !== element) {
        // Update the ref only if it has changed
        itemRefs.current[index] = element
      }
    }
  }, [])

  // Programmatically set focus to specific index
  const setFocusIndex = useCallback((index) => {
    if (index >= 0 && index < itemCount) {
      setCurrentFocusIndex(index)
      const element = itemRefs.current[index]
      if (element) {
        element.focus()
      }
    }
  }, [itemCount])

  return {
    currentFocusIndex,
    getTabIndex,
    getItemRef,
    handleKeyDown,
    setFocusIndex
  }
}
