import { useState } from "react";
import { WEEKLY_KPIS } from "../../constants/data";
import { Ring } from "../ui/Ring";
import { Chip } from "../ui/Chip";
import { Bar } from "../ui/Bar";
import { Checkbox } from "../ui/Checkbox";

export function WeeklyView({ kpiMap, onToggle, counters, setCounters, onUpdateCounter }) {
    const [wk, setWk] = useState(0);
    const W = WEEKLY_KPIS[wk];

    return (
        <div>
            <div className="mb-5">
                <div className="font-syne text-[22px] font-extrabold mb-1">📅 Weekly KPI Tracker</div>
                <div className="text-[13px] text-[#555]">Check each KPI when you hit the target. These are your weekly scorecards.</div>
            </div>

            {/* Global metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
                {[
                    { l: "Apps Sent", k: "appsTotal", max: 150, c: "#10b981", hint: "/150" },
                    { l: "LeetCode", k: "leetTotal", max: 80, c: "#f59e0b", hint: "/80" },
                    { l: "Mock Intrvws", k: "mocks", max: 5, c: "#ec4899", hint: "/5" },
                    { l: "Interviews", k: "interviews", max: 5, c: "#3b82f6", hint: "/5+" },
                ].map(s => (
                    <div key={s.k} className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl p-3 text-center">
                        <div className="text-[10px] text-[#555] uppercase tracking-[0.5px] mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">{s.l}</div>
                        <div className="flex items-center justify-center gap-1.5 mb-1.5">
                            <button onClick={() => onUpdateCounter(s.k, -1)} className="w-[22px] h-[22px] rounded-md bg-[#1a1a2e] text-[#666] text-sm cursor-pointer hover:bg-[#22223a] flex items-center justify-center font-bold shrink-0">−</button>
                            <span className="font-mono text-xl font-extrabold" style={{ color: s.c }}>{counters[s.k]}</span>
                            <button onClick={() => onUpdateCounter(s.k, 1)} className="w-[22px] h-[22px] rounded-md text-[#000] text-sm cursor-pointer hover:opacity-90 flex items-center justify-center font-bold shrink-0" style={{ background: s.c }}>+</button>
                        </div>
                        <Bar pct={Math.min(100, Math.round(counters[s.k] / s.max * 100) || 0)} color={s.c} h={3} />
                        <div className="text-[10px] text-[#555] mt-1">{counters[s.k]}{s.hint}</div>
                    </div>
                ))}
            </div>

            {/* Week tabs */}
            <div className="flex flex-wrap sm:flex-nowrap gap-1.5 mb-[18px]">
                {WEEKLY_KPIS.map((w, i) => {
                    const done = w.kpis.filter(k => kpiMap[k.id]).length;
                    return (
                        <button key={i} onClick={() => setWk(i)} className="flex-1 min-w-[30%] sm:min-w-0 p-2 sm:p-[9px] rounded-lg text-[10px] sm:text-xs font-bold cursor-pointer border font-sans transition-all duration-150 whitespace-nowrap" style={{ borderColor: wk === i ? w.color : "#1e1e2e", background: wk === i ? w.color + "22" : "#0e0e1a", color: wk === i ? w.color : "#555" }}>
                            {w.label} <span className="hidden sm:inline">· {done}/{w.kpis.length}</span>
                        </button>
                    );
                })}
            </div>

            {/* Week header */}
            <div className="border rounded-[14px] px-4 sm:px-5 py-4 sm:py-[18px] mb-4" style={{ background: `linear-gradient(135deg,${W.bg},#0a0a14)`, borderColor: `${W.color}44` }}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
                    <div className="w-full">
                        <div className="flex gap-2 mb-2 justify-center sm:justify-start">
                            <Chip text={W.days} color={W.color} />
                            <Chip text={`${W.kpis.filter(k => kpiMap[k.id]).length}/${W.kpis.length} KPIs Hit`} color={W.color} />
                        </div>
                        <div className="font-syne text-xl font-extrabold mb-1.5">{W.label}: {W.sub}</div>
                        <div className="text-xs text-[#888] leading-[1.6] max-w-[520px] mx-auto sm:mx-0">{W.goal}</div>
                    </div>
                    <Ring pct={Math.round(W.kpis.filter(k => kpiMap[k.id]).length / W.kpis.length * 100) || 0} size={64} sw={6} color={W.color} />
                </div>
                <div className="mt-3.5">
                    <Bar pct={Math.round(W.kpis.filter(k => kpiMap[k.id]).length / W.kpis.length * 100) || 0} color={W.color} h={6} />
                </div>
            </div>

            {/* KPI list */}
            <div className="grid gap-2">
                {W.kpis.map(kpi => (
                    <div key={kpi.id} onClick={() => onToggle(kpi.id)} className="flex items-start sm:items-center gap-3 px-3 sm:px-[14px] py-3 bg-[#0e0e1a] border rounded-[11px] cursor-pointer transition-all duration-150" style={{ borderColor: kpiMap[kpi.id] ? W.color + "44" : "#1e1e2e" }}>
                        <div className="mt-0.5 sm:mt-0">
                            <Checkbox checked={!!kpiMap[kpi.id]} onChange={() => { }} color={W.color} size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`text-[12px] sm:text-[13px] font-semibold mb-[3px] leading-snug ${kpiMap[kpi.id] ? 'text-[#555] line-through' : 'text-[#e0e0f0]'}`}>{kpi.text}</div>
                            <div className="text-[10px] sm:text-[11px] text-[#555] leading-tight">{kpi.target}</div>
                        </div>
                        {kpiMap[kpi.id] && <div className="hidden sm:block"><Chip text="✓ HIT" color={W.color} small /></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
