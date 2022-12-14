import Modal from './Modal'
import '../../style/ModalForm.css'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

export function LoginModal({ handleClose, handleSwitch, setLoginState }: { handleClose: any, handleSwitch: any, setLoginState: any }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginFail, setLoginFail] = useState(false)

    const sendLoginInfo = () => {
        console.log(email)
        console.log(password)

        axios.post('http://localhost:8888/user/login',
            null,
            {
                params: {
                    email: email,
                    password: password
                },
                auth: {
                    username: email,
                    password: password
                }
            }
        )
            .then((res: AxiosResponse) => {
                if (res.status == 200) {
                    handleClose()
                    localStorage.setItem('loggedIn', res.data)
                    setLoginState(localStorage.getItem('loggedIn'))
                    localStorage.setItem('userEmail', email)
                    localStorage.setItem('userPassword', password)
                }
            })
            .catch(() => {
                setLoginFail(true)
            });
    }

    return (
        <Modal handleClose={handleClose}>
            <div className='h-[20rem] w-[20rem] m-auto rounded-2xl flex flex-col bg-white'>
                <div className='flex justify-center'>
                    <p className='mt-3 text-2xl mb-5'>
                        Log In
                    </p>
                </div>

                {loginFail && <p className=' text-red-600 text-[10px] justify-center flex' > Invalid parameters. Please try again. </p>}

                <div className='modalForm flex flex-col mx-auto'>
                    <p>
                        E-mail:
                    </p>
                    <input type='text' onChange={content => setEmail(content.target.value)} />
                    <p>
                        Password:
                    </p>
                    <input type='password' onChange={content => setPassword(content.target.value)} />

                    <button className='mt-3 mx-auto px-2 py-1 text-sm font-semibold rounded-lg bg-emerald-400 w-fit text-white
                    hover:bg-emerald-500'
                        onClick={sendLoginInfo}
                    >
                        Log In
                    </button>
                </div>
                <div className='flex flex-row items-center mx-auto mt-5'>
                    <p className='text-[10px] text-slate-600'>
                        Don't have an account yet? Sign up here:
                    </p>
                    <button className='ml-4 px-1 py-1 text-[12px] font-semibold rounded-lg bg-emerald-400 w-fit text-white
                    hover:bg-emerald-500'
                        onClick={handleSwitch}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </Modal>
    )
}