import { motion } from "framer-motion"
import Backdrop from "./Backdrop"

function Modal({ handleClose, children }: { handleClose: any, children: any }) {

    const dropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0,
        },
        visible: {
            y: '0',
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 30,
                stiffness: 500
            }
        },
        exit: {
            y: '-100vh',
            opacity: 0,
        },
    }

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                {children}
            </motion.div>
        </Backdrop>
    )
}

export default Modal