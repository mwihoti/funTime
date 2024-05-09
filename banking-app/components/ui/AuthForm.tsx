'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react'
const formSchema = z.object({
    email: z.string().email(),
    Password: z.string().min(4)
  })

const AuthForm = ({type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      Password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    console.log(values)
    setIsLoading(false)
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-1 ">
          <Image 
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">Horizon</h1>
        </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account'
            : type === 'sign-in'
            ? 'Sign In'
        : 'Sign Up'}
        <p className='text-16 font-normal text-gray-600'>
            {user ?
             'Link your account to get started'
            : 'Please enter your details'}
        </p>
            </h1>
        </div>

        </header>
            {user ?(
                <div className="flex flex-col gap-4">
                    {/*plaidLink */}
                    </div>
                    ): (
                        <>
                       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
           <div className='form-item'>
            <FormLabel className='form-label'>
            Email
            </FormLabel>
            <div className='flex w-full flex-col'>
                <FormControl>
                    <input placeholder='Enter your email name' className='input-class p-2' {...field} type="text" />

                </FormControl>
                <FormMessage className='form-message mt-2' />

                
            </div>
           </div>
          )}
        />
          <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
           <div className='form-item'>
            <FormLabel className='form-label'>
            Password
            </FormLabel>
            <div className='flex w-full flex-col'>
                <FormControl>
                    <input placeholder='Password' className='input-class p-2' {...field} type="password"/>

                </FormControl>
                <FormMessage className='form-message mt-2' />

                
            </div>
           </div>
          )}
        />
        <Button className='form-btn' type="submit" disabled={isLoading}>
            {isLoading ? (
                <>
                <Loader2 size={20}
                className="animate-spin" /> &nbsp; Loading...
                </>
            ): type === 'sign-in' ? 
        "Sign In " : "Sign Up"}
        </Button>
      </form>
    </Form>

    <footer className="flex justify-center gap-1">

        <p className='text-14 font-normal text-gray-600'>
            {type === 'sign-in'
            ? "Don't have an account ?"
        : "Already have an account?"}
        </p>
        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
            {type === 'sign-in ' ? 'sign up' : 'sign  in' }

        </Link>
    </footer>
                        </>
                    )}

        </section>
  )
}

export default AuthForm 