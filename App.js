import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Formik } from 'formik'
import * as yup from 'yup'

export default function App() {
    const [results, setResults] = useState([])

    const denpendentCost = 11000000

    const submitForm = ({fullName, grossSalary}) => {
        const temp = grossSalary * (1 - 0.105)
        const netSalary = temp <= denpendentCost ? temp : denpendentCost + (temp - denpendentCost) * (1 - 0.05)
        const result = [{
            fullName,
            grossSalary: Number(grossSalary),
            netSalary: netSalary.toFixed(),
        }]
        setResults([...results, ...result])
    }

    const numberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    const numberRegex = /^[0-9]+$/

    const formValidationSchema = yup.object().shape({
        fullName: yup
          .string()
          .required('Full name is required'),
        grossSalary: yup
          .string()
          .matches(numberRegex, "Gross salary includes only numbers")
          .required('Gross salary is required'),
    })

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Formik
                initialValues={{ fullName: '', grossSalary: '' }}
                onSubmit={
                    (values, { resetForm }) => {
                        submitForm(values)
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
                }) => (
                    <View style={styles.form}>
                        <TextInput
                            name='fullName'
                            label="Full name"
                            inputContainerStyle={styles.input}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                            variant="outlined"
                            color='#2196f3'
                        />
                        {errors.fullName && touched.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                        <TextInput
                            name='grossSalary'
                            label="Gross salary (VND)"
                            inputContainerStyle={styles.input}
                            onChangeText={handleChange('grossSalary')}
                            onBlur={handleBlur('grossSalary')}
                            value={values.grossSalary}
                            variant="outlined"
                            color='#2196f3'
                            keyboardType='numeric'
                        />
                        {errors.grossSalary && touched.grossSalary && <Text style={styles.errorText}>{errors.grossSalary}</Text>}
                        <TouchableOpacity
                            style={[styles.button, !isValid && {backgroundColor: '#d0d0d0'}]}
                            disabled={!isValid}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonLabel}>
                                {'Calculate'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {results.map((result, index) => (
                    <View
                        style={[styles.result, index % 2 === 0 && {backgroundColor: '#f5f5f5'}]}
                        key={index}
                    >
                        <Text style={styles.fullNameText}>
                            {result.fullName}
                        </Text>
                        <View style={styles.resultRight}>
                            <View style={styles.resultRow}>
                                <Text style={[styles.salaryText, styles.netSalaryText]}>
                                    {`Net salary: ${numberWithCommas(result.netSalary)} VND`}
                                </Text>
                            </View>
                            <View style={styles.resultRow}>
                                <Text style={styles.salaryText}>
                                    {`Gross salary: ${numberWithCommas(result.grossSalary)} VND`}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))} 
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    form: {
        marginTop: 70,
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
    scrollView: {
        alignItems: 'center',
    },
    result: {
        paddingVertical: 10,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    resultRight: {
        flexDirection: 'column',
        width: '52%',
    },
    resultRow: {
        flexDirection: 'row',
    },
    fullNameText: {
        fontSize: 16,
        fontWeight: 600,
        flex: 1,
        paddingRight: 5,
    },
    salaryText: {
        fontWeight: 600,
        color: '#a9a9a9',
        fontSize: 12,
    },
    netSalaryText: {
        color: '#ff0000',
        fontSize: 14,
    },
});