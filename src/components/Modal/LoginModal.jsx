import React, { useEffect } from 'react'
import { useState } from 'react'
import {
	ModalOverlay,
	ModalContainer,
	CloseButton,
	FormContainer,
	ImageContainer,
	Title,
	Form,
	FormGroup,
	Label,
	Input,
	SubmitButton,
	IconWrapper,
	IconImage,
} from '@components/Modal/LoginModal.style'
import loginModalStore from '@stores/modalStore'
import GoogleIcon from '@assets/google-icon.png'
import NaverIcon from '@assets/naver-icon.png'
import KakaoIcon from '@assets/kakao-icon.png'

export default function LoginModal() {
	const { isModalOpen, closeModal } = loginModalStore()
	const [inputIdValue, setInputIdValue] = useState('')
	const [inputPasswordValue, setInputPasswordValue] = useState('')

	const handleIdInputChange = (e) => {
		setInputIdValue(e.target.value)
	}

	const handlePasswordInputChange = (e) => {
		setInputPasswordValue(e.target.value)
	}

	useEffect(() => {
		setInputIdValue('')
		setInputPasswordValue('')
	}, [])

	if (!isModalOpen) return null
	return (
		<ModalOverlay>
			<ModalContainer>
				<FormContainer>
					<CloseButton onClick={closeModal}>&times;</CloseButton>
					<Title>스터디 플래너</Title>
					<IconWrapper>
						<IconImage src={GoogleIcon} alt="Google"></IconImage>
						<IconImage src={NaverIcon} alt="Naver"></IconImage>
						<IconImage src={KakaoIcon} alt="Kakao"></IconImage>
					</IconWrapper>
					<Form>
						<FormGroup>
							<Label>이메일:</Label>
							<Input
								type="email"
								value={inputIdValue}
								onChange={handleIdInputChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label>비밀번호:</Label>
							<Input
								type="password"
								value={inputPasswordValue}
								onChange={handlePasswordInputChange}
							/>
						</FormGroup>
						<SubmitButton type="submit">로그인</SubmitButton>
					</Form>
				</FormContainer>
				<ImageContainer />
			</ModalContainer>
		</ModalOverlay>
	)
}
