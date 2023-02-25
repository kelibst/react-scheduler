import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addUser } from "../redux/reducers/userReducer";

interface FormData {
    id: string;
    name: string;
    dob: Date;
    email: string;
    phone: string;
    isAdmin: boolean;
}

const initialFormData: FormData = {
    id: uuidv4(),
    name: "",
    dob: new Date(),
    email: "",
    phone: "",
    isAdmin: false,
};

const AddUser: React.FC = () => {
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;
        if (name === 'dob' && type === 'date') {
            // Check if the value is a valid date
            const dateValue = new Date(value);
            if (isNaN(dateValue.getTime())) {
              return;
            }
          }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addUser(formData))
        setFormData( {
            id: uuidv4(),
            name: "",
            dob: new Date(),
            email: "",
            phone: "",
            isAdmin: false,
        })
    };

    return (
        <div>
            <h3 className="font-bold">Add a person to be assign to duty</h3>
            <form
                className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Frat Edwin"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="dob"
                    >
                        Date of Birth
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dob"
                        type="date"
                        name="dob"
                        value={formData.dob} // convert date to ISO string format
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="kbooste212@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="phone"
                    >
                        Phone
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+233546149861"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center">
                    <input
                        className="mr-2 leading-tight"
                        id="isAdmin"
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                    <label className="text-sm" htmlFor="isAdmin">
                        Is Admin?
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form >
        </div>

    );
};

export default AddUser;


