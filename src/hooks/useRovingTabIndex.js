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
export function useRovingTabIndex({
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
    } else     if (navigationStrategy === 'grid') {
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

    switch (direction) {
      case 'ArrowLeft':
        return currentCol > 0 ? currentIndex - 1 : currentIndex // Stop at row beginning
      case 'ArrowRight':
        return currentCol < columns - 1 && currentIndex < totalItems - 1 
          ? currentIndex + 1 
          : currentIndex // Stop at row end or last item
      case 'ArrowUp':
        return currentRow > 0 ? currentIndex - columns : currentIndex // Stop at top
      case 'ArrowDown':
        const nextRowIndex = currentIndex + columns
        return nextRowIndex < totalItems ? nextRowIndex : currentIndex // Stop at bottom
      default:
        return currentIndex
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    const { key } = event
    
    // Navigation keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault()
      const nextIndex = calculateNextIndex(currentFocusIndex, key)
      
      if (nextIndex !== currentFocusIndex) {
        setCurrentFocusIndex(nextIndex)
        // Focus the new element
        const nextElement = itemRefs.current[nextIndex]
        if (nextElement) {
          nextElement.focus()
        }
      }
      return
    }

    // Activation keys
    if ((key === 'Enter' || key === ' ') && onActivate) {
      event.preventDefault()
      onActivate(currentFocusIndex)
      return
    }
  }, [currentFocusIndex, calculateNextIndex, onActivate])

  // Get tabindex value for an item
  const getTabIndex = useCallback((index) => {
    return index === currentFocusIndex ? 0 : -1
  }, [currentFocusIndex])

  // Get ref for an item (to be used in ref={getItemRef(index)})
  const getItemRef = useCallback((index) => {
    return (element) => {
      itemRefs.current[index] = element
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
