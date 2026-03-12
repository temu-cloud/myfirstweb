import { IconType } from "react-icons";
import clsx from "clsx";

interface CategoryCardProps {
    label: string;
    icon: IconType;
    selected?: boolean;
    onClick: () => void;
}

export default function CategoryCard({
    label, 
    icon: Icon, 
    selected, 
    onClick
}: CategoryCardProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                `
                flex 
                flex-col
                items-center
                gap-2 
                p-4 
                border-2 
                rounded-xl 
                text-center 
                transition-all 
                duration-200 
                cursor-pointer
                hover:border-rose-500
                hover:bg-rose-50
                `,
                selected 
                    ? "border-rose-500 bg-rose-50 text-rose-600" 
                    : "border-gray-200 bg-white text-gray-700"
            )}
        >
            <Icon className={clsx(
                "w-8 h-8 transition-colors duration-200",
                selected ? "text-rose-500" : "text-gray-500"
            )} />
            <span className={clsx(
                "text-sm font-medium",
                selected ? "text-rose-600" : "text-gray-700"
            )}>
                {label}
            </span>
        </div>
    );
}