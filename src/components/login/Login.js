import React, {useState} from "react"
import {Link} from "react-router-dom"
import {Formik, Form} from "formik";
import {validationSchema, defaultValues} from "./formikConfig"
import FormField from "../formfield/formField";
import { fb } from "../../config";

const Login = () => {
    const [serverError, setServerError] = useState('');

    const login = ({email, password}, {setSubmitting}) => {
        fb.auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                if(!res.user) {
                    setServerError("We are habign trouble logging you in. Please try again")
                }
            }
        )
    .catch(err => {
        if (err.code === 'auth/wrong-password') {
            setServerError('Invalid credentials');
        } else if (err.code === 'auth/user-not-found') {
            setServerError('No account for this email');
        } else {
            setServerError('Something went wrong :(');
            }
        })
        .finally(() => setSubmitting(false));
    }
    return(
        <div className="login">
            <h2>Hey,</h2>
            <h2>Login Now.</h2>
            <p>If you are new / <span className="create"><Link to="/signup" style={{textDecoration:'none', color: '#292e39'}}>Create New</Link></span></p>
            <Formik
                onSubmit={login}
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
            >

                {({isValid, isSubmitting}) => (
                    <Form className="form">
                        <FormField name="email" type="email" placeholder="Email..." />
                        <FormField name="password" type="password" placeholder="Password..."/>

                        <button disabled={isSubmitting || !isValid} type="submit" className="login-btn">
                            Login
                        </button>    
                    </Form>
                )}
                
            </Formik>
            <p className="signup"><Link to="/signup" style={{textDecoration: "none", color: "#9ca3af"}}>Signup</Link></p>
            {!!serverError && <div className="error">{serverError}</div>}
        </div>
    )
}

export default Login;