import { motion } from 'framer-motion'

function Backdrop({ children, onClick }: { children: any, onClick: any }) {
    return (
        <motion.div className='w-[100%] h-[100%] bg-slate-800 bg-opacity-90 absolute top-0 left-0 items-center justify-center flex'
            onClick={() => { onClick() }}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

export default Backdrop