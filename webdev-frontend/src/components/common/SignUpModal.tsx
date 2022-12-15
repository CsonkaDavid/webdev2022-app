import Modal from './Modal'
import '../../style/ModalForm.css'
import { CustomAxios } from '../../script/CustomAxios';
import { useState } from 'react';

function SignUpModal({ customAxios, handleClose, changeButtons }: { customAxios: CustomAxios, handleClose: any, changeButtons: any }) {

    const [signUpFail, setSignUpFail] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleSuccessfullSignUp = () => {
        handleClose();
        changeButtons(email, password);
    }

    const sendSignUpInfo = async () => {
        await customAxios.signUp(email, password, firstName, lastName)
            .then(() => {
                handleSuccessfullSignUp();
            }).catch(() => {
                setSignUpFail(true);
            });
    }

    return (
        <Modal handleClose={handleClose}>
            <div className='h-[30rem] w-[25rem] m-auto rounded-2xl flex flex-col bg-white'>
                <div className='flex justify-center'>
                    <p className='mt-3 text-2xl mb-5'>
                        Sign Up
                    </p>
                </div>
                {signUpFail && <p className=' text-red-600 text-[10px] justify-center flex' > Invalid parameters. Please try again. </p>}
                <div className='modalForm flex flex-col mx-auto'>
                    <p>
                        E-mail:
                    </p>
                    <input type='text' onChange={(content: any) => setEmail(content.target.value)} />
                    <p>
                        First Name:
                    </p>
                    <input type='text' onChange={(content: any) => setFirstName(content.target.value)} />
                    <p>
                        Last Name:
                    </p>
                    <input type='text' onChange={(content: any) => setLastName(content.target.value)} />
                    <p>
                        Password:
                    </p>
                    <input type='password' onChange={(content: any) => setPassword(content.target.value)} />

                    <button className='mt-[8vh] mx-auto px-2 py-2 text-md font-semibold rounded-lg bg-emerald-400 w-fit text-white
                    hover:bg-emerald-500'
                        onClick={sendSignUpInfo}>
                        Sign up
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default SignUpModal