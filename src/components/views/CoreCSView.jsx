import { useState } from "react";
import { CORE_CS } from "../../constants/data";
import { Chip } from "../ui/Chip";
import { Bar } from "../ui/Bar";
import { TopicTracker } from "../shared/TopicTracker";

export function CoreCSView({ statusMap, onToggleStatus }) {
    const [tab, setTab] = useState("java");
    const groups = {
        java: { label: "☕ Java", color: "#f97316", items: CORE_CS.filter(t => t.id.startsWith("cs1") || t.id === "cs2" || t.id === "cs3" || t.id === "cs4") },
        sql: { label: "🗄 SQL/DBMS", color: "#3b82f6", items: CORE_CS.filter(t => ["cs5", "cs6", "cs7", "cs8"].includes(t.id)) },
        os: { label: "⚙️ OS", color: "#10b981", items: CORE_CS.filter(t => ["cs9", "cs10", "cs11", "cs12"].includes(t.id)) },
        net: { label: "🌐 Networks", color: "#a78bfa", items: CORE_CS.filter(t => ["cs13", "cs14"].includes(t.id)) },
        react: { label: "⚛️ React", color: "#38bdf8", items: CORE_CS.filter(t => ["cs15", "cs16", "cs17"].includes(t.id)) },
    };
    const totalMastered = CORE_CS.filter(t => statusMap[t.id] === 2).length;
    const pct = Math.round(totalMastered / CORE_CS.length * 100) || 0;

    return (
        <div>
            <div className="mb-5">
                <div className="font-syne text-[22px] font-extrabold mb-1">📚 Core CS Tracker</div>
                <div className="text-[13px] text-[#555]">Java • SQL/DBMS • OS • Networks • React — all interview essentials</div>
            </div>

            {/* Overview bar */}
            <div className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl px-4 py-3.5 mb-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-2">
                    <div className="font-syne font-bold text-sm">Overall Core CS Progress</div>
                    <span className="font-mono text-sm font-bold text-[#3b82f6]">{totalMastered}/{CORE_CS.length}</span>
                </div>
                <Bar pct={pct} color="#3b82f6" h={7} />
                <div className="flex gap-2 mt-2.5 flex-wrap justify-center sm:justify-start">
                    {Object.entries(groups).map(([k, g]) => {
                        const m = g.items.filter(t => statusMap[t.id] === 2).length;
                        return <Chip key={k} text={`${g.label}: ${m}/${g.items.length}`} color={g.color} small />;
                    })}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 mb-4 overflow-x-auto hide-scrollbar">
                {Object.entries(groups).map(([k, g]) => (
                    <button key={k} onClick={() => setTab(k)} className="flex-1 min-w-[max-content] px-2.5 sm:px-1.5 py-2 rounded-lg text-[11px] font-bold cursor-pointer border font-sans transition-all duration-150 whitespace-nowrap" style={{ borderColor: tab === k ? g.color : "#1e1e2e", background: tab === k ? g.color + "22" : "#0e0e1a", color: tab === k ? g.color : "#555" }}>{g.label}</button>
                ))}
            </div>

            <TopicTracker items={groups[tab].items} statusMap={statusMap} onToggleStatus={onToggleStatus} color={groups[tab].color} />
        </div>
    );
}
