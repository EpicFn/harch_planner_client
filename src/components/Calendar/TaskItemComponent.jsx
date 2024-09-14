import { TaskItem } from '@components/Calendar/Calendar.style'
import { useState } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  font-size: 16px;
  color: #666;
  background-color: #e5e5ec;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  text-align: center;
  outline: none;
  height: 40px;
  box-sizing: border-box;
`

export default function TaskItemComponent({
  weekKey,
  task,
  index,
  updateWeekTask,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(task)

  const handleSave = () => {
    updateWeekTask(weekKey, index, inputValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    }
  }

  return isEditing ? (
    <StyledInput
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleSave}
      autoFocus
    />
  ) : (
    <TaskItem onClick={() => setIsEditing(true)}>{task}</TaskItem>
  )
}
