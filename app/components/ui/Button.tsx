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
            `w-full h-12 font-somibold flex items-center justify-center gap-3 cursor-pointer transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus_visible:ring-offset-2 `,
            rounded ? "rounded-full " : "rounded-lg",
            variant === "primary" && "bg-linear-to-r from-rose-500 to-pink-500 text-white hover:form-rose-600 hover:to-pink-600 active:scale-[0.98]", variant === "outline" && "border border-gray-300 bg-white hover:bg-gray-100",
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


