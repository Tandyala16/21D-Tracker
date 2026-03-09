export function Ring({ pct, size = 52, sw = 5, color = "#3b82f6" }) {
    const r = (size - sw * 2) / 2, c = 2 * Math.PI * r;
    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a1a2e" strokeWidth={sw} />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
                    strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c}
                    className="transition-[stroke-dashoffset] duration-500 ease-out" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono font-bold leading-none" style={{ fontSize: size > 60 ? 13 : 10, color }}>{pct}%</span>
            </div>
        </div>
    );
}
