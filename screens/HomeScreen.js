import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from "@react-native-material/core"
import { Formik } from 'formik'
import * as yup from 'yup'
import * as SQLite from 'expo-sqlite'

import CustomAlert from '../components/CustomAlert'

const db = SQLite.openDatabase('SchoolDatabase.db')

export default function HomeScreen({ navigation }) {
    const [registeredPhoneNumbers, setRegisteredPhoneNumbers] = useState([])
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)

    const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

    const formValidationSchema = yup.object().shape({
        fullName: yup
            .string()
            .trim()
            .required('Full name is required'),
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
    })

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, full_name VARCHAR(50), phone_number VARCHAR(10) NOT NULL UNIQUE)'
            )
        })
    }

    const fetchData = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT phone_number FROM Users',
                [],
                (txObj, { rows: { _array } }) => {
                    let phoneNumbers = []
                    _array.forEach((item) => {
                        phoneNumbers.push(item.phone_number)
                    })
                    setRegisteredPhoneNumbers(phoneNumbers)
                },
                () => setShowErrorPopup(true)
            )
        })
    }

    const addUser = ({ fullName, phoneNumber }) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Users (full_name, phone_number) VALUES (?,?)',
                [fullName.trim(), phoneNumber],
                () => {
                    setRegisteredPhoneNumbers([...registeredPhoneNumbers, phoneNumber])
                    setShowSuccessPopup(true)
                },
                () => setShowErrorPopup(true)
            )
        })
    }

    useEffect(() => {
        createTable()
        fetchData()
    }, [])

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Formik
                initialValues={{ fullName: '', phoneNumber: '' }}
                onSubmit={
                    (values, { resetForm }) => {
                        addUser(values)
                        resetForm()
                    }
                }
                validationSchema={formValidationSchema}
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
                            name='fullName'
                            label='Full name'
                            inputContainerStyle={styles.input}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName.trimStart()}
                            variant='outlined'
                            color='#2196f3'
                        />
                        {errors.fullName && touched.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                        <TextInput
                            name='phoneNumber'
                            label='Phone number'
                            inputContainerStyle={styles.input}
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                            variant='outlined'
                            color='#2196f3'
                            keyboardType='numeric'
                        />
                        {errors.phoneNumber && touched.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                        <TouchableOpacity
                            style={[styles.button, !(dirty && isValid) && {backgroundColor: '#d0d0d0'}]}
                            disabled={!(dirty && isValid)}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonLabel}>
                                {'Add user'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: 'green'}]}
                onPress={() => navigation.navigate('List users')}
            >
                <Text style={styles.buttonLabel}>
                    {'View all users'}
                </Text>
            </TouchableOpacity>

            <CustomAlert
                displayMode={'success'}
                displayMsg={'Congratulations!\nUser has been added successfully.'}
                visibility={showSuccessPopup}
                dismissAlert={setShowSuccessPopup}
            />
            <CustomAlert
                displayMode={'failed'}
                displayMsg={'Oops, something went wrong!\nPlease try again later.'}
                visibility={showErrorPopup}
                dismissAlert={setShowErrorPopup}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    form: {
        marginTop: 40,
        alignItems: 'center',
    },
    input: {
        width: '90%',
        marginBottom: 20,
    },
    errorText: {
        fontSize: 12,
        color: '#ff0000',
        marginBottom: 20,
        marginTop: -20,
        width: '90%',
    },
    button: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#2196f3',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        width: '40%',
        height: 40,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 500,
        color: 'white',
    },
})