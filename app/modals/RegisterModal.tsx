"use client";
 
import { FcGoogle } from "react-icons/fc";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuthModal } from "../store/useAuthModalSrote";
import Modal from "./Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
 
interface RegisterValues {
    name: string;
    email: string;
    password: string;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

export default function RegisterModal() {
    const { isRegisterOpen, closeRegister, OpenLogin } = useAuthModal();
    const [values, setValues] = useState<RegisterValues>({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<RegisterErrors>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    const validate = () => {
        const newErrors: RegisterErrors = {};
        if (!values.name.trim()) {
            newErrors.name = "Name is required";
        } else if (values.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }
        if (!values.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!values.password.trim()) {
            newErrors.password = "Password is required";
        } else if (values.password.trim().length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        setLoading(true);
        try {
            const { error } = await authClient.signUp.email({
                name: values.name,
                email: values.email,
                password: values.password
            });
            
            if (error) {
                toast.error(error.message || "Registration failed");
                return;
            }
            
            toast.success("Registration successful! Please log in.");
            setValues({
                name: "",
                email: "",
                password: ""
            });
            closeRegister();
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <Modal title="Register" isOpen={isRegisterOpen} onclose={closeRegister}>
            <div className="mb-6 space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">Welcome to Temubnb</h2>
                <p className="text-sm text-gray-500">Create an account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                    name="name" 
                    label="Name" 
                    type="text" 
                    value={values.name}
                    error={errors.name}
                    onChange={handleChange} 
                    disabled={loading}
                />
                <Input 
                    name="email" 
                    label="Email" 
                    type="email" 
                    value={values.email} 
                    error={errors.email} 
                    onChange={handleChange}
                    disabled={loading}
                />
                <Input 
                    name="password" 
                    label="Password" 
                    type="password" 
                    value={values.password} 
                    error={errors.password} 
                    onChange={handleChange}
                    disabled={loading}
                />
                <Button disabled={loading} loading={loading} type="submit">
                    Continue
                </Button>
                
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                </div>
                
                <Button variant="outline" icon={<FcGoogle size={22} />} type="button">
                    Continue with Google
                </Button>
                
                <p className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <span onClick={OpenLogin} className="text-rose-500 cursor-pointer hover:underline">
                        Log in
                    </span>
                </p>
            </form>
        </Modal>
    )
}