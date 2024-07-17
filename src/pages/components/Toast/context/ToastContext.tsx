import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext<{
    addToast: (toast: ToastMessage) => void;
    toasts: Toast[];
    removeToast: (id: number) => void;
}>({
    addToast: () => { },
    toasts: [],
    removeToast: () => { }
});

interface Toast {
    id: number;
    message: string;
    type: 'error' | 'success';
}

export interface ToastMessage {
    message: string;
    type: 'error' | 'success';
}


export const useToast = () => useContext(ToastContext);
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const addToast = ({ message, type }: ToastMessage) => {
        const newToast: Toast = { id: Date.now(), message, type };
        setToasts([...toasts, newToast]);
        setTimeout(() => {
            removeToast(newToast.id);
        }, 10000);
    };

    const removeToast = (id: number) => {
        setToasts(toasts.filter(toast => toast.id !== id));
    }
    return (
        <ToastContext.Provider value={{ addToast, toasts, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastContext