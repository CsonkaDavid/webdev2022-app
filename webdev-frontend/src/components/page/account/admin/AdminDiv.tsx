import { useState } from "react";
import { CustomAxios } from "../../../../script/CustomAxios";
import AddRestaurantDiv from "./AddRestaurantDiv";
import RestaurantsDiv from "./RestaurantsDiv";

function AdminDiv({ customAxios }: { customAxios: CustomAxios }) {
    const [addRestaurant, setaddRestaurant] = useState(false)
    const [restaurants, setrestaurants] = useState(false)

    const showRestaurants = () => {
        setaddRestaurant(false)
        setrestaurants(true)
    }

    const showAddRestaurant = () => {
        setrestaurants(false)
        setaddRestaurant(true)
    }

    return (
        <div>
            <div className='admin-buttons flex flex-row mb-[4vh]'>
                <button onClick={showAddRestaurant}>
                    Add Restaurant
                </button>
                <button onClick={showRestaurants}>
                    Restaurants
                </button>
            </div>
            <div>
                {restaurants ? <RestaurantsDiv customAxios={customAxios} /> : addRestaurant ? <AddRestaurantDiv customAxios={customAxios} /> : null}
            </div>
        </div>
    );
}

export default AdminDiv