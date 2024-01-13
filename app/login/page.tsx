"use client"
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LogIn() {
    const [userAuth, setUserAuth] = useState<any>({
        email: "",
        password: ""
    })
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, userAuth.email, userAuth.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                router.push("/")
                // ...
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });

    }

    return (
        <>
            {/* <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={userAuth.email}
                    onChange={(e) => { setUserAuth({ ...userAuth, email: e.target.value }) }}
                />
                <br />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={userAuth.password}
                    onChange={(e) => { setUserAuth({ ...userAuth, password: e.target.value }) }}
                />
                <button type="submit">Log In</button>
            </form> */}
            <div className='max-w-md mx-auto p-3'>
                <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input type='email' id='email' placeholder='Enter User Email' className='bg-slate-100 p-2 rounded-lg '  />
                    <input type='password' id='password' placeholder='Enter User Password' className='bg-slate-100 p-2 rounded-lg '  />
                    <button  className='bg-slate-600 text-white p-3 rounded-lg uppercase font-semibold hover:opacity-95 disabled:opacity-80'>'loading..' : 'Sign In'</button>

                    <p className='text-red-500 text-center text-lg'>isResp && error.error</p>
                </form>
                <div className='flex gap-2 mt-5'>
                    <p>Dont Have an account?</p>
                </div>
            </div>
        </>
    )
}

export default LogIn