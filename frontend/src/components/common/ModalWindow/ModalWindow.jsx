import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MODAL_AUTH } from "../../../const/constConfig"
import { setAuthUserModal } from "../../../redux/features/authUserModal/authUserModalSlice"
import { Box, Button, Modal, Typography } from "@mui/material"
import { FaCircle } from "react-icons/fa";
import Signin from "../Form/Signin/Signin"
import Signup from "../Form/Signup/Signup"



const ModalWindow = () => {
    const dispatch = useDispatch()
    const { authUserModal } = useSelector((state) => state.authUserModal)

    const [action, setAction] = useState(MODAL_AUTH.signin)

    useEffect(() => {
        if (authUserModal) {
            setAction(MODAL_AUTH.signin)
        }
    }, [authUserModal])

    const handleCloseModal = () => {
        dispatch(setAuthUserModal(false))
    }
    const switchActionState = (state) => {
        setAction(state)
    }


    return (
        <Modal
            open={authUserModal !== undefined ? authUserModal : false}
            onClose={handleCloseModal}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '600px',
                    padding: '30px',
                    backgroundColor: 'background.paper',
                    boxShadow: 12,
                    borderRadius: '10px',

                }}>

                <Box
                    sx={{ display: "flex", justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                    <Button
                        variant="contained"
                        onClick={() => setAction(MODAL_AUTH.signin)}>
                        <Typography textTransform='capitalize'
                        >
                            sign in
                        </Typography>
                    </Button>
                    <Box
                        sx={{
                            backgroundColor: 'primary.main',
                            width: '60%',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',

                        }}>
                        <FaCircle
                            style={{
                                position: 'absolute',
                                color: "white",
                                fontSize: '30px',
                                transition: 'right 0.4s ease-in-out, left 0.4s ease-in-out',
                                right: action === MODAL_AUTH.signup ? '3px' : 'unset',
                                left: action === MODAL_AUTH.signin ? '3px' : 'unset',

                            }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => setAction(MODAL_AUTH.signup)}>
                        <Typography textTransform='capitalize'>
                            sign up
                        </Typography>
                    </Button>
                </Box>

                <Box>
                    {action === MODAL_AUTH.signin ?
                        <Signin /> :
                        <Signup />}
                </Box>
            </Box>
        </Modal >
    )
}

export default ModalWindow