import React from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNotification } from '../redux/reducers/notificationReducer'
import { removeUser, userInterface } from '../redux/reducers/userReducer'
import { RootState } from '../redux/store'
import AddUser from './AddUser'

const UsersList = () => {
    const { allUsers } = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()
    const handleDragStart = (e: any, user: userInterface) => {
        e.dataTransfer.setData("user", JSON.stringify(user));
    }
    const handleDragEnd = () => {
        console.log('drag just end'); 
    }

    return (
        <div>
            {allUsers.length > 0 && (
                <div className='my-4 max-w-sm'>
                    <h3 className='font-bold'>Duty Rooster List</h3>
                    <ul>
                        {allUsers.map(
                            (user) => <div  key={user.id} onDragEnd={handleDragEnd}  
                            draggable onDragStart={e => handleDragStart(e, user)} 
                            className='flex justify-center align-middle p-4 border cursor-pointer font-medium'>
                                <span>{user.name}</span> 
                                <div className='flex'>
                                    <button onClick={() => {
                                        dispatch(removeUser({userId: user.id}))
                                        dispatch(setShowNotification({message: "User was successfully removed"}))
                                    }}><AiFillDelete /></button>
                                    <button><AiFillEdit /></button>
                                </div>
                            </div>)}
                    </ul>
                </div>)
            }
            <AddUser />
        </div>)
}

export default UsersList
