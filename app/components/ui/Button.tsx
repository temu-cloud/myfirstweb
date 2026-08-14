import clsx from "clsx";

type ButtonVariant = "primary" | "outline";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
    icon?: React.ReactNode;
    rounded?: boolean;
}
export default function Button({
    children,
    variant = "primary",
    loading,
    disabled, icon, rounded = false, className, ...props }: ButtonProps) {
    const isDisabled = disabled || loading;
    return (

        <button disabled={disabled} {...props} className={clsx(
            `w-full h-12 font-somibold flex items-center justify-center gap-3 cursor-pointer transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 `,
            rounded ? "rounded-full " : "rounded-lg",
            variant === "primary" && "bg-[#02F5A1] text-[#07191E] hover:bg-[#00d98e] active:scale-[0.98] font-semibold", variant === "outline" && "border border-[#02F5A1] bg-transparent text-[#02F5A1] hover:bg-[#02F5A1]/10",
            isDisabled && "opacity-70 cursor-not-allowed", className
        )}>
            {loading ? "Loading..." : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>

    )
}


