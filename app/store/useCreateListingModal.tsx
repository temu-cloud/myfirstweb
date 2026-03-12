import { create } from "zustand";

interface CreateListingModelStore{
    isOpen:boolean;
    open:()=>void;
    close:()=>void;
}

export const useCreateListingModal=create<CreateListingModelStore>((set)=>({
    isOpen:false,
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false})
}))