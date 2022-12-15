import React, { useEffect, useState } from 'react'
import { CustomAxios } from '../../../../script/CustomAxios'
import { GiCycling } from 'react-icons/gi'

function RestaurantsDiv({ customAxios }: { customAxios: CustomAxios }) {
    const [restaurants, setrestaurants] = useState<{ name: string, deliveryPrice: number, category: string[], products: any[] }[]>([])

    const loadRestaurantData = async () => {
        setrestaurants((await customAxios.getRestaurants()).data);
    }

    useEffect(() => {
        loadRestaurantData();
    }, [])


    return (
        <div className='rounded-lg w-[85vw] h-fit'>
            {
                restaurants.map((element: any) => {
                    return (
                        <div key={element.name} className='pr-[1vw] pl-[1vw] mb-[2vh] text-xs border-2 bg-white border-white rounded-lg shadow-md shadow-slate-500'>
                            <p className='font-bold text-sm'>
                                {element.name}
                            </p>
                            <div className='flex flex-row mt-1 mb-1'>
                                {
                                    element.category.map((element: any) => {
                                        return (
                                            <p className='mr-2 px-1 py-1 shadow-sm shadow-black rounded-lg text-slate-700 font-medium'>
                                                {element.name}
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
                    );
                })
            }
        </div>
    )
}

export default RestaurantsDiv