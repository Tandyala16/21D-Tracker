import { HOURLY_BLOCKS } from "../../constants/data";
import { Checkbox } from "../ui/Checkbox";
import { Chip } from "../ui/Chip";
import { Bar } from "../ui/Bar";

export function HourlyView({ hourly, setHourly, counters, setCounters, onUpdateCounter, notes, setNotes, userName }) {
    const done = HOURLY_BLOCKS.filter(h => hourly[h.id]).length;

    return (
        <div>
            <div className="mb-5">
                <div className="font-syne text-[22px] font-extrabold mb-1">⏱ Today's Schedule</div>
                <div className="text-[13px] text-[#555]">5h 30min of structured focused work. Tick each block when complete.</div>
            </div>

            {/* Time blocks */}
            <div className="grid gap-[10px] mb-5">
                {HOURLY_BLOCKS.map(h => (
                    <div key={h.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-[14px] px-4 py-3 sm:py-[14px] bg-[#0e0e1a] rounded-xl cursor-pointer transition-all duration-150 border"
                        style={{ borderColor: hourly[h.id] ? h.color + "55" : "#1e1e2e" }}
                        onClick={() => setHourly(p => ({ ...p, [h.id]: !p[h.id] }))}>

                        <div className="flex items-center gap-3">
                            <Checkbox checked={!!hourly[h.id]} onChange={() => { }} color={h.color} size={20} />
                            <div className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center text-xl border shrink-0" style={{ background: `${h.color}15`, borderColor: `${h.color}22` }}>{h.icon}</div>

                            {/* Mobile-only right side of header */}
                            <div className="flex-1 sm:hidden">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-mono text-[11px] font-semibold" style={{ color: h.color }}>{h.time}</span>
                                    {hourly[h.id] && <Chip text="✓" color={h.color} small />}
                                </div>
                                <div className={`font-syne text-[14px] font-bold ${hourly[h.id] ? 'text-[#444] line-through' : 'text-[#e0e0f0]'}`}>{h.label}</div>
                            </div>
                        </div>

                        {/* Desktop label area / Mobile detail area */}
                        <div className="flex-1 ml-9 sm:ml-0">
                            <div className="hidden sm:flex items-center gap-2 mb-[3px]">
                                <span className="font-mono text-[11px] font-semibold" style={{ color: h.color }}>{h.time}</span>
                                <Chip text={`${h.mins}min`} color={h.color} small />
                                {hourly[h.id] && <Chip text="DONE" color={h.color} small />}
                            </div>
                            <div className={`hidden sm:block font-syne text-[14px] font-bold mb-0.5 ${hourly[h.id] ? 'text-[#444] line-through' : 'text-[#e0e0f0]'}`}>{h.label}</div>
                            <div className="text-[11px] text-[#4a4a6a]">{h.detail}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Day summary */}
            <div className="bg-[#0e0e1a] border rounded-xl px-4 sm:px-[18px] py-4 mb-4" style={{ borderColor: done === 6 ? "#10b981" : "#1e1e2e" }}>
                <div className="font-syne font-extrabold text-sm mb-3">Today's Progress</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] mb-3">
                    {[
                        { l: "Blocks Done", v: `${done}/6`, c: "#3b82f6" },
                        { l: "Hours Done", v: `${done === 6 ? "5h30m" : `${Math.floor(done * 55 / 60)}h${(done * 55) % 60}m`}`, c: "#a78bfa" },
                        { l: "Day %", v: `${Math.round(done / 6 * 100)}%`, c: "#10b981" },
                        { l: "Apps Today", v: counters.appsToday, c: "#f59e0b" },
                    ].map((s, i) => (
                        <div key={i} className="text-center bg-[#151525] sm:bg-transparent rounded-lg sm:rounded-none py-2 sm:py-0">
                            <div className="font-mono text-lg font-extrabold" style={{ color: s.c }}>{s.v}</div>
                            <div className="text-[10px] text-[#555] mt-0.5">{s.l}</div>
                        </div>
                    ))}
                </div>
                <Bar pct={Math.round(done / 6 * 100)} color={done === 6 ? "#10b981" : "#3b82f6"} h={7} />
                {done === 6 && <div className="mt-2.5 text-center text-[#10b981] font-bold text-[13px]">🔥 Full day executed! You're unstoppable, {userName || 'Explorer'}!</div>}
            </div>

            {/* Counters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mb-4">
                {[
                    { k: "appsToday", l: "Jobs Applied Today", c: "#10b981", hint: "Goal: 8-10" },
                    { k: "leetToday", l: "LeetCode Today", c: "#f59e0b", hint: "Goal: 3-5" },
                    { k: "aptToday", l: "Aptitude Qs Today", c: "#a78bfa", hint: "Goal: 20-30" },
                ].map(s => (
                    <div key={s.k} className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl px-3 py-[14px] flex flex-row md:flex-col items-center justify-between md:justify-center text-center">
                        <div className="md:mb-2 text-left md:text-center">
                            <div className="text-[10px] text-[#555] uppercase tracking-[0.5px]">{s.l}</div>
                            <div className="text-[10px] text-[#555] mt-0.5 hidden md:block">{s.hint}</div>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button onClick={() => onUpdateCounter(s.k, -1)} className="w-[26px] h-[26px] rounded-md bg-[#1a1a2e] text-[#888] text-base font-bold flex items-center justify-center hover:bg-[#22223a]">−</button>
                            <span className="font-mono text-[24px] font-extrabold min-w-[36px] text-center" style={{ color: s.c }}>{counters[s.k]}</span>
                            <button onClick={() => onUpdateCounter(s.k, 1)} className="w-[26px] h-[26px] rounded-md text-[#000] text-base font-bold flex items-center justify-center hover:opacity-90" style={{ background: s.c }}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div className="text-[10px] text-[#444] uppercase tracking-[1px] mb-2 font-bold">TODAY'S LOG / NOTES</div>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={5}
                    className="w-full bg-[#0a0a14] border border-[#1e1e2e] rounded-[10px] text-[#ccc] p-3 font-sans text-[13px] resize-y outline-none focus:border-[#3b82f6]"
                    placeholder="Interviews attended, companies that responded, what you learned, blockers, wins..." />
            </div>
        </div>
    );
}
