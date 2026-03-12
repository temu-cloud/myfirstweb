"use client";
import Modal from './Modal'
import { useAuthModal } from '../store/useAuthModalSrote';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '../lib/auth-client';

interface LoginValues {
     
    email: string;
    password: string;
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>;


function LoginModal() {
    
    const {  isloginOpen, OpenRegister  , closeLogin } = useAuthModal();
    const [values, setValues] = useState<LoginValues>({
          
            email: "",
            password: ""
        });
    const [errors, setErrors] = useState<LoginErrors>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
   }
const validate = () => {
    const newErrors: LoginErrors = {};

    if (values.email.trim().length < 2) {
        newErrors.email = "Email must be at least 2 characters";
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
            const { error } = await authClient.signIn.email({
                email: values.email,
                password: values.password
            });
            
            if (error) {
                toast.error(error.message || "Registration failed");
                return;
            }
            
            toast.success("Registration successful! Please log in.");
            setValues({
                
                email: "",
                password: ""
            });
            closeLogin();
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    
    const signInWithGoogle = async () => {
        try{
            await authClient.signIn.social({
                provider: "google",
            })
        }catch{
            toast("google sign in failed",{
                style:{
                    background:"red",
                    color:"white"  
                }
            })
        }

    }
  return (
    <Modal title="Login" isOpen={isloginOpen} onclose={closeLogin}>
        <div className="mb-6 space-y-1">
                <h2 className="text-2xl font-somibold text-gray-900 ">well come to temubnb</h2>
                <p className="text-sm text-gray-500">login to an acount </p>

            </div>
             <form action=""
                    onSubmit={handleSubmit}
              className="space-y-4">
                            <Input name="email" label="Email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
                            <Input name="password" label="Password" type="password" value={values.password} onChange={handleChange} error={errors.password} />
                            <Button type="submit" loading={loading} disabled={loading}>Continue</Button>
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-500">or</span>
            
                                </div>
                            </div>
                            <Button variant="outline"
                                    onClick={signInWithGoogle}
                                icon={<FcGoogle size={22} />}
                                type="button">Continue with Google</Button>
                            <p className="text-sm text-center text-gray-500">
                                Already have an account? <span onClick={OpenRegister} className="text-rose-500 cursor-pointer hover:underline">register</span>
                            </p>
                        </form>
    </Modal>

  )
}

export default LoginModal