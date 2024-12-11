export const MyBookings = () =>{
    const userName = localStorage.getItem('name');
    return(
        <div>
            <p>Hi, {userName} ! You don't have any active bookings.</p>
        </div>
    )
}