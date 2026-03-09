import React, { useRef, useState } from 'react';
import { STORAGE_KEY } from '../../constants/data';

export function SettingsView() {
    const [msg, setMsg] = useState('');
    const fileInputRef = useRef(null);

    const exportData = () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(STORAGE_KEY)) {
                data[key] = localStorage.getItem(key);
            }
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `21d-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setMsg("✅ Backup downloaded successfully!");
        setTimeout(() => setMsg(""), 3000);
    };

    const importData = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                // Basic validation checking if it's our save file
                let validKeys = 0;
                for (const key in data) {
                    if (key.startsWith(STORAGE_KEY)) validKeys++;
                }

                if (validKeys === 0) {
                    setMsg("❌ Invalid backup file.");
                    return;
                }

                // Overwrite localStorage
                for (const key in data) {
                    localStorage.setItem(key, data[key]);
                }

                setMsg("🔄 Restoring data... Reloading!");
                setTimeout(() => window.location.reload(), 1500);

            } catch (err) {
                setMsg("❌ Failed to parse JSON file.");
            }
        };
        reader.readAsText(file);
    };

    const hardReset = () => {
        if (window.confirm("🚨 DANGER ZONE 🚨\nAre you absolutely sure?\nThis will permanently delete all your progress, counters, and streaks!")) {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key.startsWith(STORAGE_KEY)) {
                    localStorage.removeItem(key);
                }
            }
            window.location.reload();
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-8">
                <div className="font-syne text-[28px] font-extrabold tracking-tight text-white flex items-center gap-3">
                    ⚙️ Settings & Data
                </div>
                <div className="text-[#888] text-sm mt-1">Manage your local storage data and backups to ensure you never lose your progress.</div>
            </div>

            {msg && (
                <div className="mb-6 p-4 rounded-lg bg-[#3b82f615] border border-[#3b82f640] text-white text-sm font-medium">
                    {msg}
                </div>
            )}

            <div className="space-y-6">

                {/* Export Card */}
                <div className="bg-[#11111a] border border-[#222233] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">📥 Export Backup</h3>
                    <p className="text-sm text-[#888] mb-4">
                        Download a `.json` snapshot of your current 21-Day tracking progress. Store this safely on your computer or cloud drive.
                    </p>
                    <button
                        onClick={exportData}
                        className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
                    >
                        Download Data Backup
                    </button>
                </div>

                {/* Import Card */}
                <div className="bg-[#11111a] border border-[#222233] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">📤 Import / Restore</h3>
                    <p className="text-sm text-[#888] mb-4">
                        Upload a previously saved `.json` backup file. <strong className="text-white">Warning:</strong> This will completely overwrite your current progress on this browser!
                    </p>
                    <input
                        type="file"
                        accept=".json"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={importData}
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="bg-[#222233] hover:bg-[#2a2a3a] border border-[#333344] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
                    >
                        Select Backup File
                    </button>
                </div>

                {/* Danger Zone */}
                <div className="bg-[#2a0f0f] border border-[#ff450033] rounded-xl p-6 mt-12">
                    <h3 className="text-lg font-bold text-[#ff4500] mb-2 flex items-center gap-2">🚨 Danger Zone</h3>
                    <p className="text-sm text-[#aa5555] mb-4">
                        Permanently delete all trackers, notes, leetcode counters, and the mission start clock. Wipes the active local storage.
                    </p>
                    <button
                        onClick={hardReset}
                        className="bg-[#ff4500] hover:bg-[#dd3b00] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
                    >
                        Hard Reset (Delete Everything)
                    </button>
                </div>

            </div>
        </div>
    );
}
