export const HeaderNavigation = () => {
    return (
        <div>
            <header className="flex justify-between items-center px-10 py-5">
                <h1 className="text-xl font-bold">SpaceBooks</h1>
                <nav className="flex space-x-6">
                    <a href="#product" className="hover:text-blue-600">Product</a>
                    <a href="#community" className="hover:text-blue-600">Community</a>
                    <a href="#plans" className="hover:text-blue-600">Plans</a>
                </nav>
                <div className="flex space-x-4">
                    <button className="px-4 py-2 border rounded hover:bg-gray-100">Log In</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
                </div>
            </header>
        </div>
    );
}