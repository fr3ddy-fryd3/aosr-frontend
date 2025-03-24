import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean,
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 rounded-full p-1 text-white bg-red-400 hover:bg-red-500 transition-all" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
