import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from '@react-native-material/core'
import { Formik } from 'formik'
import * as yup from 'yup'
import md5 from 'md5'
import Toast from 'react-native-easy-toast'

import { db } from '../firebase/firebaseConfig.js'

export default function SignUpScreen({ navigation }) {
    const [registeredPhoneNumbers, setRegisteredPhoneNumbers] = useState([])
    const [registeredUsernames, setRegisteredUsernames] = useState([])
    const successToastRef = useRef(null)
    const errorToastRef = useRef(null)

    const phoneNumberRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/
    const usernameRegex = /^[a-z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-z0-9]){4,18}[a-z0-9]$/
    /*
        USERNAME RULES
        Only contains lowercase alphabetical and numeric characters, underscore and dot.
        Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
        Underscore and dot can't be next to each other (e.g user_.name / user._name).
        Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
        Number of characters must be between 6 to 20.
    */
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
    /*
        PASSWORD RULES
        Must contain at least 1 lowercase alphabetical character.
        Must contain at least 1 uppercase alphabetical character.
        Must contain at least 1 numeric character.
        Must contain at least 1 special character.
        Number of characters must be 6 or longer.
    */

    const signUpFormValidationSchema = yup.object().shape({
        fullname: yup
            .string()
            .trim()
            .required('Fullname is required'),
        phoneNumber: yup
            .string()
            .test('is-registered-phone-number','Phone number has been registered', async (value) => {
                await yup.object().shape({
                    phoneNumber: yup
                        .string()
                        .required('Phone number is required')
                        .matches(phoneNumberRegex, 'Invalid phone number')
                })
                .validate({ phoneNumber: value })
                return !(registeredPhoneNumbers.includes(value))
            }),
        username: yup
            .string()
            .test('is-registered-username','Username has been registered', async (value) => {
                await yup.object().shape({
                    username: yup
                        .string()
                        .required('Username is required')
                        .matches(usernameRegex, 'Invalid username')
                })
                .validate({ username: value })
                return !(registeredUsernames.includes(value))
            }),
        password: yup
            .string()
            .required('Password is required')
            .matches(passwordRegex, 'Password must be strong enough (e.g leDinh@vu6)'),
    })

    const showToast = (type, message) => {
        if (type === 'success') {
            successToastRef.current.show(message)
        }
        else {
            errorToastRef.current.show(message)
        }
    }

    const handleSignUp = async ({ fullname, phoneNumber, username, password }) => {
        const hashedPassword = md5(password)
        await db.collection('users').add({
            fullname,
            phoneNumber,
            username,
            password: hashedPassword,
        })
        .then(() => {
            setRegisteredPhoneNumbers([...registeredPhoneNumbers, phoneNumber])
            setRegisteredUsernames([...registeredUsernames, username])
            showToast('success', 'Congratulations!\nYou have successfully registered.')
            setTimeout(() => {
                navigation.navigate('Login')
            }, 1500)
        })
        .catch(() => {
            showToast('error', 'Oops, something went wrong!\nPlease try again later.')
        })
    }

    const fetchData = async () => {
        await db.collection('users').get()
        .then((querySnapshot) => {
            let phoneNumbers = []
            let usernames = []
            querySnapshot.forEach((documentSnapshot) => {
                let userDetails = documentSnapshot.data()
                phoneNumbers.push(userDetails.phoneNumber)
                usernames.push(userDetails.username)
            })
            setRegisteredPhoneNumbers(phoneNumbers)
            setRegisteredUsernames(usernames)
        })
        .catch(() => {
            showToast('error', 'Oops, something went wrong!\nPlease try again later.')
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{
                    fullname: '',
                    phoneNumber: '',
                    username: '',
                    password: '',
                }}
                onSubmit={
                    (values, { resetForm }) => {
                        handleSignUp(values)
                        resetForm()
                    }
                }
                validationSchema={signUpFormValidationSchema}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                    dirty,
                }) => (
                    <View style={styles.form}>
                        <TextInput
                            name='fullname'
                            label='Fullname'
                            inputContainerStyle={styles.inputField}
                            onChangeText={handleChange('fullname')}
                            onBlur={handleBlur('fullname')}
                            value={values.fullname.trimStart()}
                            variant='outlined'
                            color='#2196f3'
                        />
                        {
                            errors.fullname && touched.fullname &&
                                <Text style={styles.errorText}>
                                    {errors.fullname}
                                </Text>
                        }
                        <TextInput
                            name='phoneNumber'
                            label='Phone number'
                            inputContainerStyle={styles.inputField}
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                            variant='outlined'
                            color='#2196f3'
                            keyboardType='numeric'
                        />
                        {
                            errors.phoneNumber && touched.phoneNumber &&
                                <Text style={styles.errorText}>
                                    {errors.phoneNumber}
                                </Text>
                        }
                        <TextInput
                            name='username'
                            label='Username'
                            inputContainerStyle={styles.inputField}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            variant='outlined'
                            color='#2196f3'
                        />
                        {
                            errors.username && touched.username &&
                                <Text style={styles.errorText}>
                                    {errors.username}
                                </Text>
                        }
                        <TextInput
                            name='password'
                            label='Password'
                            inputContainerStyle={styles.inputField}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            variant='outlined'
                            color='#2196f3'
                            secureTextEntry={true}
                        />
                        {
                            errors.password && touched.password &&
                                <Text style={styles.errorText}>
                                    {errors.password}
                                </Text>
                        }
                        <TouchableOpacity
                            style={[styles.button, !(dirty && isValid) && { backgroundColor: '#d0d0d0' }]}
                            disabled={!(dirty && isValid)}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonLabel}>
                                {'Sign Up'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>

            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {'Back to '}
                    <Text
                        style={styles.textLink}
                        onPress={() => navigation.navigate('Login')}
                    >
                        {'Login'}
                    </Text>
                </Text>
            </View>

            <Toast
                ref={successToastRef}
                style={styles.successToast}
                position='top'
                positionValue={0}
                fadeInDuration={500}
                fadeOutDuration={2000}
                opacity={1}
                textStyle={{ color: 'white' }}
            />
            <Toast
                ref={errorToastRef}
                style={styles.errorToast}
                position='top'
                positionValue={0}
                fadeInDuration={500}
                fadeOutDuration={2000}
                opacity={1}
                textStyle={{ color: 'white' }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        marginTop: 40,
        alignItems: 'center',
    },
    inputField: {
        width: '90%',
        marginBottom: 20,
    },
    errorText: {
        width: '90%',
        marginTop: -20,
        marginBottom: 20,
        fontSize: 12,
        color: '#ff0000',
    },
    button: {
        width: '40%',
        height: 40,
        marginBottom: 24,
        padding: 8,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196f3',
        borderRadius: 4,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 500,
        color: 'white',
    },
    textContainer: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: 'gray',
    },
    textLink: {
        fontSize: 16,
        fontWeight: 500,
        color: 'black',
    },
    successToast: {
        width: '80%',
        padding: 10,
        backgroundColor: '#32cd32',
        borderRadius: 8,
    },
    errorToast: {
        width: '80%',
        padding: 10,
        backgroundColor: '#ff6347',
        borderRadius: 8,
    },
})