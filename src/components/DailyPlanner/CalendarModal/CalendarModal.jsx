import { CloseButton } from "@components/Preferences/Preferences.style";
import { ModalContainer } from "./CalendarModal.style";

const CalendarModal = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <ModalContainer>
            <CloseButton onClick={onClose}>
                X
            </CloseButton>
            {children}
        </ModalContainer>
    )
};

export default CalendarModal;