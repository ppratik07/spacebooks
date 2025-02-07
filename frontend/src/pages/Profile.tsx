import { useEffect, useState } from "react";

export const Profile = () => {
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevtheme) => (prevtheme === "light" ? "dark" : "light"))
    }
    const GoToSupport = ()=>{
        navigate('/')
    }
    return (
        <div>
            <div className="mt-auto relative">
                {/* Theme Toggle */}
                {/* <div className="flex items-center gap-4 p-3 hover:bg-blue-600 dark:hover:bg-gray-700 cursor-pointer" onClick={toggleTheme}>
                    {theme === "light" ? <span>🌙</span> : <span>☀️</span>}
                    <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                </div> */}

                <div
                    className="flex items-center gap-4 p-3 hover:bg-blue-600 cursor-pointer"
                    onClick={() => setShowProfilePopup(!showProfilePopup)}
                >
                    <span>👤</span> <span>My Profile</span>
                </div>

                {/* Profile Popup */}
                {showProfilePopup && (
                    <div className="absolute bottom-14 left-4 w-60 bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Settings</span>
                            <button onClick={() => setShowProfilePopup(false)}>❌</button>
                        </div>
                        <button className="w-full mt-2 text-left">Sign Out</button>
                        <div className="mt-4">
                            <h3 className="text-sm text-gray-400">Preferences</h3>
                            {/* <div className="flex justify-between items-center mt-2">
                                <span>Theme</span>
                                <button>🌙</button>
                            </div> */}
                            <div className="mt-2 flex justify-between">
                                <span>Language</span>
                                <select className="bg-gray-800 text-white border-none">
                                    <option>English</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={GoToSupport} className="mt-4 w-full bg-white text-black p-2 rounded-lg">Upgrade Plan</button>
                    </div>
                )}
            </div>
        </div>
    );
}