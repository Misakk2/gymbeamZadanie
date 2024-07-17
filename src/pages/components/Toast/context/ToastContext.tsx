import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type ToastContextType = {
    addToast: (toast: ToastMessage) => void;
    toasts: Toast[];
    removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);
interface Toast {
    id: number;
    message: string;
    type: 'error' | 'success';
}

interface ToastMessage {
    message: string;
    type: 'error' | 'success';
}

const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, []);

    const addToast = useCallback(({ message, type }: ToastMessage) => {
        const newToast: Toast = { id: Date.now(), message, type };
        setToasts(prevToasts => [...prevToasts, newToast]);
        setTimeout(() => {
            removeToast(newToast.id);
        }, 10000);
    }, [removeToast]);



    const contextValue = useMemo(() => ({ addToast, toasts, removeToast }), [addToast, toasts, removeToast]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
        </ToastContext.Provider>
    );
};

export { ToastProvider, useToast };

export type { ToastContextType, Toast, ToastMessage };

export default ToastContext