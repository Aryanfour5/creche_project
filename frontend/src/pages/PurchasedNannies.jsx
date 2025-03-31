import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchasedNannies = () => {
    const [purchasedNannies, setPurchasedNannies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState("123 Main St, Anytown");

    useEffect(() => {
        const fetchPurchasedNannies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/nanny/user/purchased-nannies', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // Initialize each nanny with showCalendar and selectedDate properties
                const nanniesWithState = response.data.nannies.map(nanny => ({
                    ...nanny,
                    showCalendar: false,
                    selectedDate: null,
                }));
                setPurchasedNannies(nanniesWithState);
            } catch (error) {
                console.error("Error fetching purchased nannies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedNannies();
    }, []);

    const handleBookAppointment = async (nannyId) => {
        const nanny = purchasedNannies.find(n => n.nannyId === nannyId);
        if (!nanny.selectedDate) {
            toast.warn("Please select a date and time.", { position: "top-center" });
            return;
        }
    
        const formattedDate = format(nanny.selectedDate, 'yyyy-MM-dd');
        const formattedTime = format(nanny.selectedDate, 'HH:mm');
    
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
    
            // Show success toast and alert
            toast.success('Appointment booked successfully!', { position: "top-center" });
            window.alert('Your appointment has been successfully booked!');
    
            // Clear the cart by resetting the purchasedNannies state
            setPurchasedNannies([]);
        } catch (error) {
            console.error('Error booking appointment:', error);
            const errorMessage = error.response?.data?.message || 'Error booking appointment. Please try again.';
            toast.error(errorMessage, { position: "top-center" });
        }
    };
    
    

    const toggleCalendar = (nannyId) => {
        setPurchasedNannies(prev => 
            prev.map(n => n.nannyId === nannyId ? { ...n, showCalendar: !n.showCalendar } : n)
        );
    };

    const handleDateChange = (date, nannyId) => {
        setPurchasedNannies(prev => 
            prev.map(n => n.nannyId === nannyId ? { ...n, selectedDate: date } : n)
        );
    };

    if (loading) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Purchased Nannies</h2>
            {purchasedNannies.length > 0 ? (
                <ul className="space-y-4">
                    {purchasedNannies.map((nanny) => (
                        <li key={nanny.nannyId} className="flex flex-col space-y-2 p-4 border rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 transition duration-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{nanny.nannyName}</p>
                                    <p className="text-gray-600">Purchase Date: {new Date(nanny.purchaseDate).toLocaleDateString()}</p>
                                </div>
                                <button 
                                    onClick={() => toggleCalendar(nanny.nannyId)}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Book Appointment
                                </button>
                            </div>
                            {nanny.showCalendar && (
                                <div className="mt-2">
                                    <DatePicker
                                        selected={nanny.selectedDate}
                                        onChange={date => handleDateChange(date, nanny.nannyId)}
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
