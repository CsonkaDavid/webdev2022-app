import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IoMdPerson } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { LoginModal } from './LoginModal'
import SignUpModal from './SignUpModal'
import axios, { AxiosResponse } from 'axios'

function PageHeader() {
    const [loggedInState, setloggedInState] = useState(localStorage.getItem('loggedIn'))
    const [loginModalOn, setLoginModalOn] = useState(false)
    const [signUpModalOn, setSignUpModalOn] = useState(false)

    const openLoginModal = () => setLoginModalOn(true)
    const closeLoginModal = () => setLoginModalOn(false)

    const openSignUpModal = () => setSignUpModalOn(true)
    const closeSignUpModal = () => setSignUpModalOn(false)

    const navigate = useNavigate()

    const switchButtons = () => {
        localStorage.setItem('loggedIn', '');
        setloggedInState(localStorage.getItem('loggedIn'));
    }

    const handleLogOut = () => {

        const email = localStorage.getItem('userEmail')
        const password = localStorage.getItem('userPassword')

        console.log(localStorage.getItem('loggedIn') ? 'true' : 'false')

        axios.post('http://localhost:8888/user/logout', null, {
            auth: {
                username: email ? email : "",
                password: password ? password : ""
            }
        })
            .then((res: AxiosResponse) => {
                console.log(res)

                if (res.status == 200) {
                    switchButtons()

                    console.log(localStorage.getItem('loggedIn') ? 'true' : 'false')
                }
            })
    }

    return (
        <div className='flex flex-row w-[100vw] h-[8vh] bg-white'>
            <button className='text-[20px] bg-transparent ml-[10vw] font-medium' onClick={() => { navigate('/main') }}>
                Webdevapp
            </button>
            <div className='ml-auto mr-[5vw] py-auto items-center justify-center'>

                {loggedInState ?
                    <AccountButtons logOut={handleLogOut} />
                    :
                    <Buttons openLoginModal={openLoginModal} openSignUpModal={openSignUpModal} />
                }

            </div>

            {loginModalOn &&
                <LoginModal
                    handleClose={closeLoginModal}
                    handleSwitch={() => { closeLoginModal(); openSignUpModal() }}
                    setLoginState={(s: any) => setloggedInState(s)} />}

            {signUpModalOn && <SignUpModal handleClose={closeSignUpModal} />}
        </div>
    )
}

export default PageHeader

function Buttons({ openLoginModal, openSignUpModal }: { openLoginModal: any, openSignUpModal: any }) {
    return (
        <div className='flex flex-row text-[12px] py-2 justify-center items-center h-[100%]'>
            <motion.button className='mr-[1vw] font-medium hover:text-gray-600' onClick={openLoginModal}>
                Log in
            </motion.button>
            <motion.button className='px-3 py-2 bg-emerald-400 font-bold text-white rounded-lg hover:bg-emerald-300' onClick={openSignUpModal}>
                Sign Up
            </motion.button>
        </div>
    )
}

function AccountButtons({ logOut }: { logOut: any }) {
    return (
        <div className='flex flex-row justify-center items-center h-[100%]'>
            <button className='text-[1.5vw] mr-2 font-semibold' onClick={logOut}>
                Log Out
            </button>

            <button className='text-[2vw] m-auto text-white bg-emerald-500 rounded-full h-[3vw] w-[3vw] flex items-center justify-center
         hover:bg-emerald-400 '>
                <IoMdPerson />
            </button>
        </div>
    )
}