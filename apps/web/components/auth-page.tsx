"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignUpSchema } from "@repo/common/types";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HTTP_BACKEND_URL } from "../config";
import Logo from "./logo";

type SignInProps = z.infer<typeof SignInSchema>;
type SignUpProps = z.infer<typeof SignUpSchema>;

export default function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SignInProps | SignUpProps>({
    resolver: zodResolver(isSignin ? SignInSchema : SignUpSchema),
  });

  const onSubmit = async (data: SignInProps | SignUpProps) => {
    try {
      const response = await axios.post(
        `${HTTP_BACKEND_URL}/api/v1/auth/${isSignin ? "signin" : "signup"}`,
        data,
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/room");
      }
      reset();
    } catch (error) {
      console.log(error);
      reset();
    }
  };
  return (
    <div className='bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 w-screen h-screen flex items-center justify-center'>
      <div className='p-9 m-2 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amethyst-500/45 rounded-xl w-full max-w-md'>
        <div className='flex flex-col items-start'>
          <Logo />
          <h1 className='text-2xl font-semibold text-amethyst-200'>Welcome!</h1>
          <p className='text-gray-400 text-center text-sm mb-6'>
            Start Creating Amazing Diagrams.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {!isSignin && (
            <Input {...register("name")} placeholder='Name' type='text' />
          )}
          <Input
            {...register("email")}
            placeholder='Enter your email'
            type='text'
          />
          <div className='relative'>
            <Input
              {...register("password")}
              placeholder='Enter your password'
              type={showPassword ? "text" : "password"}
            />
            <div className='absolute right-4 bottom-0 -translate-y-1/2 text-gray-400 hover:text-royal-blue-700 transition-colors'>
              {showPassword ? (
                <div
                  role='button'
                  onClick={() => setShowPassword(false)}
                  className='h-6 w-6'
                >
                  <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      clipRule='evenodd'
                      d='M16 16H13L10.8368 13.3376C9.96488 13.7682 8.99592 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8L3.07945 4.30466C3.14989 4.22013 3.22229 4.13767 3.29656 4.05731L0 0H3L16 16ZM8.84053 10.8807L5.35254 6.58774C5.12755 7.00862 5 7.48941 5 8C5 9.65685 6.34315 11 8 11C8.29178 11 8.57383 10.9583 8.84053 10.8807Z'
                      fill='currentColor'
                      fillRule='evenodd'
                    />
                    <path
                      d='M16 8L14.2278 10.1266L7.63351 2.01048C7.75518 2.00351 7.87739 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8Z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
              ) : (
                <div
                  role='button'
                  onClick={() => setShowPassword(true)}
                  className='h-6 w-6'
                >
                  <svg
                    viewBox='0 0 24 24'
                    version='1.2'
                    baseProfile='tiny'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M21.821 12.43c-.083-.119-2.062-2.944-4.793-4.875-1.416-1.003-3.202-1.555-5.028-1.555-1.825 0-3.611.552-5.03 1.555-2.731 1.931-4.708 4.756-4.791 4.875-.238.343-.238.798 0 1.141.083.119 2.06 2.944 4.791 4.875 1.419 1.002 3.205 1.554 5.03 1.554 1.826 0 3.612-.552 5.028-1.555 2.731-1.931 4.71-4.756 4.793-4.875.239-.342.239-.798 0-1.14zm-9.821 4.07c-1.934 0-3.5-1.57-3.5-3.5 0-1.934 1.566-3.5 3.5-3.5 1.93 0 3.5 1.566 3.5 3.5 0 1.93-1.57 3.5-3.5 3.5zM14 13c0 1.102-.898 2-2 2-1.105 0-2-.898-2-2 0-1.105.895-2 2-2 1.102 0 2 .895 2 2z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <Button disabled={isSubmitting} className='w-full'>
            {isSubmitting && (
              <span className='spinner-border spinner-border-sm mr-1'></span>
            )}
            {isSignin ? "Sign In" : "Sign Up"}
          </Button>

          <p className='text-gray-400'>
            Don&apos;t have an account?{" "}
            {isSignin ? (
              <Link
                href='/auth/signup'
                className='text-amethyst-300 hover:text-royal-blue-400 transition-colors'
              >
                Sign up
              </Link>
            ) : (
              <Link
                href='/auth/signin'
                className='text-royal-amethyst-300 hover:text-royal-blue-400 transition-colors'
              >
                Sign in
              </Link>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
