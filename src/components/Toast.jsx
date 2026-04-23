import React from 'react';
import { useApp } from '../AppContext';

const Toast = () => {
    const { toast } = useApp();

    if (!toast) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            backgroundColor: '#323232',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            animation: 'slideUp 0.3s ease-out'
        }}>
            {toast}
            <style>
                {`
                    @keyframes slideUp {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
};

export default Toast;
