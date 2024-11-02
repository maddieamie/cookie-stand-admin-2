import Head from 'next/head';
import { useAuth } from '../contexts/auth';
import useResource from '../hooks/useResource';

export default function Home() {

    const { user, login } = useAuth();

    return (
        <div className="p-4">
            <Head>
                <title>Cookie Stand Admin</title>
            </Head>
            
            {user ?
                <>
                    
                    <CookieStandAdmin user={user}/>
                </>
                :
                <LoginForm onLogin={login} />
            }

        </div>
    );
}


function CookieStandAdmin() {

    const { resources, deleteResource } = useResource();
    const { user } = useAuth();

    return (
        <>
        <header className="flex items-center justify-between p-4 text-black bg-green-500">
            <h1 className="text-3xl">Cookie Stand Admin</h1>
            <button className="p-2 bg-white rounded text-black-500">Overview</button>
            <h3 classname="p-2 bg-white rounded text-black-500">{user.username}</h3>
        </header>
        <div className="p-8">
        
            <CookieStandForm />
            <CookieStandTable stands={resources || []} deleteStand={deleteResource} />
        </div>
        <footer className="p-4 text-center text-white bg-green-500">
        <p> Locations World Wide</p>
        <p>©2024 - Lab prompts from CodeFellows</p>
      </footer>  
        </>
    );
}

function CookieStandForm() {

    const { user } = useAuth();
    const { createResource } = useResource();

    function handleSubmit(event) {
        event.preventDefault();
        const info = {
            location: event.target.location.value,
            minimum_customers_per_hour: parseInt(event.target.minimum.value),
            maximum_customers_per_hour: parseInt(event.target.maximum.value),
            average_cookies_per_sale: parseFloat(event.target.average.value),
            owner: user.id,
            hourly_sales: [],
        };
        createResource(info);

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-2/3 gap-2 p-4 mx-auto bg-green-300 border-green-500 rounded-lg">
           
                <div className="flex py-4">
                <label className="mr-2" htmlFor="location">ADD LOCATION</label>
                <input className="flex-auto pl-2 placeholder-gray-50" type="text" name="location" />
                <button className="flex-1 min-w-0 bg-green-500">CREATE STAND</button>
                </div>
                
                <div className="flex gap-2 text-center item-centereduce">
                <fieldset className="flex flex-col flex-1 min-w-0 p-2 bg-green-200">
                <label htmlFor="minimum">MINIMUM CUSTOMERS PER HOUR</label>
                <input className="pl-2" type="number" name='minimum' />
                </fieldset>

                
                <fieldset className="flex flex-col flex-1 min-w-0 p-2 bg-green-200">
                <label htmlFor="maximum">MAXIMUM CUSTOMERS PER HOUR</label>
                <input className="pl-2" type="number" name='maximum' />
                </fieldset>

                <fieldset className="flex flex-col flex-1 min-w-0 p-2 bg-green-200">
                <label htmlFor="average">AVERAGE COOKIES PER SALE</label>
                <input className="pl-2" type="number" name="average" step=".1" />
                </fieldset>
                
                

            

                </div>
        </form>
    );
}

function CookieStandTable({ stands, deleteStand }) {

    return (
        <table className="w-2/3 mx-auto my-8 bg-green-300 rounded-lg">
            <thead className="bg-green-500">
                <tr>
                    <th className="bg-green-500">Location</th>
                    <th className="bg-green-500">6 am</th>
                    <th className="bg-green-500">7 am</th>
                    <th className="bg-green-500">8 am</th>
                    <th className="bg-green-500">9 am</th>
                    <th className="bg-green-500">10 am</th>
                    <th className="bg-green-500">11 am</th>
                    <th className="bg-green-500">12 pm</th>
                    <th className="bg-green-500">1 pm</th>
                    <th className="bg-green-500">2 pm</th>
                    <th className="bg-green-500">3 pm</th>
                    <th className="bg-green-500">4 pm</th>
                    <th className="bg-green-500">5 pm</th>
                    <th className="bg-green-500">6 pm</th>
                    <th className="bg-green-500">7 pm</th>
                    <th className="bg-green-500">totals</th>
                </tr>
            </thead>
            <tbody>
                {stands.map(stand => (

                    <CookieStandRow key={stand.id} info={stand} deleteStand={deleteStand} />
                ))}
            </tbody>
        </table>
    );
}



function CookieStandRow({ info, deleteStand }) {

    function clickHandler() {
        deleteStand(info.id);
    }

    const hourlySales = Array.isArray(info.hourly_sales) ? info.hourly_sales : [];

    // if (info.hourly_sales.length == 0) {
    //     // bunk data
    //     info.hourly_sales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // }

    return (
        <tr className="odd:bg-green-400">
            <td className="pl-4 border border-green-900">{info.location} <button onClick={clickHandler} className="ml-2 text-red-500">[x]</button></td>
            {hourlySales.map((slot,index) => <td key={index}>{slot}</td>)}
            <td>{hourlySales.reduce((num, sum) => num + sum, 0)}</td>
        </tr>
    );
}


function LoginForm({ onLogin }) {

    async function handleSubmit(event) {
        event.preventDefault();
        onLogin(event.target.username.value, event.target.password.value);
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-green-200 rounded">
            <fieldset autoComplete='off'>
                <legend>Log In</legend>
                <label className="block font-bold text-center" htmlFor="username">USER NAME</label>
                <input className="w-full p-2 mb-4" name="username" />
                <label className="block font-bold text-center"  htmlFor="password">PASSWORD</label>
                <input className="w-full p-2 mb-4" type="password" name="password" />
                <button className="w-full p-2 text-white bg-green-500 rounded">SIGN IN</button>
            </fieldset>
        </form>
    );
}

