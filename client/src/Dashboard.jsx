import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Shield, Bell, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 p-6 flex flex-col">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
                    DeepTrace AI
                </h2>

                <nav className="flex-1 space-y-2">
                    <SidebarItem
                        icon={<Upload size={20} />}
                        label="Protect Image"
                        active={activeTab === 'upload'}
                        onClick={() => setActiveTab('upload')}
                    />
                    <SidebarItem
                        icon={<AlertTriangle size={20} />}
                        label="Alerts"
                        active={activeTab === 'alerts'}
                        onClick={() => setActiveTab('alerts')}
                    />
                    <SidebarItem
                        icon={<Shield size={20} />}
                        label="My Assets"
                        active={activeTab === 'assets'}
                        onClick={() => setActiveTab('assets')}
                    />
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                            {currentUser?.email?.[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate w-32">{currentUser?.email}</p>
                            <p className="text-xs text-gray-500">Basic Plan</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm w-full transition-colors"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">
                        {activeTab === 'upload' && 'Protect New Image'}
                        {activeTab === 'alerts' && 'Security Alerts'}
                        {activeTab === 'assets' && 'Protected Assets'}
                    </h1>
                    <button className="p-2 hover:bg-white/10 rounded-full relative">
                        <Bell size={20} className="text-gray-400" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </header>

                <div className="max-w-4xl">
                    {activeTab === 'upload' && <UploadView />}
                    {activeTab === 'alerts' && <AlertsView />}
                    {activeTab === 'assets' && <div className="text-gray-400">No assets protected yet.</div>}
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
            ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </button>
);

const UploadView = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState(null); // 'processing', 'success', 'error'

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setStatus('processing');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFile(null);
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setUploading(false);
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Protection Enabled</h3>
                <p className="text-gray-400 mb-6">Your image has been fingerprinted and registered globally.</p>
                <button onClick={() => setStatus(null)} className="btn-primary">Protect Another</button>
            </div>
        );
    }

    return (
        <div
            className={`relative bg-[#121212] border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${dragActive ? 'border-blue-500 bg-blue-500/5' : 'border-gray-800 hover:border-gray-700'
                }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
                accept="image/*"
            />

            {uploading ? (
                <div className="py-8">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-blue-400 font-medium">Embedding Invisible Fingerprint...</p>
                    <p className="text-xs text-gray-500 mt-2">Registering on Blockchain</p>
                </div>
            ) : file ? (
                <div className="py-4">
                    <div className="w-20 h-20 bg-gray-800 rounded-lg mx-auto mb-4 object-cover overflow-hidden">
                        <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-medium mb-4">{file.name}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent opening file dialog
                            handleUpload();
                        }}
                        className="btn-primary z-10 relative"
                    >
                        Confirm Protection
                    </button>
                </div>
            ) : (
                <>
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="text-blue-400" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Upload image to protect</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                        Drag and drop your high-resolution images here. We'll embed an invisible fingerprint and register it.
                    </p>
                    <button className="btn-primary pointer-events-none">
                        Select Files
                    </button>
                </>
            )}
        </div>
    );
};

const AlertsView = () => (
    <div className="space-y-4">
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-start gap-4">
            <AlertTriangle className="text-red-500 mt-1" />
            <div>
                <h4 className="font-semibold text-red-500">Possible Deepfake Detected</h4>
                <p className="text-sm text-gray-400 mt-1">
                    Our specialized AI scanner detected a manipulation of your image ID #8921 on social media platform X.
                </p>
                <div className="mt-3 flex gap-3">
                    <button className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-md">View Evidence</button>
                    <button className="text-xs text-gray-400 hover:text-white px-3 py-1.5 border border-gray-700 rounded-md">Ignore</button>
                </div>
            </div>
        </div>

        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 flex items-start gap-4">
            <CheckCircle className="text-green-500 mt-1" />
            <div>
                <h4 className="font-semibold text-green-500">Scanned 150 Locations</h4>
                <p className="text-sm text-gray-400 mt-1">
                    Routine check completed. No unauthorized usage found for your protected assets.
                </p>
            </div>
        </div>
    </div>
);

export default Dashboard;
