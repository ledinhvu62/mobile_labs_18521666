import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import CustomModal from '../components/CustomModal'

export default function HomeScreen({ route, navigation }) {
    const { fullname, username } = route.params.userDetails

    const [showLogOutModal, setShowLogOutModal] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textHeading}>
                    {'Welcome to Home Page'}
                </Text>
                <Text style={styles.textFullname}>
                    {fullname}
                </Text>
                <Text style={styles.textUsername}>
                    {username}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowLogOutModal(true)}
            >
                <Text style={styles.buttonLabel}>
                    {'Log Out'}
                </Text>
            </TouchableOpacity>

            <CustomModal
                displayHeader={'Log Out'}
                displayMsg={'Are you sure you want to log out your account?'}
                leftButtonLabel={'Yes'}
                leftButtonAction={() => navigation.navigate('Login')}
                rightButtonLabel={'No'}
                visibility={showLogOutModal}
                dismissAlert={setShowLogOutModal}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '90%',
        marginBottom: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeading: {
        marginBottom: 40,
        fontSize: 28,
        fontWeight: 500,
        color: 'black',
    },
    textFullname: {
        fontSize: 24,
        fontWeight: 500,
        color: 'black',
    },
    textUsername: {
        fontSize: 16,
        color: 'black',
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
})