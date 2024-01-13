"use client"
import { use, useEffect } from 'react';
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user)
        // ...
      } else {
        router.push("/login")
        // User is signed out
        // ...
      }
    });
    
  }, [])

  const signout = async () => {
    signOut(auth).then(() => {
      router.push("/login")
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Hello world</h2>
      <button onClick={signout}>Sign Out</button>
    </main>
  )
}
