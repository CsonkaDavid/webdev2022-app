import React, { useEffect, useState } from 'react'
import { CustomAxios } from '../../../../script/CustomAxios'
import { GiCycling } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'

function RestaurantsDiv({ customAxios }: { customAxios: CustomAxios }) {
    const [restaurants, setrestaurants] = useState<{ name: string, deliveryPrice: number, category: string[], products: any[] }[]>([])

    const loadRestaurantData = async () => {
        setrestaurants((await customAxios.getRestaurants()).data);
    }

    useEffect(() => {
        loadRestaurantData();
    }, [])

    const deleteRestaurant = async (name: string) => {
        console.log(name);

        ((await customAxios.deleteRestaurant(name)));

        loadRestaurantData();
    }

    return (
        <div className='rounded-lg w-[85vw] h-fit'>
            {
                restaurants.map((element: any) => {

                    const name = element.name;

                    return (
                        <div key={name}
                            className='pr-[1vw] pl-[1vw] mb-[2vh] text-xs border-2 bg-white border-white rounded-lg shadow-md
                         shadow-slate-500 h-[13vh] w-[82vw] flex flex-row justify-center items-center'>
                            <div className='w-[80vw]'>
                                <p className='font-bold text-sm'>
                                    {name}
                                </p>
                                <div className='flex flex-row mt-1 mb-1'>
                                    {
                                        element.category.map((element: any) => {
                                            return (
                                                <p className='mr-2 px-1 py-1 shadow-sm shadow-black rounded-lg text-slate-700 font-medium'>
                                                    {name}
                                                </p>
                                            );
                                        })
                                    }
                                </div>
                                <div className='flex flex-row text-slate-500'>
                                    <div className='mr-1'>
                                        <GiCycling size={'18px'} />
                                    </div>
                                    <p>
                                        {element.deliveryPrice + ' Ft'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button className='text-red-500 border-2 border-white rounded-full px-2 py-2 h-fit w-fit 
                                hover:text-red-600 hover:border-red-500
                                flex items-center justify-center'

                                    onClick={() => deleteRestaurant(name)}>
                                    <ImCross size={'20px'} />
                                </button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default RestaurantsDiv