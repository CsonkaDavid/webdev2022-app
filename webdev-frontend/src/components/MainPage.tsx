import PageHeader from './common/PageHeader'

function MainPage() {
    return (
        <div className='h-[100vh] bg-mainPageFood bg-no-repeat bg-cover'>
            <PageHeader />
            <div className='flex flex-row w-fit text-black bg-white ml-[8vw] mt-[8vw] rounded-xl px-[2vw] py-[3vw]'>
                <div>
                    <div className='font-medium mb-[15vh] text-[3vw]'>
                        <p className='mb-[3vw]'>
                            Please don't order!
                        </p>
                        <p>
                            Thank you! :)
                        </p>
                    </div>
                    <div>
                        <AddressSection />
                    </div>
                </div>
            </div>
        </div>
    )
}

function AddressSection() {
    return (
        <div className='w-fit h-fit '>
            <p className='mb-3 text-md font-semibold '>
                Your Address
            </p>
            <div className='flex flex-row '>
                <input type='text' className='w-96 font-light rounded-lg pl-3 focus:outline-emerald-500 text-black border-gray-500 border-solid border-2' />
                <button className=' rounded-md bg-emerald-500 px-2 py-2 ml-10 text-white font-medium hover:bg-emerald-400'>
                    Delivery
                </button>
            </div>
        </div>
    )
}

export default MainPage