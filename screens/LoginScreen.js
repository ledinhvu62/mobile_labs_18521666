import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from '@react-native-material/core'
import { Formik } from 'formik'
import * as yup from 'yup'
import md5 from 'md5'
import Toast from 'react-native-easy-toast'

import { db } from '../firebase/firebaseConfig.js'

export default function LoginScreen({ navigation }) {
    const successToastRef = useRef(null)
    const errorToastRef = useRef(null)

    const loginFormValidationSchema = yup.object().shape({
        username: yup
            .string()
            .trim()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required'),
    })

    const showToast = (type, message) => {
        if (type === 'success') {
            successToastRef.current.show(message)
        }
        else {
            errorToastRef.current.show(message)
        }
    }

    const handleLogin = async ({ username, password }) => {
        const hashedPassword = md5(password)
        await db.collection('users').where('username', '==', username).where('password', '==', hashedPassword).get()
        .then((querySnapshot) => {
            if (querySnapshot.size === 1) {
                let userDetails = {}
                querySnapshot.forEach((documentSnapshot) => {
                    userDetails = documentSnapshot.data()
                })
                showToast('success', 'Congratulations!\nYou have successfully logged in.')
                setTimeout(() => {
                    navigation.navigate('Home', { userDetails })
                }, 1500)
            }
            else {
                showToast('error', 'Oops, something went wrong!\nYour username or password is incorrect.')
            }
        })
        .catch(() => {
            showToast('error', 'Oops, something went wrong!\nPlease try again later.')
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={
                    (values, { resetForm }) => {
                        handleLogin(values)
                        resetForm()
                    }
                }
                validationSchema={loginFormValidationSchema}
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
                            name='username'
                            label='Username'
                            inputContainerStyle={styles.inputField}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username.trimStart()}
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
                                {'Login'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {'Don\'t have an account? '}
                    <Text
                        style={styles.textLink}
                        onPress={() => navigation.navigate('Sign Up')}
                    >
                        {'Sign Up'}
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