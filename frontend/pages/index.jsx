import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppContext from '../context/AppContext';
import loginRequest from '../services/loginRequest';

export default function Login() {
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const { setUser, user } = useContext(AppContext)
  const router = useRouter()

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem('login'));
  //   if (data.token) {
  //     router.push('/today')
  //   }
  // }, []);

  const login = async (event) => {
    event.preventDefault();
    try {
      const data = await loginRequest(userInput, passInput)
      localStorage.setItem('login', JSON.stringify(data))
      setUser(data)
      router.push('/today')
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className="w-full h-screen bg-gradient-to-b from-black to-gray-400">
        <div className="mx-auto min-h-full flex flex-col justify-center text-center">
          <div className=" w-1/4 rounded-lg p-3 bg-white mx-auto ">
            <h2 className="text-6xl font-sans text-slate-600">Ebytr List</h2>
            <input
              type="text"
              className="outline-none my-6 w-8/12 text-xl rounded-md outline-gray-500 mx-4"
              placeholder='Nickname'
              onChange={ ({ target: { value } }) => setUserInput(value) }
            />
            <input
              type="password"
              className="outline-none mb-6 w-8/12 text-xl rounded-md outline-gray-500 mx-4"
              placeholder='Senha'
              onChange={ ({ target: { value } }) => setPassInput(value) }
            />
            <button
              onClick={(event) => login(event)}
              className="mx-auto block mb-4 bg-slate-700 w-2/6 p-2 rounded text-white cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
  )
}
