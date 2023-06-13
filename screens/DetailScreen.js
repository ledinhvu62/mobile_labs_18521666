import React from 'react'
import { TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native'

export default function DetailScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>
                {'Faculty of Computer Networks and Communications is one of six faculties under the University of Information Technology (Viet Nam National University Ho Chi Minh City). This faculty offers two majors: Computer Networks and Data Communications and Information Security.'}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonLabel}>
                    {'Back to Home'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        width: '90%',
        marginVertical: 40,
        paddingHorizontal: 8,
        fontSize: 18,
        lineHeight: 26,
        color: 'black',
    },
    button: {
        width: '40%',
        height: 40,
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