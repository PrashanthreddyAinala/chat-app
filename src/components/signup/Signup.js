import React,{useState} from "react"
import {fb} from "../../config"
import {Formik, Form} from "formik";
import {Link} from "react-router-dom"
import {validationSchema, defaultValues} from "./formikConfig";
import FormField from "../formfield/formField"

const Signup = () => {
    
    const [serverError, setServerError] = useState('');

    const signup = ({email, userName, password}, {setSubmitting})=> {
        fb.auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                if(res?.user?.uid) {
                    fetch('/api/createUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            userName,
                            userId : res.user.uid
                        }),
                    })
                    .then(()=> {
                        fb.firestore
                            .collection('chatUsers')
                            .doc(res.user.uid)
                            .set({userName, avatar: ""})
                    })
                } else {
                    setServerError("We are having trouble signing you up. Please try again.");
                }
            })
        .catch(err => {
            if (err.code === 'auth/email-already-in-use') {
                setServerError('An account with this email already exists');
            } else {
                setServerError("We're having trouble signing you up. Please try again.");
            }
        })
        .finally(() => setSubmitting(false));
    }

    return(
        <div className="login">
            <h2>Hey,</h2>
            <h2>Signup Now.</h2>
            <p>Already have an account / <span className="create"><Link to="/login" style={{textDecoration:'none', color: '#292e39'}}>LogIn</Link></span></p>
            <Formik
                onSubmit={signup}
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
            >
                {({isValid, isSubmitting}) => (
                    <Form className="form">
                        <FormField name='userName' placeholder='Username...' />
                        <FormField name='email' placeholder='Email...' type="email"/>
                        <FormField name='password' placeholder='Password...' type="password"/>
                        <FormField name='verifyPassword' placeholder='Verify Password...' type="password" />
                        <button disabled={isSubmitting || !isValid} type="submit" className="login-btn">
                            Signup
                        </button>
                    </Form>
                )}
            </Formik>
            <p className="signup"><Link to="/login" style={{textDecoration: "none", color: "#9ca3af"}}>Login</Link></p>
            {!!serverError && <div className="error">{serverError}</div>}
        </div>
    )
}

export default Signup;