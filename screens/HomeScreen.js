import React, { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

export default function HomeScreen({ navigation }) {
    const value = new Animated.Value(0)

    const fadeAnimation = value.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    })

    const zoomInAnimation = value.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.1, 1.2],
    })

    const zoomOutAnimation = value.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.9, 0.8],
    })
    
    const slideUpAnimation = value.interpolate({
        inputRange: [0, 1],
        outputRange: [120, 0],
    })
    
    const slideDownAnimation = value.interpolate({
        inputRange: [0, 1],
        outputRange: [-120, 0],
    })
    
    const blinkAnimation = value.interpolate({
        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        outputRange: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    })

    const rotateAnimation = value.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    const animations = [
        {
            code: 'fade-in',
            name: 'Fade In',
            style: {
                opacity: fadeAnimation,
            },
            animate: () => {
                value.setValue(0)
                Animated.timing(value, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start()
            },
        },
        {
            code: 'fade-out',
            name: 'Fade Out',
            style: {
                opacity: fadeAnimation,
            },
            animate: () => {
                value.setValue(1)
                Animated.timing(value, {
                    toValue: 0,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start()
            },
        },
        {
            code: 'zoom-in',
            name: 'Zoom In',
            style: {
                transform: [
                    {
                        scale: zoomInAnimation,
                    },
                ],
            },
            animate: () => {
                value.setValue(0)
                Animated.timing(value, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start()
            },
        },
        {
            code: 'zoom-out',
            name: 'Zoom Out',
            style: {
                transform: [
                    {
                        scale: zoomOutAnimation,
                    },
                ],
            },
            animate: () => {
                value.setValue(0)
                Animated.timing(value, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start()
            },
        },
        {
            code: 'slide-up',
            name: 'Slide Up',
            style: {
                opacity: fadeAnimation,
                transform: [
                    {
                        translateY: slideUpAnimation,
                    },
                ],
            },
            animate: () => {
                value.setValue(0)
                Animated.timing(value, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start()
            },
        },
        {
            code: 'slide-down',
            name: 'Slide Down',
            style: {
                opacity: fadeAnimation,
                transform: [
                    {
                        translateY: slideDownAnimation,
                    },
                ],
            },
            animate: () => {
                value.setValue(0)
                Animated.timing(value, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start()
            },
        },
        {
            code: 'blink',
            name: 'Blink',
            style: {
                opacity: blinkAnimation,
            },
            animate: () => {
                value.setValue(0)
                Animated.timing(value, {
                    toValue: 1,
                    duration: 5000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start()
            },
        },
        {
            code: 'rotate',
            name: 'Rotate',
            style: {
                transform: [
                    {
                        rotate: rotateAnimation,
                    },
                ],
            },
            animate: () => {
                value.setValue(0)
                Animated.timing(value, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start()
            },
        },
        {
            code: 'none',
            name: 'None',
            style: {
            },
            animate: () => {
            },
        },
    ]

    const [selectedAnimation, setSelectedAnimation] = useState(animations[animations.length - 1])

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => navigation.navigate('Detail')}
            >
                <Animated.Image
                    source={require('../img/logo.png')}
                    style={{ ...styles.image, ...selectedAnimation.style }}
                />
            </TouchableOpacity>
            <FlatGrid
                itemDimension={130}
                data={animations}
                spacing={10}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.code}
                        style={[styles.button, item.code === selectedAnimation.code && { backgroundColor: '#2196f3' }]}
                        onPress={() => {
                            setSelectedAnimation(item)
                            item.animate()
                        }}
                    >
                        <Text style={styles.buttonLabel}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imageContainer: {
        height: 180,
        marginVertical: 80,
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    button: {
        minWidth: '48%',
        height: 50,
        marginBottom: 6,
        marginHorizontal: '1%',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d0d0d0',
        borderRadius: 4,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
})