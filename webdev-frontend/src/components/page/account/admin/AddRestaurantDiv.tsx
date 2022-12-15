import React, { useEffect, useState } from 'react'
import { CustomAxios } from '../../../../script/CustomAxios'
import '../../../../style/AddRestaruantDiv.css'

function AddRestaurantDiv({ customAxios }: { customAxios: CustomAxios }) {
    const [categories, setcategories] = useState<{ name: string; }[]>([])
    const [selectedCategories] = useState<string[]>([])
    const [fail, setFail] = useState(false)
    const [success, setSuccess] = useState(false)

    const [name, setname] = useState('')
    const [deliveryPrice, setdeliveryPrice] = useState('')

    const loadCategories = async () => {
        const arr = (await customAxios.getRestaurantCategories()).data

        console.log(arr);

        setcategories(arr);
    }

    useEffect(() => {
        loadCategories();
    }, [])

    const sendRestaurantInfo = async () => {
        const price: number = parseInt(deliveryPrice);

        await customAxios.addRestaurant(name, price, selectedCategories.toString())
            .then(() => {
                setSuccess(true);
                setFail(false);
            }).catch(() => {
                setFail(true);
                setSuccess(false);
            });
    }

    return (
        <div className='rounded-lg bg-white w-[85vw] h-[78vh]'>

            {
                fail ?
                    <div className='text-red-500 text-sm flex items-center justify-center'>
                        <p>
                            Database operation failed!
                        </p>
                    </div>
                    :
                    success ?
                        <div className='text-green-600 text-sm flex items-center justify-center'>
                            <p>
                                Database operation succeded!
                            </p>
                        </div> : null

            }
            <div className='flex items-center'>
                <button className='rounded-lg py-2 px-2 my-2 bg-emerald-400 hover:bg-emerald-500 text-white font-bold mx-auto'
                    onClick={sendRestaurantInfo}
                >
                    Add to database
                </button>
            </div>
            <div className='border-t-4 border-t-slate-300'>
                <div className='add-restaurant-inputs pt-[2vh] ml-[2vw] flex flex-row'>
                    <div className='flex flex-col'>
                        <p>
                            Name:
                        </p>
                        <p>
                            Delivery Price:
                        </p>
                        <p>
                            Categories:
                        </p>
                    </div>

                    <div className='flex flex-col'>
                        <input type='text' onChange={s => setname(s.target.value)} />

                        <input type='text' onChange={s => setdeliveryPrice(s.target.value)} />
                    </div>
                </div>
                <table>
                    <tr>
                        {
                            categories.map((element: any) => {

                                return (
                                    <td key={element.name} className='pr-[1vw] pl-[1vw]'>
                                        <CategoryButton
                                            name={element.name}
                                            addCategory={() => selectedCategories.push(element.name)}
                                            removeCategory={() => {
                                                selectedCategories.splice(selectedCategories.indexOf(element.name), 1);
                                                console.log(selectedCategories)
                                            }} />
                                    </td>
                                );
                            })
                        }
                    </tr>
                </table>
            </div>
        </div>
    )
}

function CategoryButton({ name, addCategory, removeCategory }: { name: string, addCategory: any, removeCategory: any }) {
    const [select, setselect] = useState(false)

    return (
        <button className={`text-sm border-2 shadow-sm shadow-slate-600 rounded-lg px-1 w-[5rem] h-[2rem] hover:border-emerald-400
            ${select ? "bg-emerald-200  border-emerald-300" : "bg-transparent"}`
        } onClick={() => {

            const stateBool = !select;

            setselect(stateBool);

            console.log(stateBool)

            stateBool ? addCategory() : removeCategory();
        }}>
            {name}
        </button>
    )
}

export default AddRestaurantDiv