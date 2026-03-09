import { useNavigate } from "react-router-dom";
import { LOGICAL_REASONING, QUANTITATIVE_APTITUDE, DSA_TOPICS, CORE_CS, HOURLY_BLOCKS } from "../../constants/data";
import { Ring } from "../ui/Ring";
import { Chip } from "../ui/Chip";
import { Bar } from "../ui/Bar";

import { ContributionGraph } from "./ContributionGraph";

export function Dashboard({ statusMap, kpiMap, counters, hourly, streak, elapsedDays, streakHistory, missionStart }) {
    const navigate = useNavigate();
    const lrMastered = LOGICAL_REASONING.filter(t => statusMap[t.id] === 2).length;
    const qaMastered = QUANTITATIVE_APTITUDE.filter(t => statusMap[t.id] === 2).length;
    const dsaMastered = DSA_TOPICS.filter(t => statusMap[t.id] === 2).length;
    const csMastered = CORE_CS.filter(t => statusMap[t.id] === 2).length;
    const totalTopics = LOGICAL_REASONING.length + QUANTITATIVE_APTITUDE.length + DSA_TOPICS.length + CORE_CS.length;
    const totalMastered = lrMastered + qaMastered + dsaMastered + csMastered;
    const overallPct = Math.round(totalMastered / totalTopics * 100) || 0;
    const hourlyDone = HOURLY_BLOCKS.filter(h => hourly[h.id]).length;

    const sections = [
        { l: "Logical Reasoning", m: lrMastered, t: LOGICAL_REASONING.length, c: "#8b5cf6", icon: "🧠", v: "aptitude" },
        { l: "Quant Aptitude", m: qaMastered, t: QUANTITATIVE_APTITUDE.length, c: "#f59e0b", icon: "📐", v: "aptitude" },
        { l: "DSA Topics", m: dsaMastered, t: DSA_TOPICS.length, c: "#10b981", icon: "🧩", v: "dsa" },
        { l: "Core CS Topics", m: csMastered, t: CORE_CS.length, c: "#3b82f6", icon: "📚", v: "cs" },
    ];

    return (
        <div>
            <div className="mb-[22px]">
                <div className="font-syne text-[24px] font-extrabold tracking-[-0.5px]">
                    Mission Control <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">→ Day {Math.min(21, elapsedDays)}</span>
                </div>
                <div className="text-[13px] text-[#555] mt-[3px]">Job Placed · 8-12 LPA · Software Engineer</div>
            </div>

            {/* Hero stats */}
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-[10px] mb-[18px]">
                {[
                    { l: "Topics Mastered", v: `${totalMastered}/${totalTopics}`, c: "#3b82f6", i: "🎯", colSpan: "col-span-2 lg:col-span-1" },
                    { l: "Mission Time", v: `${Math.min(21, elapsedDays)}/21`, c: "#8b5cf6", i: "⏳" },
                    { l: "Apps Sent", v: counters.appsTotal, c: "#10b981", i: "📤" },
                    { l: "LeetCode ✓", v: counters.leetTotal, c: "#f59e0b", i: "🧩" },
                    { l: "Top Streak", v: `${streak?.max || 0} 🔥`, c: "#ff4500", i: "⭐" },
                    { l: "Mock Interviews", v: counters.mocks, c: "#ec4899", i: "🎤" },
                    { l: "Today's Blocks", v: `${hourlyDone}/6`, c: "#a78bfa", i: "⏱" },
                ].map((s, i) => (
                    <div key={i} className={`bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl px-2.5 py-[14px] text-center ${s.colSpan || ''}`}>
                        <div className="text-lg mb-1.5">{s.i}</div>
                        <div className="font-mono text-lg font-extrabold" style={{ color: s.c }}>{s.v}</div>
                        <div className="text-[10px] text-[#555] mt-[3px] uppercase tracking-[0.4px]">{s.l}</div>
                    </div>
                ))}
            </div>

            {/* Overall ring + progress */}
            <ContributionGraph streakHistory={streakHistory} missionStart={missionStart} />

            <div className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-[14px] p-4 sm:p-[18px] mb-[18px] flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                <Ring pct={overallPct} size={80} sw={8} color={overallPct >= 70 ? "#10b981" : overallPct >= 40 ? "#f59e0b" : "#3b82f6"} />
                <div className="flex-1 w-full">
                    <div className="font-syne font-extrabold text-base mb-1.5">Overall Mission Progress</div>
                    <div className="flex gap-2 flex-wrap justify-center sm:justify-start mb-2.5">
                        {sections.map(s => <Chip key={s.l} text={`${s.l}: ${s.m}/${s.t}`} color={s.c} small />)}
                    </div>
                    <Bar pct={overallPct} color={overallPct >= 70 ? "#10b981" : overallPct >= 40 ? "#f59e0b" : "#3b82f6"} h={7} />
                </div>
            </div>

            {/* Section cards */}
            <div className="text-[10px] text-[#444] uppercase tracking-[1px] mb-2.5 font-bold">SUBJECT PROGRESS — CLICK TO OPEN</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] mb-[18px]">
                {sections.map((s, i) => (
                    <div
                        key={i}
                        className="bg-[#0e0e1a] border rounded-xl p-[14px] cursor-pointer hover:bg-[#1a1a2a] transition-colors"
                        style={{ borderColor: `${s.c}33` }}
                        onClick={() => navigate('/' + s.v)}
                    >
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <span className="text-xl">{s.icon}</span>
                            <div className="flex-1">
                                <div className="font-syne font-bold text-[13px]">{s.l}</div>
                                <div className="text-[11px] text-[#555]">{s.m}/{s.t} mastered</div>
                            </div>
                            <Ring pct={Math.round(s.m / s.t * 100) || 0} size={42} sw={4} color={s.c} />
                        </div>
                        <Bar pct={Math.round(s.m / s.t * 100) || 0} color={s.c} h={4} />
                    </div>
                ))}
            </div>

            {/* Today's hourly preview */}
            <div className="text-[10px] text-[#444] uppercase tracking-[1px] mb-2.5 font-bold">TODAY'S TIME BLOCKS</div>
            <div className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl overflow-hidden mb-[18px]">
                {HOURLY_BLOCKS.map((h, i) => (
                    <div key={h.id} className={`flex flex-wrap sm:flex-nowrap items-center gap-x-3 gap-y-1 px-3 sm:px-3.5 py-2.5 ${i < HOURLY_BLOCKS.length - 1 ? "border-b border-[#16162a]" : ""}`}>
                        <div className="w-2 h-2 rounded-full shrink-0 hidden sm:block" style={{ background: hourly[h.id] ? h.color : "#2a2a3a" }} />
                        <span className="font-mono text-[10px] min-w-[70px] sm:min-w-[90px]" style={{ color: h.color }}>{h.time}</span>
                        <span className={`text-[11px] sm:text-xs w-full sm:w-auto sm:flex-1 order-3 sm:order-none ${hourly[h.id] ? "text-[#444] line-through" : "text-[#bbb]"}`}>{h.label}</span>
                        <div className="ml-auto sm:ml-0 order-2 sm:order-none">{hourly[h.id] ? <Chip text="✓" color={h.color} small /> : <Chip text={`${h.mins}m`} color="#333" small />}</div>
                    </div>
                ))}
                <div className="px-3.5 py-2.5 border-t border-[#16162a] flex items-center justify-between">
                    <span className="text-[11px] text-[#555]">Daily block completion</span>
                    <div className="flex items-center gap-2">
                        <div className="w-[80px]">
                            <Bar pct={Math.round(hourlyDone / 6 * 100)} color="#3b82f6" h={4} />
                        </div>
                        <span className="font-mono text-[11px] text-[#3b82f6] font-semibold">{hourlyDone}/6</span>
                    </div>
                </div>
            </div>

            {/* Target gauges row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
                {[
                    { l: "Applications", v: counters.appsTotal, max: 150, c: "#10b981", hint: "Goal: 150 by Day 21" },
                    { l: "LeetCode Solved", v: counters.leetTotal, max: 80, c: "#f59e0b", hint: "Goal: 80+ total" },
                    { l: "Mock Interviews", v: counters.mocks, max: 5, c: "#ec4899", hint: "Goal: 5+ total" },
                ].map((s, i) => (
                    <div key={i} className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl p-[14px] flex items-center gap-3">
                        <Ring pct={Math.min(100, Math.round(s.v / s.max * 100) || 0)} size={50} sw={5} color={s.c} />
                        <div>
                            <div className="text-[11px] text-[#555] uppercase tracking-[0.4px]">{s.l}</div>
                            <div className="font-mono text-xl font-extrabold" style={{ color: s.c }}>
                                {s.v}<span className="text-xs text-[#555]">/{s.max}</span>
                            </div>
                            <div className="text-[10px] text-[#555]">{s.hint}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
