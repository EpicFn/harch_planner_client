// CheckIcon.jsx
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import React from 'react'

const CheckIcon = React.memo(
  ({ loading, isDuplicate, deferredBookName, bookName }) => {
    if (
      !loading &&
      deferredBookName.trim() &&
      deferredBookName === bookName &&
      !isDuplicate
    ) {
      return (
        <CheckCircleOutlineIcon
          style={{
            position: 'absolute',
            right: '30px',
            top: '50px',
            color: 'green',
            fontSize: '25px',
            opacity: !loading && !isDuplicate && bookName.trim() ? 1 : 0,
            visibility:
              !loading && !isDuplicate && bookName.trim()
                ? 'visible'
                : 'hidden', // DOM 유지 여부
            transition: 'opacity 1s ease-in-out, visibility 1s ease-in-out',
          }}
        />
      )
    }
    return null
  },
)

export default CheckIcon
