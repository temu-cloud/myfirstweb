import { LuX } from "react-icons/lu";


interface ModalProps{
    isOpen:boolean;
    onclose:()=>void;
    title:string;
    children:React.ReactNode;
}
export default function Modal({isOpen,onclose,title,children}:ModalProps) {
    return(
        <div aria-hidden={isOpen} className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-500
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div onClick={onclose} className={`absolute inset-0 bg-black/30 transition-all duration-500 ${isOpen ? "opacity-100 ":"opacity-0"}`}/>
        <div className={`relative z-10 w-full max-w-lg rounded-2xl bg-[#07191E] border border-[#02F5A1]/20 shadow-2xl transform transition-all duration-500 
        ${isOpen ? "transition-y-0 opacity-100 ": "translate-full opacity-0"} `}>
            <div className="flex items-center justify-between py-4 px-6  border-b border-[#02F5A1]/20">
                <h2 className="text-lg font-semibold text-[#02F5A1]">{title}</h2>
                <button arial-label="close modal" onClick={onclose} className="p-2 rounded-full hover:bg-[#02F5A1]/10 transiton cursor-pointer text-[#02F5A1]">
                  <LuX size={18}/>
                </button>

            </div>
        <div className="p-6">
            {children}
        </div>
        </div>
        </div>
    )
}