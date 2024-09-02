import { useState } from 'react'
import { useFirebase } from './Context/Firebase'
import './App.css';

function App() {

  const firebase = useFirebase();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(firebase)

 const putDataNew = () =>{
   firebase.putData('root/a/b', {id : 1});
   firebase.putData('grandFather/Father/Child', {id : 1 , name: "Hania" , age: 18});

 }

  return (
    <div className="App">
      <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Enter Email Here' />
      <br /><br />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Enter password Here' />
      <br /><br />
      <button onClick={() => {firebase.SignupEandp(email, password)
      firebase.putData('users/' + "HaniaKhan", (email , password))
      }}>SignUp</button>

      <button onClick={putDataNew}>Click Here</button>

    </div>
  );
}

export default App;
