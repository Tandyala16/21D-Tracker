export function Checkbox({ checked, onChange, color = "#3b82f6", size = 18 }) {
    return (
        <div onClick={onChange} className="flex items-center justify-center cursor-pointer transition-all duration-150 shrink-0 border-2 rounded" style={{ width: size, height: size, minWidth: size, borderColor: checked ? color : "#333", background: checked ? color : "transparent" }}>
            {checked && <svg width="10" height="7" viewBox="0 0 10 7"><path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>}
        </div>
    );
}
