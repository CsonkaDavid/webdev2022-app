import { useEffect, useState } from "react";
import { CustomAxios } from "../../../script/CustomAxios";

function AccountDiv({ customAxios }: { customAxios: CustomAxios }) {
    const [email, setemail] = useState('')
    const [name, setName] = useState('')

    const setData = async () => {
        const currentEmail = localStorage.getItem('userEmail');

        const promise = (await customAxios.getUser(currentEmail ? currentEmail : '')).data;

        setemail(promise.email);
        setName(promise.name);
    }

    useEffect(() => {
        setData();
    }, [])

    return (
        <div className='rounded-lg bg-white w-[85vw] h-[24vh] '>
            <div className='pt-[5vh] px-10'>
                <div className='flex flex-row'>
                    <p>
                        Email:
                    </p>
                    <p className='ml-4 mb-[5vh]'>
                        {email}
                    </p>
                </div>
                <div className='flex flex-row'>
                    <p>
                        Name:
                    </p>
                    <p className='ml-4 mb-[5vh]'>
                        {name}
                    </p>
                </div>
            </div>
        </div >
    );
}

export default AccountDiv