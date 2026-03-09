import { Ring } from "../ui/Ring";
import { Chip } from "../ui/Chip";
import { Bar } from "../ui/Bar";
import { StatusCycle } from "../ui/StatusCycle";

export function TopicTracker({ items, statusMap, onToggleStatus, color, showDiff, showLeet }) {
    const total = items.length;
    const mastered = items.filter(t => statusMap[t.id] === 2).length;
    const inprog = items.filter(t => statusMap[t.id] === 1).length;
    const pct = Math.round(mastered / total * 100) || 0;

    return (
        <div>
            <div className="flex items-center gap-3 mb-[14px]">
                <Ring pct={pct} size={46} sw={4} color={color} />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Chip text={`${mastered}/${total} Mastered`} color={color} />
                        {inprog > 0 && <Chip text={`${inprog} In Progress`} color="#f59e0b" />}
                    </div>
                    <Bar pct={pct} color={color} h={4} />
                </div>
            </div>
            <div className="grid gap-1.5">
                {items.map(item => {
                    const st = statusMap[item.id] || 0;
                    return (
                        <div key={item.id} className="flex sm:items-center items-start gap-2.5 px-2.5 sm:px-3 py-2.5 rounded-[10px] transition-all duration-150 border flex-col sm:flex-row" style={{ background: `${color}08`, borderColor: st === 2 ? color + "33" : st === 1 ? "#f59e0b33" : "#1e1e2e" }}>
                            <div className="flex-1 min-w-0 w-full">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className={`font-syne text-[12px] sm:text-[13px] font-bold ${st === 2 ? 'text-[#555] line-through' : 'text-[#e0e0f0]'}`}>{item.topic}</span>
                                    {showDiff && <Chip text={item.diff} color={item.diff === "Easy" ? "#10b981" : "#f59e0b"} small />}
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-[#555] leading-[1.5]">{item.sub}</div>
                                {showLeet && item.lc && <div className="text-[10px] text-[#3b82f6] mt-1 italic">LC: {item.lc}</div>}
                            </div>
                            <div className="self-end sm:self-auto mt-1 sm:mt-0">
                                <StatusCycle status={st} onChange={() => onToggleStatus(item.id)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
