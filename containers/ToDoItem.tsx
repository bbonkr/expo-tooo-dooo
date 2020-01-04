import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    GestureResponderEvent,
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#bbb',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        width: width / 2,
    },
    radio: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 4,
        marginHorizontal: 10,
    },
    radioCompleted: {
        borderColor: '#bbb',
    },
    radioUncompleted: {
        borderColor: '#f96080',
    },
    text: {
        fontWeight: '400',
        fontSize: 18,
        marginVertical: 20,
        // backgroundColor: 'red',
    },
    input: {
        // flex: 1,
    },
    completedText: {
        color: '#bbb',
        textDecorationLine: 'line-through',
    },
    uncompleteText: {
        color: '#353839',
    },
    actions: {
        flexDirection: 'row',
        flexShrink: 1,
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
        // backgroundColor: 'red',
    },
    actionText: {
        // padding: 1,
    },
});

interface ToDoItemProps {
    id: string;
    text: string;
    isCompleted: boolean;
    onTextChanged: (id: string, text: string) => void;
    onCompleted: (id: string) => void;
    onUncomplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({
    id,
    text,
    isCompleted,
    onTextChanged,
    onCompleted,
    onUncomplete,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputText, setInputText] = useState(text);

    const handleRadioPress = (event: GestureResponderEvent) => {
        event.stopPropagation();
        if (isCompleted) {
            onUncomplete(id);
        } else {
            onCompleted(id);
        }
    };

    const handleStartEditing = (event: GestureResponderEvent) => {
        event.stopPropagation();
        setIsEditing(true);
    };

    const handleBlurInput = () => {
        onTextChanged(id, inputText);
        setIsEditing(false);
    };

    const handleFinishEditing = (event: GestureResponderEvent) => {
        event.stopPropagation();
        onTextChanged(id, inputText);
        setIsEditing(false);
    };

    const handleDelete = (event: GestureResponderEvent) => {
        event.stopPropagation();
        onDelete(id);
    };
    const handleChangeText = text => {
        setInputText(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity
                    style={[
                        styles.radio,
                        isCompleted
                            ? styles.radioCompleted
                            : styles.radioUncompleted,
                    ]}
                    onPress={handleRadioPress}
                />
                {isEditing ? (
                    <TextInput
                        style={[
                            styles.input,
                            styles.text,
                            isCompleted
                                ? styles.completedText
                                : styles.uncompleteText,
                        ]}
                        value={inputText}
                        multiline={true}
                        textBreakStrategy="balanced"
                        onChangeText={handleChangeText}
                        onBlur={handleBlurInput}
                        underlineColorAndroid="transparent"
                    />
                ) : (
                    <Text
                        textBreakStrategy="highQuality"
                        lineBreakMode="middle"
                        style={[
                            styles.text,
                            isCompleted
                                ? styles.completedText
                                : styles.uncompleteText,
                        ]}
                    >
                        {text}
                    </Text>
                )}
            </View>

            {isEditing ? (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={handleFinishEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✅</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={handleStartEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✏️</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressOut={handleDelete}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>❌</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
