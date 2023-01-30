import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const UsersList = () => {
    const { allUsers } = useSelector((state: RootState) => state.users)
    const handleDragStart = (e, user) => {
        e.dataTransfer.setData("user", JSON.stringify(user));
        console.log(user, 'drag start');
    }
    const handleDragEnd = () => {
        console.log('drag ends'); 
    }

    return (
        <div>
            {allUsers.length > 0 && (
                <div className='my-4'>
                    <ul>
                        {allUsers.map((user) => <li  onDragEnd={handleDragEnd}  draggable onDragStart={e => handleDragStart(e, user)} className='p-4 border cursor-pointer'>{user.name}</li>)}
                    </ul>
                </div>)
            }
        </div>)
}

export default UsersList
