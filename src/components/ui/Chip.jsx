export function Chip({ text, color, small }) {
    return <span className={`rounded-full font-bold whitespace-nowrap border ${small ? 'px-1.5 py-px text-[9px]' : 'px-[9px] py-[2px] text-[10px]'}`} style={{ background: `${color}1a`, color, borderColor: `${color}33` }}>{text}</span>;
}
