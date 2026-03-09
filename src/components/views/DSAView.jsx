import { DSA_TOPICS } from "../../constants/data";
import { Ring } from "../ui/Ring";
import { Chip } from "../ui/Chip";
import { Bar } from "../ui/Bar";
import { TopicTracker } from "../shared/TopicTracker";

export function DSAView({ statusMap, onToggleStatus, counters, setCounters, onUpdateCounter }) {
    const mastered = DSA_TOPICS.filter(t => statusMap[t.id] === 2).length;
    const inprog = DSA_TOPICS.filter(t => statusMap[t.id] === 1).length;
    const pct = Math.round(mastered / DSA_TOPICS.length * 100) || 0;
    const easy = DSA_TOPICS.filter(t => t.diff === "Easy");
    const med = DSA_TOPICS.filter(t => t.diff === "Med");

    return (
        <div>
            <div className="mb-5">
                <div className="font-syne text-[22px] font-extrabold mb-1">🧩 DSA Tracker</div>
                <div className="text-[13px] text-[#555]">14 topics from Easy to Medium. Cycle status to track mastery.</div>
            </div>

            {/* Overview */}
            <div className="bg-[#0e0e1a] border border-[#f59e0b33] rounded-xl p-4 mb-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-3 text-center sm:text-left">
                    <Ring pct={pct} size={64} sw={6} color="#f59e0b" />
                    <div className="flex-1 w-full">
                        <div className="font-syne font-extrabold text-base mb-1">Overall DSA Progress</div>
                        <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                            <Chip text={`${mastered} Mastered`} color="#10b981" />
                            <Chip text={`${inprog} In Progress`} color="#f59e0b" />
                            <Chip text={`${DSA_TOPICS.length - mastered - inprog} Not Started`} color="#555" />
                        </div>
                    </div>
                </div>
                <Bar pct={pct} color="#f59e0b" h={6} />
            </div>

            {/* LeetCode counter */}
            <div className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl p-4 mb-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <span className="text-2xl hidden sm:block">⚡</span>
                <div className="flex-1 w-full">
                    <div className="font-syne font-bold text-[13px] mb-0.5">LeetCode Problems Solved (Total)</div>
                    <div className="text-[11px] text-[#555]">Target: 80+ by Day 21 • Goal: 3-5 per day</div>
                </div>
                <div className="flex items-center justify-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateCounter("leetTotal", -1)} className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-[#1a1a2e] text-[#888] text-base font-bold cursor-pointer hover:bg-[#22223a]">−</button>
                        <div className="text-center min-w-[50px]">
                            <span className="font-mono text-[28px] sm:text-[24px] font-extrabold text-[#f59e0b]">{counters.leetTotal}</span>
                            <span className="text-[13px] text-[#555] hidden sm:inline">/80</span>
                        </div>
                        <button onClick={() => onUpdateCounter("leetTotal", 1)} className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-[#f59e0b] text-[#000] text-base font-bold cursor-pointer hover:opacity-90">+</button>
                    </div>
                    <div className="hidden sm:block">
                        <Ring pct={Math.min(100, Math.round(counters.leetTotal / 80 * 100) || 0)} size={46} sw={4} color="#f59e0b" />
                    </div>
                </div>
            </div>

            {/* Easy topics */}
            <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                    <Chip text="EASY TOPICS" color="#10b981" />
                    <span className="text-[11px] text-[#555]">Week 1 focus — master these first</span>
                </div>
                <TopicTracker items={easy} statusMap={statusMap} onToggleStatus={onToggleStatus} color="#10b981" showDiff showLeet />
            </div>

            {/* Medium topics */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Chip text="MEDIUM TOPICS" color="#f59e0b" />
                    <span className="text-[11px] text-[#555]">Week 2-3 focus — build on easy foundation</span>
                </div>
                <TopicTracker items={med} statusMap={statusMap} onToggleStatus={onToggleStatus} color="#f59e0b" showDiff showLeet />
            </div>
        </div>
    );
}
