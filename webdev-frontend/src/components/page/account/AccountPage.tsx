import { CustomAxios } from '../../../script/CustomAxios';
import PageHeader from '../../common/PageHeader'
import '../../../style/AccountPage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDiv from './admin/AdminDiv';
import AccountDiv from './AccountDiv';

function AccountPage() {
    const [isAdmin, setisAdmin] = useState(false)
    const [accountDiv, setAccountDiv] = useState(false)
    const [adminDiv, setAdminDiv] = useState(false)

    const customAxios = new CustomAxios();

    const navigate = useNavigate()

    const isUserAdmin = async () => {
        const userEmail = localStorage.getItem('userEmail');

        const role = (await customAxios.getUser(userEmail ? userEmail : '')).data.role

        if (role == 'ADMIN') setisAdmin(true);
    }

    useEffect(() => {
        isUserAdmin();
        showAccountDiv();
    }, [])

    const handleLogOut = () => {
        navigate('/main');
    }

    const showAccountDiv = () => {
        setAdminDiv(false);
        setAccountDiv(true);
    }

    const showAdminDiv = () => {
        setAccountDiv(false);
        setAdminDiv(true);
    }

    return (
        <div>
            <PageHeader customAxios={customAxios} changeSiteOnLogin={null} changeSiteOnLogOut={handleLogOut} />
            <div className='w-[100vw] bg-slate-300 flex flex-row'>
                <div className='h-[92vh] w-[10vw] border-r-[1px] pt-[4vh] bg-white'>
                    <table className='accountTable'>
                        <tr>
                            <td>
                                <button onClick={showAccountDiv}>
                                    Account
                                </button>
                            </td>
                        </tr>
                        {
                            isAdmin ?
                                <tr>
                                    <td>
                                        <button onClick={showAdminDiv}>
                                            Admin
                                        </button>
                                    </td>
                                </tr>
                                : null
                        }
                    </table>
                </div>
                <div className='ml-[2vw] mt-[2vh]'>
                    {accountDiv ? <AccountDiv customAxios={customAxios} /> :
                        adminDiv ? <AdminDiv customAxios={customAxios} /> : null}
                </div>
            </div>
        </div >
    )
}

export default AccountPage