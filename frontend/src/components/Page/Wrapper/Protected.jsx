
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAuthModalOpen } from "../../../redux/features/authUserModal/authUserModalSlice"

const Protected = ({ children }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(setAuthModalOpen(!user))
    }, [dispatch, user])
    return (
        user ? children : null
    )
}

export default Protected