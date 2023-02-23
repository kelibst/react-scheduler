import React from 'react'
import { useSelector } from 'react-redux'
import { userInterface } from '../redux/reducers/userReducer'
import { RootState } from '../redux/store'

const UsersList = () => {
    const { allUsers } = useSelector((state: RootState) => state.users)
    const handleDragStart = (e: any, user: userInterface) => {
        e.dataTransfer.setData("user", JSON.stringify(user));
    }
    const handleDragEnd = () => {
        console.log('drag just end'); 
    }

    return (
        <div>
            {allUsers.length > 0 && (
                <div className='my-4 w-40'>
                    <ul>
                        {allUsers.map((user) => <li  key={user.id} onDragEnd={handleDragEnd}  draggable onDragStart={e => handleDragStart(e, user)} className='p-4 border cursor-pointer font-medium'>{user.name}</li>)}
                    </ul>
                </div>)
            }
        </div>)
}

export default UsersList
