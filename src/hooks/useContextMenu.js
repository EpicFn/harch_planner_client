import { useEffect, useState } from 'react'

export default function useContextMenu() {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventId: null,
  })

  const openContextMenu = (event, eventId) => {
    event.preventDefault()
    const rect = event.target.getBoundingClientRect() // 우클릭한 이벤트 요소의 위치를 기준으로 좌표 설정

    setContextMenu({
      visible: true,
      x: rect.right - 30,
      y: rect.bottom - 10,
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
