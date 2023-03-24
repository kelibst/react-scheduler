<<<<<<< Updated upstream
import { FC } from "react";
import { createPortal } from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: any
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white relative rounded-lg p-6">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <AiFillCloseCircle />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
=======
import { FC } from "react";
import { createPortal } from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: any
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white relative rounded-lg p-6">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <AiFillCloseCircle />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
>>>>>>> Stashed changes
