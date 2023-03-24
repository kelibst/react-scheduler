import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNotification } from '../redux/reducers/notificationReducer'
import { RootState } from '../redux/store'
import Calendars from './Calendars'
import Layout from './layout/layout'
import Notification from './Notifications'

export interface HomeProps {
    monthtableRef: React.MutableRefObject<null>,
    weekRef: React.MutableRefObject<null>
}

const Home: FC <HomeProps> = (props) => {
    const { show, msg, danger } = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()
    return (
       <Layout {...props}>
         <div>
            <Calendars {...props} />
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