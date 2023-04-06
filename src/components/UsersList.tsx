import React, { useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNotification } from '../redux/reducers/notificationReducer'
import { removeUser, setOpenUserModal, userInterface } from '../redux/reducers/userReducer'
import { RootState } from '../redux/store'
import AddUser from './AddUser'
import Modal from './Modal'

const UsersList = () => {
    const { allUsers, openUserModal } = useSelector((state: RootState) => state.users)
    const [selectedUser, setSelectedUser] = useState({})

    const dispatch = useDispatch()
    const handleDragStart = (e: any, user: userInterface) => {
        e.dataTransfer.setData("user", JSON.stringify(user));
    }
    const handleModalClose = (result: string) => {
        dispatch(setOpenUserModal());
        if (result === "success") {
            setSelectedUser({});
        }
        console.log('running');
    };
    const handleDragEnd = () => {
        console.log('drag just end');
    }


    return (
        <div>
            {allUsers.length > 0 && (
                <div className='my-4 ml-2 max-w-sm'>
                    <h3 className='font-bold mb-4'>Duty Roster List</h3>
                    <ul>
                        {allUsers.map(
                            (user) => <div key={user.id} onDragEnd={handleDragEnd}
                                draggable onDragStart={e => handleDragStart(e, user)}
                                className='flex justify-between align-middle p-4 border cursor-pointer font-medium'>
                                <span>{user.name}</span>
                                <div className='flex justify-between'>
                                    <button className='pr-4' onClick={() => {
                                        dispatch(removeUser({ userId: user.id }))
                                        dispatch(setShowNotification({ message: "User was successfully removed" }))
                                    }}><AiFillDelete /></button>

                                    <button onClick={() => {
                                        dispatch(setOpenUserModal())
                                        setSelectedUser(user)
                                    }}><AiFillEdit /></button>
                                </div>
                            </div>)}
                    </ul>
                </div>)
            }
            <div className='mt-4'>
                <button className='ml-4 font-bold px-6 py-2 rounded-lg bg-green-600 text-xs text-white' onClick={() => {
                    dispatch(setOpenUserModal())
                }}>Add Staff</button>
                <Modal isOpen={openUserModal}  onClose={() => handleModalClose('success')}>
                    <AddUser setSelectedUser={setSelectedUser} user={selectedUser}/>
                </Modal>
            </div>

        </div>)
}

export default UsersList
