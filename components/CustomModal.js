import React from 'react'
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default function CustomModal({
    displayHeader,
    displayMsg,
    leftButtonLabel,
    leftButtonAction,
    rightButtonLabel,
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
                    <View style={styles.modal}>
                        <Text style={styles.textHeader}>
                            {displayHeader}
                        </Text>
                        <Text style={styles.textMessage}>
                            {displayMsg}
                        </Text>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#32cd32' }}
                                onPress={() => {
                                    dismissAlert(false)
                                    leftButtonAction()
                                }}
                            >
                                <Text style={styles.buttonLabel}>
                                    {leftButtonLabel}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#ff6347' }}
                                onPress={() => dismissAlert(false)}
                            >
                                <Text style={styles.buttonLabel}>
                                    {rightButtonLabel}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modal: {
        width: '90%',
        height: 200,
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        elevation: 10,
    },
    textHeader: {
        marginTop: 14,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 500,
    },
    textMessage: {
        marginTop: 14,
        textAlign: 'center',
        fontSize: 18,
    },
    buttonGroup: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    buttonLabel: {
        padding: 16,
        fontSize: 18,
        fontWeight: 500,
        color: 'white',
    },
})