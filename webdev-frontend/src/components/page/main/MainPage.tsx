import { CustomAxios } from "../../../script/CustomAxios";
import PageHeader from "../../common/PageHeader";

function MainPage() {
    const customAxios = new CustomAxios();

    return (
        <div className='h-[100vh] bg-mainPageFood bg-no-repeat bg-cover'>
            <PageHeader customAxios={customAxios} changeSiteOnLogin={null} changeSiteOnLogOut={null} />
            <div className='flex flex-row w-fit text-black bg-white ml-[8vw] mt-[12vh] rounded-xl px-[2vw] py-[3vw]'>
                <div>
                    <div className='font-medium mb-[15vh] text-[4vw]'>
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
        <div className='w-[42vw] h-[14vh] '>
            <p className='mb-2 text-[2vw] font-semibold '>
                Your Address
            </p>
            <div className='flex flex-row '>

                <input type='text'
                    className='w-[32vw] font-light rounded-lg pl-3 text-black border-gray-500 border-solid border-2
                focus:outline-emerald-500' />

                <button className='text-[1.5vw] rounded-md bg-emerald-500 px-2 py-2 ml-[2vw] text-white font-medium hover:bg-emerald-400'>
                    Delivery
                </button>
            </div>
        </div>
    )
}

export default MainPage