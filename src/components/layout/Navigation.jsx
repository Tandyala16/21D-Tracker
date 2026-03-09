import { Link, useLocation } from "react-router-dom";

const NAV = [
    { v: "/", l: "⌂ Home", short: "Home" },
    { v: "/hourly", l: "⏱ Today", short: "Today" },
    { v: "/aptitude", l: "🧮 Aptitude", short: "Apt" },
    { v: "/dsa", l: "🧩 DSA", short: "DSA" },
    { v: "/cs", l: "📚 Core CS", short: "CS" },
    { v: "/weekly", l: "📅 Weekly", short: "KPIs" },
];

export function Navigation({ headerPct, streak, elapsedDays }) {
    const location = useLocation();

    return (
        <div className="bg-[#0a0a14] border-b border-[#16162a] px-3 sm:px-4 h-[54px] flex items-center justify-between sticky top-0 z-[100] gap-2">
            <div className="flex items-center gap-2 shrink-0">
                <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-[15px]">🎯</div>
                <div className="hidden sm:block">
                    <div className="font-syne font-extrabold text-xs tracking-[-0.2px] leading-[1.2]">DAY {Math.min(21, elapsedDays || 1)} / 21 MISSION</div>
                    <div className="text-[9px] text-[#444]">Vasanthkumar · SE · 8-12 LPA</div>
                </div>
            </div>
            <div className="flex gap-1 overflow-x-auto hide-scrollbar flex-1 items-center max-w-[600px]">
                {NAV.map(n => {
                    const isActive = location.pathname === n.v;
                    return (
                        <Link
                            key={n.v}
                            to={n.v}
                            className={`inline-block whitespace-nowrap px-2.5 sm:px-[11px] py-1.5 sm:py-[6px] rounded-lg text-[10px] sm:text-[11px] font-bold border transition-all duration-150 ${isActive ? 'border-[#3b82f6] bg-[#3b82f611] text-[#3b82f6]' : 'border-[#1a1a2a] bg-transparent text-[#555]'}`}
                        >
                            <span className="sm:hidden">{n.short}</span>
                            <span className="hidden sm:inline">{n.l}</span>
                        </Link>
                    )
                })}
            </div>
            <div className="flex items-center gap-3 shrink-0">
                {streak && streak.current > 0 && (
                    <div className="flex items-center gap-1 bg-[#ff450015] border border-[#ff450033] px-2 py-1 rounded-md">
                        <span className="text-[12px]">🔥</span>
                        <span className="text-[#ff4500] font-bold text-[11px]">{streak.current}</span>
                    </div>
                )}
                <div className="text-right flex items-center gap-3">
                    <div>
                        <div className="hidden sm:block text-[9px] text-[#444]">OVERALL</div>
                        <div className="font-mono text-xs sm:text-sm font-bold text-[#3b82f6]">
                            {headerPct}%
                        </div>
                    </div>
                    <Link to="/settings" className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-[#1a1a2a] text-[#888] hover:text-[#fff] transition-colors border border-[#333344] hover:border-[#555577]">
                        ⚙️
                    </Link>
                </div>
            </div>
        </div>
    );
}
