export function Bar({ pct, color, h = 5, style = {} }) {
    return (
        <div className="bg-[#16162a] overflow-hidden" style={{ borderRadius: h, height: h, ...style }}>
            <div className="h-full transition-[width] duration-500 ease-out" style={{ width: `${pct}%`, background: color, borderRadius: h }} />
        </div>
    );
}
