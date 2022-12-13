import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IoMdPerson } from 'react-icons/io'

function PageHeader() {
    const navigate = useNavigate()

    return (
        <div className='flex flex-row w-[100vw] h-[4vw] py-[1vh] bg-white'>
            <button className='text-[2vw] bg-transparent ml-[10vw] font-medium' onClick={() => { navigate('/main') }}>
                Webdevapp
            </button>
            <div className='ml-auto mr-[5vw] items-center justify-center'>
                <LoginButtons />
            </div>
        </div>
    )
}

export default PageHeader

function LoginButtons() {
    return (
        <div className='flex flex-row text-[14px]'>
            <motion.button className='mr-[1vw] font-medium hover:text-gray-600'>
                Log in
            </motion.button>
            <motion.button className='px-3 py-2 bg-emerald-400 font-bold text-white rounded-lg hover:bg-emerald-300'>
                Sign Up
            </motion.button>
        </div>
    )
}

function AccountButton() {
    return (
        <button className='text-[2vw] m-auto text-white bg-emerald-500 rounded-full h-[3vw] w-[3vw] flex items-center justify-center
         hover:bg-emerald-400 '>
            <IoMdPerson />
        </button>
    )
}