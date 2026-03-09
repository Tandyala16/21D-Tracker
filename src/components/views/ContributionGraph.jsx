import { useMemo } from 'react';
import { Chip } from '../ui/Chip';

export function ContributionGraph({ streakHistory = [], missionStart }) {
    // Generate the exact 21 dates mathematically starting from missionStart
    const blocks = useMemo(() => {
        const start = missionStart ? new Date(missionStart) : new Date();
        const dates = [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Loop specifically for exactly 21 days
        for (let i = 0; i < 21; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            d.setHours(0, 0, 0, 0);

            // Format match the streakHistory string schema which uses `toDateString()`
            const dateStr = d.toDateString();

            dates.push({
                dayNumber: i + 1,
                dateStr: dateStr,
                isActive: streakHistory.includes(dateStr),
                isFuture: d > today // Gray out dates that haven't happened yet
            });
        }
        return dates;
    }, [streakHistory, missionStart]);

    // Calculate total complete days vs planned days
    const daysLog = blocks.filter(b => b.isActive).length;

    return (
        <div className="bg-[#0e0e1a] border border-[#1e1e2e] rounded-xl p-4 sm:p-[18px] mb-[18px]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                    <div className="font-syne font-extrabold text-[15px] mb-1">21-Day Contribution Timeline</div>
                    <div className="text-[11px] text-[#555]">Historical consistency tracked since Mission Start</div>
                </div>
                <div className="flex gap-2">
                    <Chip text={`${daysLog} Days Active`} color="#10b981" small />
                </div>
            </div>

            {/* Scrolling container for mobile */}
            <div className="overflow-x-auto hide-scrollbar pb-2">
                <div className="flex gap-1.5 min-w-[max-content]">
                    {blocks.map((block) => (
                        <div
                            key={block.dayNumber}
                            title={`Day ${block.dayNumber}: ${block.dateStr}`}
                            className={`w-[26px] h-[26px] sm:w-[32px] sm:h-[32px] rounded-md border flex items-center justify-center text-[10px] font-mono cursor-default transition-all duration-300
                                ${block.isActive ? 'bg-[#10b981] border-[#34d399] text-[#000] font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]' :
                                    block.isFuture ? 'bg-[#0a0a14] border-[#16162a] text-[#333]' :
                                        'bg-[#1a1a2e] border-[#2a2a3a] text-[#555]'}
                            `}
                        >
                            {block.dayNumber}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-3 mt-3 text-[10px] text-[#555] uppercase tracking-[0.5px]">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-[3px] bg-[#1a1a2e] border border-[#2a2a3a]"></div> Missed
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-[3px] bg-[#10b981] border border-[#34d399]"></div> Active
                </div>
            </div>
        </div>
    );
}
