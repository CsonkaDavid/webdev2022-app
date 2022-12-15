import axios, { AxiosError, AxiosResponse } from "axios";

export class CustomAxios {
    private destination: string = 'http://localhost:8888';

    public async getUser(email: string) {
        const data = await axios.get(this.destination + '/user/current',
            {
                params: {
                    email: email
                }
            }
        );

        return data;
    }

    public async login(email: string, password: string) {
        const promise = await axios.post(this.destination + '/user/login',
            null,
            {
                params: {
                    email: email,
                    password: password
                },
                auth: {
                    username: email,
                    password: password
                }
            }
        )

        return promise;
    }

    public logout(email: string) {
        const pass = localStorage.getItem('userPassword')

        axios.post(this.destination + '/user/logout', null, {
            params: {
                email: email
            },
            auth: {
                username: email,
                password: pass ? pass : ''
            }
        })
    }

    public async signUp(email: string, password: string, firstName: string, lastName: string) {
        const promise = await axios.post(this.destination + '/user/register',
            null,
            {
                params: {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                }
            }
        )

        return promise;
    }

    public async addRestaurant(name: string, deliveryPrice: number, categories: string) {

        const pass = localStorage.getItem('userPassword')
        const email = localStorage.getItem('userEmail')

        const promise = await axios.post(this.destination + '/restaurant/add/restaurant',
            null,
            {
                params: {
                    name: name,
                    deliveryPrice: deliveryPrice,
                    categories: categories
                },
                auth: {
                    username: email ? email : '',
                    password: pass ? pass : ''
                }
            }
        )

        return promise;
    }

    public async getRestaurants() {
        const promise = await axios.get(this.destination + '/restaurant/restaurants')

        return promise;
    }

    public async getRestaurantCategories() {
        const promise = await axios.get(this.destination + '/restaurant/categories')

        return promise;
    }
}
