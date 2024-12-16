import { useCallback, useRef, useEffect } from "react";

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleModalClick = useCallback((event: MouseEvent) => {
    const modalElement = dialogRef.current;
    if (!modalElement) {
      return;
    }

    const modalRect = modalElement.getBoundingClientRect();

    if (
      event.clientX < modalRect.left ||
      event.clientX > modalRect.right ||
      event.clientY < modalRect.top ||
      event.clientY > modalRect.bottom
    ) {
      modalElement.close();
    }
  }, []);

  useEffect(() => {
    const modalElement = dialogRef.current;

    if (!modalElement) {
      return;
    }

    modalElement.addEventListener("click", handleModalClick);

    return () => {
      modalElement.removeEventListener("click", handleModalClick);
    };
  }, [handleModalClick]);

  const open = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
    }
  }, []);

  const close = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      document.body.style.overflow = "visible";
    }
  }, []);

  return { open, close, ref: dialogRef };
};
