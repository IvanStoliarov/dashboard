import useOutsideClick from '@/hooks/useOutsideClick';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
const ModalContext = createContext<ModalState | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Used outside ModalContext');
  }

  return context;
}

function Modal({
  children,
  onCloseCallback,
}: {
  children: React.ReactNode;
  onCloseCallback: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    onCloseCallback();
  }, [onCloseCallback]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') closeModal();
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeModal]);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({
  children,
}: {
  children: ReactElement<{ onClick: () => void }>;
}) {
  const { openModal } = useModal();

  return (
    <button
      type='button'
      className='rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:cursor-pointer'
      onClick={openModal}
    >
      {children}
    </button>
  );
}

function Content({
  children,
}: {
  children:
    | React.ReactNode
    | ((args: { closeModal: () => void }) => React.ReactNode);
}) {
  const { isOpen, closeModal } = useModal();
  const ref = useOutsideClick<HTMLDivElement>(closeModal, true);

  if (!isOpen) return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 p-4 backdrop-blur-sm sm:p-6'>
      <div
        ref={ref}
        role='dialog'
        aria-modal='true'
        className='relative max-h-[calc(100vh-2rem)] w-auto max-w-160 overflow-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-24px_rgba(24,24,27,0.45)] sm:max-h-[calc(100vh-3rem)] sm:p-8'
      >
        <button
          type='button'
          onClick={closeModal}
          aria-label='Close modal'
          className='absolute right-3 top-3 flex size-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 z-1'
        >
          <XMarkIcon aria-hidden='true' className='size-5' />
        </button>
        {typeof children === 'function' ? children({ closeModal }) : children}
      </div>
    </div>,
    document.body,
  );
}

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
