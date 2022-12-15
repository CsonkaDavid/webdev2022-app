import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IoMdPerson } from 'react-icons/io'
import { useState } from 'react'
import { LoginModal } from './LoginModal'
import SignUpModal from './SignUpModal'
import { CustomAxios } from '../../script/CustomAxios'

function PageHeader({ customAxios, changeSiteOnLogin, changeSiteOnLogOut }: { customAxios: CustomAxios, changeSiteOnLogin: any, changeSiteOnLogOut: any }) {
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'))
    const [name, setName] = useState(localStorage.getItem('userName'))
    const [loginModalOn, setLoginModalOn] = useState(false)
    const [signUpModalOn, setSignUpModalOn] = useState(false)

    const openLoginModal = () => setLoginModalOn(true)
    const closeLoginModal = () => setLoginModalOn(false)

    const openSignUpModal = () => setSignUpModalOn(true)
    const closeSignUpModal = () => setSignUpModalOn(false)

    const navigate = useNavigate()

    const handleLogOut = () => {
        customAxios.logout(userEmail ? userEmail : '');
        localStorage.setItem('userEmail', '');
        setUserEmail(localStorage.getItem('userEmail'));
        localStorage.setItem('userName', '');
        changeSiteOnLogOut();
    }

    const setNameToCurrent = async () => {
        const currentEmail = localStorage.getItem('userEmail');

        localStorage.setItem('userName', (await customAxios.getUser(currentEmail ? currentEmail : '')).data.name);

        setName(localStorage.getItem('userName'));
    }

    return (
        <div className='flex flex-row w-[100vw] h-[8vh] bg-white'>
            <button className='text-[20px] bg-transparent ml-[10vw] font-medium' onClick={() => { navigate('/main') }}>
                Webdevapp
            </button>
            <div className='ml-auto mr-[3vw] py-auto items-center justify-center'>

                {userEmail ?
                    <AccountButtons logOut={handleLogOut} navigate={navigate}
                        name={name ? name : ''} />
                    :
                    <Buttons openLoginModal={openLoginModal} openSignUpModal={openSignUpModal} />
                }

            </div>

            {loginModalOn &&
                <LoginModal
                    customAxios={customAxios}
                    handleClose={closeLoginModal}
                    handleSwitch={() => { closeLoginModal(); openSignUpModal() }}
                    changeButtons={(email: string, password: string) => {
                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('userPassword', password);
                        setUserEmail(localStorage.getItem('userEmail'));
                        setNameToCurrent();
                        changeSiteOnLogin();
                    }}
                />}

            {signUpModalOn
                && <SignUpModal
                    customAxios={customAxios}
                    handleClose={closeSignUpModal}
                    changeButtons={(email: string, password: string) => {
                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('userPassword', password);
                        setUserEmail(localStorage.getItem('userEmail'));
                        setNameToCurrent();
                        changeSiteOnLogin();
                    }}
                />}
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

function AccountButtons({ logOut, navigate, name }: { logOut: any, name: string, navigate: any }) {
    return (
        <div className='flex flex-row justify-center items-center h-[100%]'>
            <button className='text-[2vw] text-white bg-emerald-500 rounded-full h-[3vw] hover:bg-emerald-400 '
                onClick={() => { navigate('/account') }}
            >
                <div className='flex flex-row items-center justify-center'>
                    <p className='px-[1vw] text-[14px] font-semibold border-r-2'>
                        {name}
                    </p>
                    <div className='px-[1vw]'>
                        <IoMdPerson />
                    </div>
                </div>
            </button>
            <button className='text-[1.5vw] ml-4 font-semibold' onClick={logOut}>
                Log Out
            </button>
        </div>
    )
}