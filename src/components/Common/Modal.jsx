import React, { useEffect, useRef } from 'react';

// Native modal <dialog>: opened with showModal() so it gets a backdrop, inert page behind,
// focus containment and Escape-to-close. Focus returns to the opener when it unmounts.
export default function Modal({ onClose, className = 'modal-dialog', style, labelledBy, closeOnBackdrop = true, children }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    if (dialog && !dialog.open) {
      // Fall back to a non-modal open dialog where showModal is unavailable
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }
    return () => {
      if (dialog?.open) {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      }
      if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus();
    };
  }, []);

  const handleCancel = (e) => {
    // Let React own the open state instead of the browser closing the dialog itself
    e.preventDefault();
    onCloseRef.current?.();
  };

  const handleClick = (e) => {
    if (!closeOnBackdrop || e.target !== dialogRef.current) return;
    const rect = dialogRef.current.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) onCloseRef.current?.();
  };

  return (
    <dialog
      ref={dialogRef}
      className={className}
      style={style}
      aria-labelledby={labelledBy}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
}
