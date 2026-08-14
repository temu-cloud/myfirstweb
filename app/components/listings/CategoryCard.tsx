import { IconType } from "react-icons";
import clsx from "clsx";

interface CategoryCardProps {
    label: string;
    icon: IconType;
    selected?: boolean;
    onClick: () => void;
}

export default function CategoryCard({ label, icon: Icon, selected, onClick }: CategoryCardProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                `flex flex-col items-center gap-2 p-4 border-2 rounded-xl text-center transition-all duration-200 cursor-pointer hover:border-[#02F5A1] hover:bg-[#02F5A1]/10`,
                selected
                    ? "border-[#02F5A1] bg-[#02F5A1]/10 text-[#02F5A1]"
                    : "border-[#02F5A1]/20 bg-transparent text-[#02F5A1]/60"
            )}
        >
            <Icon className={clsx("w-8 h-8 transition-colors duration-200", selected ? "text-[#02F5A1]" : "text-[#02F5A1]/50")} />
            <span className={clsx("text-sm font-medium", selected ? "text-[#02F5A1]" : "text-[#02F5A1]/60")}>
                {label}
            </span>
        </div>
    );
}
