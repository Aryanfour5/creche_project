import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [profilePicture, setProfilePicture] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [experience, setExperience] = useState("");
    const [certifications, setCertifications] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("age", age);
            formData.append("experience", experience);
            formData.append("certifications", certifications);
            formData.append("contactEmail", contactEmail);
            formData.append("contactPhone", contactPhone);
            formData.append("address", address);

            if (profilePicture) {
                formData.append("profilePicture", profilePicture);
            }

            const response = await axios.post(backendUrl + "/api/nanny/add", formData, {
              headers: {
                Authorization: `Bearer ${token}`, // Ensure correct token format
                'Content-Type': 'multipart/form-data'
              }
            });
            

            if (response.data.success) {
                toast.success(response.data.message);
                // Reset form fields here
                setProfilePicture(null);
                setFirstName("");
                setLastName("");
                setAge("");
                setExperience("");
                setCertifications("");
                
                setContactEmail("");
                setContactPhone("");
                setAddress("");
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Profile Picture</p>
                <input 
                    onChange={(e) => setProfilePicture(e.target.files[0])} 
                    type="file" 
                    accept="image/*" 
                    required 
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>First Name</p>
                <input 
                    onChange={(e) => setFirstName(e.target.value)} 
                    value={firstName} 
                    className='w-full max-w-[500px] px-3 py-2' 
                    type="text" 
                    placeholder='Type here' 
                    required 
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Last Name</p>
                <input 
                    onChange={(e) => setLastName(e.target.value)} 
                    value={lastName} 
                    className='w-full max-w-[500px] px-3 py-2' 
                    type="text" 
                    placeholder='Type here' 
                    required 
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Age</p>
                <input 
                    onChange={(e) => setAge(e.target.value)} 
                    value={age} 
                    className='w-full max-w-[500px] px-3 py-2' 
                    type="number" 
                    placeholder='Enter age' 
                    required 
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Experience</p>
                <textarea 
                    onChange={(e) => setExperience(e.target.value)} 
                    value={experience} 
                    className='w-full max-w-[500px] px-3 py-2' 
                    placeholder='Describe experience' 
                    required 
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Certifications</p>
                <input 
                    onChange={(e) => setCertifications(e.target.value)} 
                    value={certifications} 
                    className='w-full max-w-[500px] px-3 py-2' 
                    type="text" 
                    placeholder='List certifications' 
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Contact Email</p>
                <input 
                    onChange={(e) => setContactEmail(e.target.value)} 
                    value={contactEmail} 
                    className='w-full max-w-[500px] px-3 py-2' 
                    type="email" 
                    placeholder='your@email.com' 
                    required 
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Contact Phone</p>
                <input 
                    onChange={(e) => setContactPhone(e.target.value)} 
                    value={contactPhone} 
                    className='w-full max-w-[500px] px-3 py-2' 
                    type="tel" 
                    placeholder='Enter phone number' 
                    required 
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Address</p>
                <textarea 
                    onChange={(e) => setAddress(e.target.value)} 
                    value={address} 
                    className='w-full max-w-[500px] px-3 py-2' 
                    placeholder='Enter address' 
                    required 
                />
            </div>

            <button type="submit" className='w-28 py-3 mt-4 bg-black text-white' disabled={loading}>
                {loading ? 'Adding...' : 'ADD'}
            </button>
        </form>
    );
};

export default Add;