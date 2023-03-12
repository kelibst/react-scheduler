import { useDispatch, useSelector } from 'react-redux'
import { setShowNotification } from '../redux/reducers/notificationReducer'
import { RootState } from '../redux/store'
import Calendars from './Calendars'
import Layout from './layout/layout'
import Notification from './Notifications'

const Home = () => {
    const { show, msg, danger } = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()
    return (
       <Layout>
         <div>
            <Calendars />
            <div>
                {show && (
                    <Notification message={msg} danger={danger} visible={true} onClose={() => {
                        dispatch(setShowNotification({ message: "Message is shown" }))
                    }} />
                )}
            </div>
        </div>
       </Layout>
    )
}

export default Home