import { create } from "zustand";
interface AuthModalStore{
    isloginOpen:boolean;
    isRegisterOpen:boolean;
    OpenLogin:()=>void;
    OpenRegister:()=>void;
    closeLogin:()=>void;
    closeRegister:()=>void;
    closeAll:()=>void;

}
export const useAuthModal=create<AuthModalStore>((set)=>({
    isloginOpen:false,
    isRegisterOpen:false,
    OpenLogin:()=>set({isloginOpen:true,isRegisterOpen:false}),
    closeLogin:()=>set({isloginOpen:false}),
    OpenRegister:()=>set({isloginOpen:false,isRegisterOpen:true}),
    closeRegister:()=>set({isRegisterOpen:false}),
    closeAll:()=>set({isloginOpen:false,isRegisterOpen:false})

}))