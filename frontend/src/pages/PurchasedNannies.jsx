import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // For styling
import { format } from 'date-fns';
const PurchasedNannies = () => {
    const [purchasedNannies, setPurchasedNannies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null); // State to store selected date and time
    const [userLocation, setUserLocation] = useState("123 Main St, Anytown"); // User location
    const [showCalendar, setShowCalendar] = useState(false); // To control visibility of calendar

    
    useEffect(() => {
        // Fetch purchased nannies data from backend
        const fetchPurchasedNannies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/nanny/user/purchased-nannies', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("Fetched Nannies Response:", response);
                setPurchasedNannies(response.data.nannies);
            } catch (error) {
                console.error("Error fetching purchased nannies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedNannies();
    }, []);

const handleBookAppointment = async (nannyId) => {
    if (!selectedDate) {
        alert("Please select a date and time.");
        return;
    }

    // Format date and time
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const formattedTime = format(selectedDate, 'HH:mm');
console.log("time is"+formattedTime);
    try {
        const response = await axios.post(
            `http://localhost:5000/api/nanny/book-appointment/${nannyId}`,
            { 
                userLocation, 
                appointmentDate: formattedDate, 
                meetingTime: formattedTime 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        console.log('Appointment booked successfully:', response.data);
        alert('Appointment booked successfully!');
    } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Error booking appointment. Please try again.');
    }
};


    if (loading) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Purchased Nannies</h2>
            {purchasedNannies.length > 0 ? (
                <ul className="space-y-4">
                    {purchasedNannies.map((nanny) => (
                        <li key={nanny.nannyId} className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 transition duration-200">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{nanny.nannyName}</p>
                                <p className="text-gray-600">Purchase Date: {new Date(nanny.purchaseDate).toLocaleDateString()}</p>
                            </div>
                            <button 
                                onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Book Appointment
                            </button>
                            {showCalendar && (
                                <div className="mt-4">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)} // Update selected date
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        className="border p-2 rounded-lg w-full"
                                        placeholderText="Select a date and time"
                                    />
                                    <button
                                        onClick={() => handleBookAppointment(nanny.nannyId)}
                                        className="bg-green-600 text-white py-2 px-4 rounded-lg mt-4 transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Confirm Appointment
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No nannies purchased yet.</p>
            )}
        </div>
    );
};

export default PurchasedNannies;
