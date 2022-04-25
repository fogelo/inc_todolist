import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    FormLabel,
    TextField
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {loginTC} from './auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStoreType} from '../../app/store';
import {Navigate, useNavigate} from 'react-router-dom';

type LoginPT = {}

export const Login = (props: LoginPT) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector<AppRootStoreType>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])

    const validate = (values: any): any => {
        const errors: any = {}
        if (!values.email) {
            errors.email = 'login is required';
        } else if (values.email.length > 25) {
            errors.email = 'Must be 25 characters or less';
        }

        if (!values.password) {
            errors.password = 'password is required';
        } else if (values.password.length > 25) {
            errors.password = 'Must be 25 characters or less';
        }
        return errors
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
        validate,
    });
    // if (isLoggedIn) {
    //     return <Navigate to={'/'}/>
    // }
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container
                      spacing={3}
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item xs={8}>
                        <FormControl>
                            <FormLabel>
                                <p>To log in get registered here or use common test account credentials:</p>
                                <p>Email: <b>free@samuraijs.com</b></p>
                                <p>Password: <b>free</b></p>
                            </FormLabel>
                            <FormGroup>
                                <TextField id="outlined-basic"
                                           margin={'normal'}
                                           variant="outlined"
                                           type={'text'}
                                           name={'email'}
                                           label={'Email'}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           value={formik.values.email}
                                           error={!!(formik.errors.email && formik.touched.email)}
                                           helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                                />
                                <TextField id="outlined-basic"
                                           margin={'normal'}
                                           variant="outlined"
                                           type={'password'}
                                           name={'password'}
                                           label={'Password'}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           value={formik.values.password}
                                           error={!!(formik.errors.password && formik.touched.password)}
                                           helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
                                />
                                <FormControlLabel control={<Checkbox name={'rememberMe'}
                                                                     onChange={formik.handleChange}
                                                                     checked={formik.values.rememberMe}/>}
                                                  label="rememberMe"
                                />
                                <Button type={'submit'}
                                        variant="contained"
                                        disabled={!!(formik.errors.email || formik.errors.password)}
                                >
                                    login</Button>
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}