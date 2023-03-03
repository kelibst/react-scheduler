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
    const handleDragEnd = () => {
        console.log('drag just end');
    }

    console.log('testing user again');

    return (
        <div>
            {allUsers.length > 0 && (
                <div className='my-4 max-w-sm'>
                    <h3 className='font-bold'>Duty Rooster List</h3>
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
                                    <Modal isOpen={openUserModal} onClose={() => {
                                        dispatch(setOpenUserModal())
                                    }}>
                                        {/* <AddUser selectedUser={selectedUser} /> */}
                                    </Modal>

                                </div>
                            </div>)}
                    </ul>
                </div>)
            }
            <div>
                <button onClick={() => {
                    dispatch(setOpenUserModal())
                }}>Add A new User</button>
                <Modal isOpen={openUserModal} onClose={() => {
                    dispatch(setOpenUserModal())
                }}>
                    <AddUser />
                </Modal>
            </div>

        </div>)
}

export default UsersList
