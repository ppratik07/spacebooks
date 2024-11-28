export const MainHeadline = () => {
    return (
        <div>
            <div className="text-center">
                {/* Purple Background Section */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-16">
                    <h1 className="text-white text-4xl font-bold mb-4">
                        <span className="relative">
                            <span>SpaceBooks</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 rounded-lg"></span>
                        </span>{" "}
                        is the platform for booking meeting rooms, personal desks, and more.
                    </h1>
                    <p className="text-white text-xl">
                        Easy, like one-two-three!
                    </p>
                </div>

                {/* Goals Section
                <div className="bg-gray-100 py-8">
                    <h2 className="text-gray-800 text-3xl font-bold">Goals</h2>
                </div> */}
            </div>
        </div>
    );
}