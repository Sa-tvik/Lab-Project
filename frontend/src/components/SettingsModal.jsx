import { useState, useRef, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {User} from 'lucide-react';

export default function SettingModal() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch(`${backendUrl}/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            
            if (!res.ok) {
                alert('Logout failed');
            }

            navigate('/login');
        } catch (err) {
            alert('Logout failed:', err.message);
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
            >
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>

            {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 shadow-md rounded-md z-50">
                <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
            )}
        </div>
    );
}
