import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile: React.FC = () => {
    const {username} = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Logic to save customer data to the database
        console.log(firstName, lastName, email, dob, age);

        const formData = {
            first_name: firstName,
            last_name: lastName,
            customer_email:email,
            dob: dob,
            age: age
        };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/savecustomer/`, formData)
        .then(response => {
            console.log(response.status);

            setErrors({});
        })
        .catch(error => {
            if (error.response && error.response.data){
                setErrors(error.response.data);
            }
        });
    };

    const handleLogout = () => {
        navigate('/login');
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center mb-4 w-full max-w-md">
            <h2 className="text-xl font-semibold">Welcome, {username}</h2>
            <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
        <div className="flex flex-col items-center w-full max-w-md">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                <label htmlFor="firstName" className="block mb-1">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.first_name && <div className="text-red-500">{errors.first_name}</div>}
                </div>
                <div className="mb-4">
                <label htmlFor="lastName" className="block mb-1">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.last_name && <div className="text-red-500">{errors.last_name}</div>}
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                    Last Name
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.customer_email && <div className="text-red-500">{errors.customer_email}</div>}
                </div>
                <div className="mb-4">
                <label htmlFor="dob" className="block mb-1">
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="dob"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.dob && <div className="text-red-500">{errors.dob}</div>}
                </div>
                <div className="mb-4">
                <label htmlFor="age" className="block mb-1">
                    Age
                </label>
                <input
                    type="number"
                    id="age"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.age && <div className="text-red-500">{errors.age}</div>}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit
                </button>
            </form>
        </div>
    </div>
  );
};

export default Profile;
