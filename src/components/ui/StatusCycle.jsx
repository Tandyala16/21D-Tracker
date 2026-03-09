import { STATUS_COLORS, STATUS_LABELS } from "../../constants/data";

export function StatusCycle({ status, onChange }) {
    return (
        <div onClick={onChange} className="px-2.5 py-[3px] rounded-full text-[10px] font-bold cursor-pointer transition-all duration-150 whitespace-nowrap border" style={{ background: STATUS_COLORS[status], color: status === 0 ? "#555" : "#000", borderColor: STATUS_COLORS[status] }}>
            {STATUS_LABELS[status]}
        </div>
    );
}
