import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    radio: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 4,
        marginHorizontal: 10,
    },
    radioCompleted: {
        borderColor: '#f96080',
    },
    radioUncompleted: { borderColor: '#bbb' },
    text: {
        fontWeight: '400',
        fontSize: 18,
        marginVertical: 20,
    },
});

export const ToDoItem = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleRadioPress = () => {
        setIsCompleted(prevState => {
            return !prevState;
        });
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.radio,
                    isCompleted
                        ? styles.radioCompleted
                        : styles.radioUncompleted,
                ]}
                onPress={handleRadioPress}
            />
            <Text style={styles.text}>Todo item</Text>
        </View>
    );
};
