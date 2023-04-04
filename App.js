import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default function App() {
    const [layout, setLayout] = useState('Row Layout');
    const items = ([
        { name: 'A', code: '#dc143c' },
        { name: 'B', code: '#3498db' },
        { name: 'C', code: '#2ecc71' },
        { name: 'D', code: '#9b59b6' },
        { name: 'E', code: '#ffa500' },
    ]);
    const layouts = [
        'Row Layout',
        'Column Layout',
        'Listview Layout',
        'Gridview Layout',
    ]

    return (
        <PreviewLayout
            label="18521666 - Lab 1"
            values={layouts}
            selectedValue={layout}
            setSelectedValue={setLayout}
        >
            {layout === 'Row Layout' &&
            <View style={styles.row}>
                {items.map(item => (
                    <View 
                        style={[styles.box, { backgroundColor: item.code, width: 70 }]}
                        key={item.code}
                    >
                        <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                ))} 
            </View>
            }

            {layout === 'Column Layout' &&
            <View style={styles.column}>
                {items.map(item => (
                    <View
                        style={[styles.box, { backgroundColor: item.code, width: 70 }]}
                        key={item.code}
                    >
                        <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                ))} 
            </View>
            }

            {layout === 'Listview Layout' &&
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <View
                        style={[styles.box, { backgroundColor: item.code }]}
                        key={item.code}
                    >
                        <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={item => item.code}
            />}

            {layout === 'Gridview Layout' &&
            <FlatGrid
                itemDimension={130}
                data={items}
                spacing={10}
                renderItem={({ item }) => (
                    <View
                        style={[styles.box, { backgroundColor: item.code }]}
                        key={item.code}    
                    >
                        <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                )}
            />}
        </PreviewLayout>
    );
};

const PreviewLayout = ({
    children,
    label,
    values,
    selectedValue,
    setSelectedValue,
}) => (
    <View>
        <View style={styles.header}>
            <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.buttonContainer}>
            {values.map(value => (
                <TouchableOpacity
                    key={value}
                    onPress={() => setSelectedValue(value)}
                    style={[styles.button, selectedValue === value && styles.selected]}
                >
                    <Text
                        style={[styles.buttonLabel, selectedValue === value && styles.selectedLabel]}
                    >
                        {value}
                    </Text>
                </TouchableOpacity>
            ))} 
        </View>
        <View>{children}</View>
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2196f3',
        height: 80,
        justifyContent: 'center',  
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: 'white',
    },
    box: {
        height: 70,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        marginBottom: 15,
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: '#d6e6f3',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '48%',
        height: 50,
    },
    selected: {
        backgroundColor: '#2196f3',
        borderWidth: 0,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2196f3',
    },
    selectedLabel: {
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    column: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});