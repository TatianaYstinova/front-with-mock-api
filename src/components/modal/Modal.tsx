import React from 'react';
import ModalLib from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    setModalIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, setModalIsOpen, children }) => {
    return (
        <ModalLib isOpen={isOpen} onRequestClose={() => setModalIsOpen(false)}>
            {children}
            <button onClick={() => setModalIsOpen(false)}> закрыть модальное окно</button>
        </ModalLib>
    )
}