import React from 'react'
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function CustomAlert({
    displayMode,
    displayMsg,
    visibility,
    dismissAlert,
}) {
    return (
        <View>
            <Modal
                visible={visibility}
                animationType={'fade'}
                transparent={true}
            >
                <View style={styles.overlay}>
                    <View style={styles.popup}>
                        <View style={styles.popupIconMessage}>
                            {displayMode == 'success' ? (
                                <>
                                    <MaterialIcons
                                        name='check-circle'
                                        color={'green'}
                                        size={60}
                                    />
                                </>
                            ) : (
                                <>
                                    <MaterialIcons
                                        name='cancel'
                                        color={'red'}
                                        size={60}
                                    />
                                </>
                            )}
                            <Text style={styles.messageText}>
                                {displayMsg}
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => dismissAlert(false)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonLabel}>
                                {'OK'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 200,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        elevation: 10,
    },
    popupIconMessage: {
        alignItems: 'center',
        margin: 10,
    },
    messageText: {
        fontSize: 18,
        marginTop: 5,
        textAlign: 'center',
    },
    button: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#2196f3',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderRadius: 5,
        bottom: 0,
        marginBottom: 10,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 500,
        color: 'white',
        margin: 15,
    },
})