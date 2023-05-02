import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { BallIndicator } from 'react-native-indicators'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as SQLite from 'expo-sqlite'

import CustomAlert from '../components/CustomAlert'

const db = SQLite.openDatabase('SchoolDatabase.db')

export default function ListUsersScreen() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showErrorPopup, setShowErrorPopup] = useState(false)

    const fetchData = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Users',
                [],
                (txObj, { rows: { _array } }) => setUsers(_array),
                () => setShowErrorPopup(true)
            )
        })
    }

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                fetchData()
                setIsLoading(false)
            }, 1000)
        }
    }, [isLoading, users])

    return (
        <>
            {isLoading ? (
                <BallIndicator color='#2196f3' />
            ) : (
                <ScrollView>
                    {users.map((user, index) => (
                    <View
                        style={[styles.result, index % 2 === 0 && {backgroundColor: '#e8e8e8'}]}
                        key={user.id}
                    >
                        <Text style={styles.fullNameText}>
                            {user.full_name}
                        </Text>
                        <View style={styles.phoneNumberView}>
                            <MaterialIcons
                                name='call'
                                color={'#2196f3'}
                                size={20}
                            />
                            <Text style={styles.phoneNumberText}>
                                {user.phone_number}
                            </Text>
                        </View>
                    </View>
                    ))}
                </ScrollView>
            )}
            
            <CustomAlert
                displayMode={'failed'}
                displayMsg={'Oops, something went wrong!\nPlease try again later.'}
                visibility={showErrorPopup}
                dismissAlert={setShowErrorPopup}
            />
        </>
    )
}

const styles = StyleSheet.create({
    result: {
        paddingVertical: 10,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
    },
    fullNameText: {
        fontSize: 18,
        flex: 1,
        paddingRight: 5,
    },
    phoneNumberView: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    phoneNumberText: {
        fontWeight: 500,
        color: '#2196f3',
        fontSize: 18,
        marginHorizontal: 5,
    },
})