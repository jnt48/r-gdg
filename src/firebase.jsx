import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {getAuth,onAuthStateChanged} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { useState,useEffect } from "react";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSCK2TpoWOi-SgjpoXmVgj69s5xi8Q2Io",
  authDomain: "r-task-95497.firebaseapp.com",
  databaseURL: "https://r-task-95497-default-rtdb.firebaseio.com",
  projectId: "r-task-95497",
  storageBucket: "r-task-95497.appspot.com",
  messagingSenderId: "157247388048",
  appId: "1:157247388048:web:8c3ff1b1f16a06bf27db15"
  };

const firebaseContext=createContext();
export const useFirebase=()=>useContext(firebaseContext);

export function FirebaseProvider(props){
    const [user,setUser]=useState([]);
        
        useEffect(()=>{
           const unsub= onAuthStateChanged(auth,(user)=>{
                setUser(user)
            })

            return()=>{
                unsub();
            }
        },[])

    return(<>
    <firebaseContext.Provider value={{user}}>
        {props.children}
    </firebaseContext.Provider>
    </>)
}
  
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db =getFirestore();
export const storage=getStorage(app);