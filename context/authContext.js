import { Children, createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth, db} from '../firebaseConfig'
import {doc, setDoc , getDoc, updateDoc, arrayUnion , arrayRemove} from 'firebase/firestore'


export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{

    const [user , setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub;
    },[])


    const updateUserData = async(userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username: data.username, userId: data.userId, email:data.email})
        }
    }

    const login = async(email, password)=>{
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success:true}
        } catch (e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg="Invalid Email";
            if(msg.includes('(auth/invalid-credential)')) msg="Invalid Credentials";
            return {success: false, msg};
        }
    }

    const logout = async()=>{
        try {
            await signOut(auth);
            return {success:true}
        } catch (e) {
            return {success: false, msg: e.message, error:e}
        }
    }

    const register = async(email, password,username)=>{
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log('respose.user = ' , response?.user)
            await setDoc(doc(db,"users", response?.user?.uid),{
                username,
                email,
                weight : {
                    date: "0",
                    weight: "0"
                },
                sugar : {
                    date: "0",
                    sugar: "0"
                },
                pressure: {
                    date: "0",
                    pressure: "0"
                },
                stepdata: 0,
                userId: response?.user?.uid
            });
            return {success: true,data: response?.user}
        } catch (e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg="Invalid Email";
            if(msg.includes('(auth/email-already-in-use)')) msg="This email is already in use"
            if(msg.includes('(auth/weak-password)')) msg="Password should be at least 6 characters"
            return {success: false, msg};
        }
    }

    const weightsInput = async (value,userId)=>{
        try {
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const wdata = data.weight;
            if(wdata.length > 6){
                await updateDoc(docRef, {
                    "weight": arrayRemove(wdata[0]), 
                })
            }
            await updateDoc(docRef, {
                "weight" :  arrayUnion(value)
            });
            return {success: true,value}
        } catch (e) {
            let msg = e.message;
            return {success: false, msg};
        }
    }

    const getWeights = async(userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const data = docSnap.data();
            const wdata = data.weight;
            const wdate = [];
            const w =[];
            wdata.forEach(element => {
                wdate.push(element.date)
                w.push(element.weight)
            });
            return {wdate,w}
        }
        
    }

    const SugarInput = async (value,userId)=>{
        try {
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const sugardata = data.sugar;
            if(sugardata.length > 6){
                await updateDoc(docRef, {
                    "sugar": arrayRemove(sugardata[0]), 
                })
            }
            await updateDoc(docRef, {
                "sugar" :  arrayUnion(value)
            });
            return {success: true,value}
        } catch (e) {
            let msg = e.message;
            return {success: false, msg};
        }
    }

    const getSugar = async(userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const data = docSnap.data();
            const sugardata = data.sugar;
            const sugardate = [];
            const sugar =[];
            sugardata.forEach(element => {
                sugardate.push(element.date)
                sugar.push(element.sugar)
            });
            return {sugardate,sugar}
        }
        
    }

    const PressureInput = async (value,userId)=>{
        try {
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const pressuredata = data.pressure;
            if(pressuredata.length > 6){
                await updateDoc(docRef, {
                    "pressure": arrayRemove(pressuredata[0]), 
                })
            }
            await updateDoc(docRef, {
                "pressure" :  arrayUnion(value)
            });
            return {success: true,value}
        } catch (e) {
            let msg = e.message;
            return {success: false, msg};
        }
    }

    const getPressure = async(userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const data = docSnap.data();
            const pressuredata = data.pressure;
            const pressuredate = [];
            const pressure =[];
            pressuredata.forEach(element => {
                pressuredate.push(element.date)
                pressure.push(element.pressure)
            });
            return {pressuredate,pressure}
        }
        
    }


    const setStep = async (value,userId)=>{
        try {
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const sdata = data.stepdata;
            await updateDoc(docRef, {
                "stepdata": value, 
            })
            return {success: true,value}
        } catch (e) {
            let msg = e.message;
            return {success: false, msg};
        }
    }

    const getStep = async (userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const data = docSnap.data();
            const sdata = data.stepData;
            console.log(sdata)
            return sdata
        }
        
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register,weightsInput,getWeights,setStep,getStep,SugarInput,getSugar,PressureInput,getPressure}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth =()=>{
    const value = useContext(AuthContext)

    if(!value){
        throw new Error("useauth not wrapped")
    }
    return value;
}