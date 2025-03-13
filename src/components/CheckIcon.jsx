// CheckIcon.jsx
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import React, { useEffect, useState } from 'react'

const CheckIcon = React.memo(({ deferredBookName, isDuplicate }) => {
  const [iconVisible, setIconVisible] = useState(false)

  useEffect(() => {
    // 중복되지 않은 상태에서만 아이콘 표시
    setIconVisible(deferredBookName.trim() && !isDuplicate)
  }, [deferredBookName, isDuplicate])

  return iconVisible ? (
    <CheckCircleOutlineIcon
      style={{
        position: 'absolute',
        right: '30px',
        top: '50px',
        color: 'green',
        fontSize: '25px',
        visibility: 'visible',
        transition: 'opacity 1s ease-in-out, visibility 1s ease-in-out',
      }}
    />
  ) : null
})

export default CheckIcon
