import { useState } from "react";
import { LOGICAL_REASONING, QUANTITATIVE_APTITUDE } from "../../constants/data";
import { Ring } from "../ui/Ring";
import { Bar } from "../ui/Bar";
import { TopicTracker } from "../shared/TopicTracker";

export function AptitudeView({ statusMap, onToggleStatus, counters, setCounters }) {
    const [tab, setTab] = useState("lr");
    const lrMastered = LOGICAL_REASONING.filter(t => statusMap[t.id] === 2).length;
    const qaMastered = QUANTITATIVE_APTITUDE.filter(t => statusMap[t.id] === 2).length;
    const lrPct = Math.round(lrMastered / LOGICAL_REASONING.length * 100) || 0;
    const qaPct = Math.round(qaMastered / QUANTITATIVE_APTITUDE.length * 100) || 0;

    return (
        <div>
            <div className="mb-5">
                <div className="font-syne text-[22px] font-extrabold mb-1">🧮 Aptitude Tracker</div>
                <div className="text-[13px] text-[#555]">Track every topic. Cycle status: Not Started → In Progress → Mastered</div>
            </div>

            {/* Overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                {[
                    { l: "Logical Reasoning", mastered: lrMastered, total: LOGICAL_REASONING.length, pct: lrPct, color: "#8b5cf6", icon: "🧠" },
                    { l: "Quantitative Aptitude", mastered: qaMastered, total: QUANTITATIVE_APTITUDE.length, pct: qaPct, color: "#f59e0b", icon: "📐" },
                ].map((s, i) => (
                    <div key={i} className="bg-[#0e0e1a] border rounded-xl p-4" style={{ borderColor: i === 0 ? "#8b5cf633" : "#f59e0b33" }}>
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <span className="text-[22px]">{s.icon}</span>
                            <div className="flex-1">
                                <div className="font-syne font-bold text-[13px]">{s.l}</div>
                                <div className="text-[11px] text-[#555]">{s.mastered}/{s.total} topics mastered</div>
                            </div>
                            <Ring pct={s.pct} size={48} sw={5} color={s.color} />
                        </div>
                        <Bar pct={s.pct} color={s.color} h={4} />
                    </div>
                ))}
            </div>

            {/* Daily aptitude counter */}
            <div className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl px-4 py-3.5 mb-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
                <span className="text-xl hidden sm:block">📊</span>
                <div className="flex-1 w-full">
                    <div className="font-syne font-bold text-[13px] mb-0.5">Questions Practiced Today</div>
                    <div className="text-[11px] text-[#555]">Goal: 20–30 questions per day from IndiaBIX / practice sets</div>
                </div>
                <div className="flex items-center justify-center gap-2 w-full sm:w-auto mt-1 sm:mt-0">
                    <button onClick={() => setCounters(p => ({ ...p, aptToday: Math.max(0, p.aptToday - 1) }))} className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-[#1a1a2e] text-[#888] text-base font-bold cursor-pointer hover:bg-[#22223a]">−</button>
                    <span className="font-mono text-[28px] sm:text-[24px] font-extrabold text-[#a78bfa] min-w-[40px] text-center">{counters.aptToday}</span>
                    <button onClick={() => setCounters(p => ({ ...p, aptToday: p.aptToday + 1 }))} className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-[#8b5cf6] text-[#fff] text-base font-bold cursor-pointer hover:opacity-90">+</button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 mb-4 overflow-x-auto hide-scrollbar">
                {[["lr", "🧠 Logical Reasoning", "#8b5cf6"], ["qa", "📐 Quantitative Aptitude", "#f59e0b"]].map(([t, l, c]) => (
                    <button key={t} onClick={() => setTab(t)} className="flex-1 min-w-[max-content] p-[9px] rounded-lg text-[12px] font-bold cursor-pointer border transition-all duration-150 font-sans whitespace-nowrap" style={{ borderColor: tab === t ? c : "#1e1e2e", background: tab === t ? c + "22" : "#0e0e1a", color: tab === t ? c : "#555" }}>{l}</button>
                ))}
            </div>

            {tab === "lr" && <TopicTracker items={LOGICAL_REASONING} statusMap={statusMap} onToggleStatus={onToggleStatus} color="#8b5cf6" />}
            {tab === "qa" && <TopicTracker items={QUANTITATIVE_APTITUDE} statusMap={statusMap} onToggleStatus={onToggleStatus} color="#f59e0b" />}
        </div>
    );
}
