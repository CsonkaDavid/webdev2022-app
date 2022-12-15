import Modal from './Modal'
import '../../style/ModalForm.css'
import { useState } from 'react'
import { CustomAxios } from '../../script/CustomAxios'

export function LoginModal({ customAxios, handleClose, handleSwitch, changeButtons }
    : { customAxios: CustomAxios, handleClose: any, handleSwitch: any, changeButtons: any }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginFail, setLoginFail] = useState(false)

    const handleSuccessfullLogin = () => {
        handleClose();
        changeButtons(email, password);
    }

    const sendLoginInfo = async () => {
        await customAxios.login(email, password)
            .then(() => {
                handleSuccessfullLogin();
            }).catch(() => {
                setLoginFail(true);
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