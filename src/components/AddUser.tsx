import { isFulfilled } from "@reduxjs/toolkit";
import React, { Dispatch, FC, memo, SetStateAction, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, setOpenUserModal, updateUser } from "../redux/reducers/userReducer";

export interface FormData {
    name: string;
    dob: any;
    email: string;
    phone: string;
    isAdmin: boolean;
}

export interface AddUserProps {
    user: any,
    setSelectedUser: Dispatch<SetStateAction<{}>>
}



const AddUser: FC<AddUserProps> = (props) => {
    const { user, setSelectedUser } = props
    const [formData, setFormData] = useState({
        name: user.name || "",
        dob: user.dob || new Date(),
        email: user.email || "",
        phone: user.phone || "",
        isAdmin: user.isAdmin || false,
    });
    const dispatch = useDispatch()
    console.log(props, 'usedata');

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, type, checked } = e.target;
            if (name === 'dob' && type === 'date') {
                // Check if the value is a valid date
                const dateValue = new Date(value);
                console.log(dateValue);
                
                if (isNaN(dateValue.getTime())) {
                    return;
                }
            }
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (user.name) {
                dispatch(updateUser({...formData, userId: user.id}))
                dispatch(setOpenUserModal())
                setFormData({
                    name: "",
                    dob: new Date(),
                    email: "",
                    phone: "",
                    isAdmin: false,
                })
                setSelectedUser({})
            }else {
                dispatch(addUser(formData))
                dispatch(setOpenUserModal())
                setFormData({
                    name: "",
                    dob: new Date(),
                    email: "",
                    phone: "",
                    isAdmin: false,
                })
            }
        },

        [formData, dispatch]
    );

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
                        // @ts-ignore
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

export default memo(AddUser);


