import { LuMinus, LuPlus } from "react-icons/lu";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

function Counter({ title, subtitle, value, onChange, min = 1, max = 20 }: CounterProps) {
    const increase = () => { if (value < max) onChange(value + 1) }
    const decrease = () => { if (value > min) onChange(value - 1) }
    const sharedClasses = "w-8 h-8 rounded-full border border-[#02F5A1]/40 text-[#02F5A1] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#02F5A1] transition"
    return (
        <div className="flex items-center justify-between py-8 border-b border-[#02F5A1]/10 last:border-b-0 gap-8">
            <div>
                <p className="font-medium text-[#02F5A1]">{title}</p>
                <p className="text-sm text-[#02F5A1]/60">{subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
                <button className={sharedClasses} onClick={decrease} disabled={value === min}>
                    <LuMinus size={16} />
                </button>
                <span className="w-6 text-center font-medium text-[#02F5A1]">{value}</span>
                <button className={sharedClasses} onClick={increase} disabled={value === max}>
                    <LuPlus size={16} />
                </button>
            </div>
        </div>
    )
}

export default Counter
