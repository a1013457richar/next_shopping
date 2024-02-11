"use client";

import { TbBracketsAngle } from "react-icons/tb";
import Input from "../../../components/ui/Input";
import { useState, useRef, useEffect } from "react";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createUser } from "../actions/authActions";

const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const session = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  //if logged in, redirect to home
  useEffect(() => {
    if (session.status === "authenticated") {
      toast.success("You are already logged in! Redirecting to home...");
      router.push("/");
    }
  }, [session.status, router]);
  const handleSubmit = async (formData:FormData) => {
    setIsSubmitting(true);
    const result=await createUser(formData)
    console.log("🚀 ~ handleSubmit ~ result:", result)
    
    if(result?.existingUser){
      toast.error(result.existingUser);
      
    }else{
      toast.success("Account created successfully");
      ref.current?.reset();
      router.push("/sign-in");
    }
  }

  return (
    <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-2xl md:outline outline-1 outline-gray-400">
      <div className="px-4 py-8 sm:rounded-lg sm:px-10">
        <div className="md:text-4xl sm:text-2xl mb-5 uppercase w-full text-center flex items-center text-white gap-1 justify-center bg-gray-700 py-4 rounded-md">
          <h1>Join the DT Squad</h1>
          <TbBracketsAngle />
        </div>
        <form 
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
        
        className="space-y-6 mb-3">
          <Input disabled={isSubmitting} id="name" type="text" label="Name" />
          <Input
            disabled={isSubmitting}
            id="email"
            type="email"
            label="Email"
          />
          <Input
            disabled={isSubmitting}
            id="password"
            type="password"
            label="Password"
          />
          <Button type="submit">Create Account</Button>
        </form>
        <Link href={"/sign-in"}>
          <span className="mt-3 hover:underline">
            Already have an account? Sign in &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
