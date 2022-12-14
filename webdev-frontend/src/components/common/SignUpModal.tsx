import Modal from './Modal'
import '../../style/ModalForm.css'

function SignUpModal({ handleClose }: { handleClose: any }) {
    return (
        <Modal handleClose={handleClose}>
            <div className='h-[30rem] w-[25rem] m-auto rounded-2xl flex flex-col bg-white'>
                <div className='flex justify-center'>
                    <p className='mt-3 text-2xl mb-5'>
                        Sign Up
                    </p>
                </div>
                <div className='modalForm flex flex-col mx-auto'>
                    <p>
                        E-mail:
                    </p>
                    <input type='text' />
                    <p>
                        First Name:
                    </p>
                    <input type='text' />
                    <p>
                        Last Name:
                    </p>
                    <input type='text' />
                    <p>
                        Password:
                    </p>
                    <input type='text' />

                    <button className='mt-[8vh] mx-auto px-2 py-2 text-md font-semibold rounded-lg bg-emerald-400 w-fit text-white
                    hover:bg-emerald-500'>
                        Sign up
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default SignUpModal