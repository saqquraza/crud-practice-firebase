"use client"

import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    const [userAuth, setUserAuth] = useState<any>({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("hello")
        await createUserWithEmailAndPassword(auth, userAuth.email, userAuth.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Sign In</button>
            </form>
        </>
    )
}

export default SignUp