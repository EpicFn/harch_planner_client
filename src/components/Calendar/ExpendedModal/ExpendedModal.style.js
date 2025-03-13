import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* 투명한 어두운 배경 */
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  animation: slideIn 0.4s forwards;
  margin-right: 70px;

  @keyframes slideIn {
    to {
      transform: translateX(0);
    }
  }
`

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: #999;
  position: absolute;
  top: 25px;
  right: 20px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.6rem;
  color: #333;
`

export const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const EventItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  position: relative;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:before {
    content: '${(props) => props.index + 1}.';
    font-weight: bold;
    margin-right: 10px;
    color: #4caf50; // 번호 색상
    font-size: 1.2rem;
  }
`
