import React from 'react';
import { useToast } from './context/ToastContext';

const Toasts: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className='fixed bottom-8 right-8 flex gap-3 flex-col '>
            {toasts.map((toast) => (
                <div key={toast.id} className={`talign-center backdrop-blur-md backdrop-filter flex px-4 py-5 gap-3 rounded-lg shadow-lg toast ${toast.type === 'error' ? 'bg-red-500 bg-opacity-30 text-red-50' : 'bg-green-500 bg-opacity-30 text-green-100'}`}>
                    <span>
                        {toast.message}
                    </span>
                    <button onClick={() => removeToast(toast.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Toasts;