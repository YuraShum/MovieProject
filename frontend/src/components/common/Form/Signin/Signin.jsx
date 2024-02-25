import { useDispatch } from "react-redux"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userApi from "../../../../api/requests/userRequest";
import { useState } from "react";
import { setUser } from "../../../../redux/features/user/userSlice";
import { setAuthUserModal } from "../../../../redux/features/authUserModal/authUserModalSlice";
import { toast } from 'react-toastify'

import { Box, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
const Signin = () => {

    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [requestLogine, setRequestLogine] = useState(false)

    const signinSchema = Yup.object({
        password: Yup.string()
            .min(8, 'Too Short password, minimum 8 characters!')
            .required('Required'),
        userName: Yup.string()
            .min(8, 'Too Short name, minimum 8 characters!')
            .required('Required'),

    })
    const formikSignin = useFormik({
        initialValues: {
            password: '',
            userName: ''
        },
        validationSchema: signinSchema,
        onSubmit: async (values) => {
            setError(null)
            setRequestLogine(true)
            const { response, err } = await userApi.userSignIn(values)
            setRequestLogine(false)
            if (response) {
                formikSignin.resetForm()
                dispatch(setUser(response))
                dispatch(setAuthUserModal(false))
                toast.success('Sing in succses')
            }
            if (err) {
                setError(err.message)
            }
        }
    })
    return (
        <Box component="form" onSubmit={formikSignin.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="useranme"
                    name="userName"
                    value={formikSignin.values.userName}
                    onChange={formikSignin.handleChange}
                    error={formikSignin.touched.userName && formikSignin.errors.userName !== undefined}
                    fullWidth />

                <TextField
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formikSignin.values.password}
                    onChange={formikSignin.handleChange}
                    error={formikSignin.touched.password && formikSignin.errors.password !== undefined}
                    fullWidth />

            </Stack>
            <LoadingButton
                type="submit"
                fullWidth
                sx={{
                    backgroundColor: "primary.main",
                    color: 'white',
                    marginTop: '2rem',
                    "&:hover": {
                        backgroundColor: 'secondary.main'
                    }
                }}
                size="large"
                loading={requestLogine}
            >
                <Typography textTransform='capitalize'>
                    sign in
                </Typography>
            </LoadingButton>
        </Box>
    )
}

export default Signin



