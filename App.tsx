import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    Dimensions,
    Platform,
    ScrollView,
    NativeSyntheticEvent,
    TextInputEndEditingEventData,
    AsyncStorage,
} from 'react-native';
import { AppLoading } from 'expo';
import uuidv4 from 'uuid/v4';
import { ToDoItem } from './containers/ToDoItem';
const AppTitle = 'TOOO DOOO';
const KEY_DATA: string = 'todos';

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
    scrollContainer: {
        alignItems: 'center',
    },
});
interface ToDo {
    id: string;
    text: string;
    isCompleted: boolean;
    created: Date;
}
interface ToDos {
    [id: string]: ToDo;
}

const App = () => {
    const [newToDoText, setNewToDoText] = useState('');
    const [loadedTodos, setLoadedTodos] = useState(false);
    const [todos, setTodos] = useState<ToDos>();

    const loadTodos = () => {
        AsyncStorage.getItem(KEY_DATA)
            .then(todos => {
                if (todos) {
                    const todoValues = JSON.parse(todos);
                    if (todoValues) {
                        setTodos(todoValues);
                    }
                }
            })
            .finally(() => {
                setLoadedTodos(true);
            });
    };

    const saveTodos = newTodos => {
        // console.log(JSON.stringify(newTodos));
        AsyncStorage.setItem(KEY_DATA, JSON.stringify(newTodos));
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const handleChangeInput = (text: string) => {
        setNewToDoText(text);
    };

    const handleAddTodo = (): void => {
        const id = uuidv4();
        if (newToDoText) {
            setTodos(prevState => {
                const newTodos: ToDos = {
                    ...prevState,
                    [id]: {
                        id,
                        text: newToDoText,
                        isCompleted: false,
                        created: new Date(),
                    },
                };

                saveTodos(newTodos);

                return { ...newTodos };
            });
            setNewToDoText('');
        }
    };

    const handleTodoTextChange = (id: string, text: string) => {
        setTodos(prev => {
            const newTodos: ToDos = {
                ...prev,
                [id]: {
                    ...prev[id],
                    text,
                },
            };

            saveTodos(newTodos);

            return { ...newTodos };
        });
    };
    const handleCompleted = (id: string) => {
        setTodos(prev => {
            const newTodos: ToDos = {
                ...prev,
                [id]: {
                    ...prev[id],
                    isCompleted: true,
                },
            };

            saveTodos(newTodos);

            return { ...newTodos };
        });
    };

    const handleUncompleted = (id: string) => {
        setTodos(prev => {
            const newTodos: ToDos = {
                ...prev,
                [id]: {
                    ...prev[id],
                    isCompleted: false,
                },
            };

            saveTodos(newTodos);

            return { ...newTodos };
        });
    };

    const handleDelete = (id: string) => {
        setTodos(prev => {
            const newTodos = { ...prev };

            delete newTodos[id];

            saveTodos(newTodos);

            return {
                ...newTodos,
            };
        });
    };

    if (!loadedTodos) {
        return <AppLoading />;
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.title}>{AppTitle}</Text>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder={AppTitle}
                    placeholderTextColor="#ccc"
                    autoCorrect={false}
                    autoCompleteType="off"
                    value={newToDoText}
                    onChangeText={handleChangeInput}
                    returnKeyType="done"
                    onSubmitEditing={handleAddTodo}
                    underlineColorAndroid="transparent"
                />

                <ScrollView>
                    {todos &&
                        Object.values(todos)
                            .sort((a, b) => {
                                return a.created > b.created ? 1 : -1;
                            })
                            .map((todo: ToDo) => {
                                return (
                                    <ToDoItem
                                        key={todo.id}
                                        id={todo.id}
                                        text={todo.text}
                                        isCompleted={todo.isCompleted}
                                        onTextChanged={handleTodoTextChange}
                                        onCompleted={handleCompleted}
                                        onUncomplete={handleUncompleted}
                                        onDelete={handleDelete}
                                    />
                                );
                            })}
                </ScrollView>
            </View>
        </View>
    );
};

export default App;
