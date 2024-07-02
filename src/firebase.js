import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCC23vsfrd2jkprWexVXK9OWkOUubEIzDE",
  authDomain: "netflix-clone-ab5b6.firebaseapp.com",
  projectId: "netflix-clone-ab5b6",
  storageBucket: "netflix-clone-ab5b6.appspot.com",
  messagingSenderId: "203026742434",
  appId: "1:203026742434:web:241a1306bb895bda816bfb"
};


const app = initializeApp(firebaseConfig)
const auth= getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password)=>{
    try {
     const res = await createUserWithEmailAndPassword(auth,email,password)
     const user = res.user
     await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider: "local",
        email,
     })
    } catch (error) {
       console.log(error) 
       toast.error(error.code.split('/')[1].split('-').join(" "))
    }

}

const login=async(email,password)=>{
    try {
    await  signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
       console.log(error) 
       toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout =()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout}