'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  dialogId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const ModalContext = createContext<ModalState | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Used outside ModalContext');
  return context;
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(element => !element.hasAttribute('hidden'));
}

function Modal({
  children,
  onCloseCallback,
}: {
  children: ReactNode;
  onCloseCallback?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();

  const closeModal = useCallback(() => {
    setIsOpen(false);
    onCloseCallback?.();
  }, [onCloseCallback]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => trigger?.focus());
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal,
        dialogId,
        triggerRef,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({
  children,
  ariaLabel,
  ariaDescribedBy,
}: {
  children: ReactNode;
  ariaLabel: string;
  ariaDescribedBy?: string;
}) {
  const { isOpen, openModal, dialogId, triggerRef } = useModal();

  return (
    <button
      type='button'
      ref={triggerRef}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-controls={dialogId}
      aria-expanded={isOpen}
      aria-haspopup='dialog'
      className='rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 hover:cursor-pointer'
      onClick={openModal}
    >
      {children}
    </button>
  );
}

function Content({
  children,
  ariaLabel,
}: {
  children: ReactNode | ((args: { closeModal: () => void }) => ReactNode);
  ariaLabel: string;
}) {
  const { isOpen, closeModal, dialogId } = useModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const focusable = getFocusableElements(dialogRef.current);
    (focusable.at(0) ?? dialogRef.current).focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const elements = getFocusableElements(dialogRef.current);
      const first = elements.at(0);
      const last = elements.at(-1);
      if (!first || !last) {
        event.preventDefault();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 p-4 backdrop-blur-sm sm:p-6'
      onMouseDown={event => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        ref={dialogRef}
        id={dialogId}
        role='dialog'
        aria-modal='true'
        aria-label={ariaLabel}
        tabIndex={-1}
        className='relative max-h-[calc(100vh-2rem)] w-auto max-w-160 overflow-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-24px_rgba(24,24,27,0.45)] sm:max-h-[calc(100vh-3rem)] sm:p-8'
      >
        <button
          type='button'
          onClick={closeModal}
          aria-label='Close dialog'
          className='absolute right-3 top-3 z-1 flex size-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
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
