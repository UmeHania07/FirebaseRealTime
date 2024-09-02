import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase, ref, set, get, child, onValue } from 'firebase/database'



//ye Youtube-app2 se configure h
const firebaseConfig = {
  apiKey: "AIzaSyD7jRIN4bEMT6eDLULJ5jU3PnyKJ9zjo4s",
  authDomain: "app2-bf62d.firebaseapp.com",
  databaseURL: "https://app2-bf62d-default-rtdb.firebaseio.com",
  projectId: "app2-bf62d",
  storageBucket: "app2-bf62d.appspot.com",
  messagingSenderId: "564398625354",
  appId: "1:564398625354:web:a4d711e9a93b157f360cb3",
  databaseURL: "https://app2-bf62d-default-rtdb.firebaseio.com/"
};



const FirebaseApp = initializeApp(firebaseConfig)
const FirebaseAuth = getAuth(FirebaseApp)
const Database = getDatabase(FirebaseApp)

const FirebaseContext = createContext(null);

//serif hook kabhi bhi export nhi hota

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

  const [name, setName] = useState("")

  const SignupEandp = (email, password) => {
    return createUserWithEmailAndPassword(FirebaseAuth, email, password)

  }
  //key users hy OR data Haniakhan h
  const putData = (key, data) => set(ref(Database, key), data)

  //realtime database ko get krne k liye hy..ye value get krne k liye hota h 

  //  get(child(ref(Database) , 'grandFather/Father/Child')).then(snapshot => {
  //   console.log(snapshot.val())
  //  })


  useEffect(() => {
    //ye realtime pr changing k liye h k jo bhi change hoga wo automatically apki app mai change ho gaye ga
    //onvalue se hum data changes get krke kisi bhi location pe render kraskhty hn 
    onValue(ref(Database, 'grandFather/Father/Child'), (snapshot) => {
      setName(snapshot.val().name)
      // console.log(snapshot.val())
    })
  }, [])

  return (
    <FirebaseContext.Provider value={{ SignupEandp, putData }}>
      {/* ye ek child component h jo App.js h or osmai sath jitne bhi components h sab ko ye createContext provide hoga */}

      <h1>name is {name}</h1>
      {props.children}
    </FirebaseContext.Provider>
  )

}


