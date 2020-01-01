import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    Dimensions,
    Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f96080',
        alignItems: 'center',
        // justifyContent: "center"
    },
    title: {
        color: '#fff',
        fontSize: 40,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginTop: 60,
        marginBottom: 40,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        width: width - 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(50,50,50)',
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowOffset: {
                    height: -3,
                    width: 2,
                },
            },
            android: {
                elevation: 3,
            },
        }),
    },
    input: {
        padding: 14,
        fontSize: 30,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
    },
});

const App = () => {
    const [newToDo, setNewToDo] = useState('');

    const handleChangeInput = (text: string) => {
        setNewToDo(text);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.title}>I want to do</Text>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="New to do"
                    placeholderTextColor="#ccc"
                    value={newToDo}
                    onChangeText={handleChangeInput}
                    returnKeyLabel="Done"
                    returnKeyType="done"
                />
            </View>
        </View>
    );
};

export default App;
