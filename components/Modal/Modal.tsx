'use client';

import css from "./Modal.module.css"

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {

  
  const close = () => {
    onClose?.()
  }

  return (
    <div className={css.backdrop} onClick={close}>
      <div className={css.content} onClick={e=>e.stopPropagation()}>
        {children}
        <button
          className={css.close}
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;


