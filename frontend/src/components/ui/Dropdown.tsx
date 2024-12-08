import { useState } from "react";

export const Dropdown = () => {
    const[open,setOpen] = useState<boolean>(false);

    const  toggleButton = () =>{
        setOpen(!open);
    }
    return (
        <div className="ml-48 mb-8">
            <button id="dropdownDefaultButton"
             data-dropdown-toggle="dropdown"
             onClick={toggleButton}
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700
               dark:focus:ring-orange-800" type="button">X-Rite <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>
            <div id="dropdown"  className={`${open ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Regensdorf</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}