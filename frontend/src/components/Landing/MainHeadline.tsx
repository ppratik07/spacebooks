export const MainHeadline = () => {
    return (
        <div>
            <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-8 sm:py-12 md:py-16">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">
                        <span className="relative">
                            <span>SpaceBooks</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 rounded-lg"></span>
                        </span>{" "}
                        is the platform for booking meeting rooms, personal desks, and more.
                    </h1>
                    <p className="text-white text-lg sm:text-xl px-4">
                        Easy, like one-two-three!
                    </p>
                </div>
            </div>
        </div>
    );
}