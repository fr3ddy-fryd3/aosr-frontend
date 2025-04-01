import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean,
  onClose: () => void;
  children: ReactNode;
}

export function SmallModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex bg-black/50 items-center justify-center" onClick={onClose}>
      <div className="relative bg-white rounded-lg p-8 shadow-lg w-lg" onClick={(e) => e.stopPropagation()}>
        <button className="flex items-center justify-center absolute top-2 right-2 rounded-full w-6 h-6  text-white bg-red-400 hover:bg-red-500 transition-all" onClick={onClose}>
          <img src="/x.svg" alt="Exit" className="h-2 w-2 " />
        </button>
        {children}
      </div>
    </div>
  );
}
