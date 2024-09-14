import { useEffect, useState } from 'react'

export default function useContextMenu() {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventId: null,
  })

  const openContextMenu = (x, y, eventId) => {
    setContextMenu({
      visible: true,
      x,
      y,
      eventId,
    })
  }

  const closeContextMenu = () => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0,
      eventId: null,
    })
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu.visible) {
        closeContextMenu() // 메뉴를 닫는 로직
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu.visible])

  return {
    contextMenu,
    openContextMenu,
    closeContextMenu,
    setContextMenu,
  }
}
