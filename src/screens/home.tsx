import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ToastAndroid, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Contact from "../models/contact";
import { AddContacts, DeleteContact, ReloadContact } from "../redux/action/contact.action";
import { TypeContactReducer } from "../redux/reducer/contact.reducer";
import { deleteContact, getContact } from "../services/contact.service";
import Spinner from 'react-native-loading-spinner-overlay'

const EditBtn: FC<{ item: Contact }> = (item) => {

    const navigation = useNavigation()
    const [data, setData] = useState<Contact>()

    useEffect(() => {
        const newItem = JSON.parse(JSON.stringify(item.item))
        setData(newItem)
    }, [setData])

    return (
        <View>
            <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => navigation.navigate('edit', {
                    id: data?.id,
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                    age: data?.age,
                    photo: data?.photo
                })}>
                <Image
                    style={styles.textBtnEdit}
                    source={require('../assets/img/edit.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const DeleteBtn: FC<{ item: Contact }> = (item) => {
    const [data, setData] = useState<Contact>()
    const dispatch = useDispatch()

    const handlerDelete = (delID: string) => {
        Alert.alert(
            "Are You Sure?",
            "Do you really want to delete these record?",
            [
                {
                    text: 'No',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        deleteContact(delID)
                            .then(res => {
                                dispatch(DeleteContact(delID))
                            })
                            .catch(error => {
                                ToastAndroid.showWithGravity(error.data.message, ToastAndroid.SHORT, ToastAndroid.TOP)
                            })
                    }
                }
            ]
        )
    }

    useEffect(() => {
        const newItem = JSON.parse(JSON.stringify(item.item))
        setData(newItem)
    }, [])

    return (
        <TouchableOpacity
            style={styles.btnDelete}
            onPress={() => handlerDelete(data.id)}>
            <Text style={styles.textBtnDel}>X</Text>
        </TouchableOpacity>
    )
}

const Home: FC = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const contactState = useSelector((state: TypeContactReducer) => state.contactReducer)
    const [loading, setLoading] = useState(true)

    const reloadContact = () => {
        setLoading(true)
        dispatch(ReloadContact())
    }

    useFocusEffect(useCallback(() => {
        if (contactState.length == 0) {
            getContact()
                .then(res => {
                    dispatch(AddContacts(res.data))
                })
                .finally(() => {
                    setLoading(false)
                })
                .catch(error => {
                    ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.TOP)
                })
        }
    }, [contactState]))

    return (
        <View style={styles.all}>
            {loading ?
                <ActivityIndicator size="large" color="#453E44" />
                :
                <View>
                    <View style={styles.top}>
                        <Text style={styles.title}>Welcome To</Text>
                        <Text style={styles.titleName}>Contact App</Text>
                    </View>
                    <View style={styles.btn}>
                        <View style={styles.btnRow}>
                            <TouchableOpacity
                                style={styles.add}
                                onPress={() => { navigation.navigate('add') }}
                            >
                                <Text style={styles.textAdd}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.reload}
                                onPress={reloadContact}
                            >
                                <Image
                                    style={styles.textReload}
                                    source={require('../assets/img/reload.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <FlatList
                            data={contactState}
                            renderItem={({ item }) =>
                                <View style={styles.data}>
                                    <View style={styles.column}></View>
                                    <View style={styles.viewRowSafeArea}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('data', item)}>
                                            <View style={styles.datas}>
                                                {item.photo != 'N/A' ?
                                                    <Image
                                                        style={styles.photo}
                                                        source={{ uri: item.photo }}
                                                    /> :
                                                    <Image
                                                        style={styles.photo}
                                                        source={require('../assets/img/yoona.jpg')}
                                                    />
                                                }
                                                <Text style={styles.dataText}>{`${item.firstName} ${item.lastName}`}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.viewRowSafeArea}>
                                            <EditBtn item={item} />
                                            <DeleteBtn item={item} />
                                        </View>
                                    </View>
                                    <Text style={styles.dataAge}>{`${item.age} Years Old`}</Text>
                                </View>
                            }
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: '#453E44',
        height: 200,
    },
    all: {
        backgroundColor: 'white',
        display: 'flex',
        flex: 1,
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 36,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white',
        marginTop: 35,
    },
    titleName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white',
        marginTop: 20,
    },
    btn: {
        height: 60,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    container: {
        height: 400,
    },
    data: {
        height: 60,
        marginTop: 20,
        justifyContent: 'space-evenly'
    },
    column: {
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    dataText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 20
    },
    dataAge: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 93,
        marginTop: -20,
    },
    add: {
        width: 49,
        height: 49,
        backgroundColor: '#453E44',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        borderRadius: 10,
        marginTop: 6,
        marginRight: 20,
    },
    textAdd: {
        color: '#F4CFB4',
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 15,
        marginTop: -2,
    },
    reload: {
        width: 49,
        height: 49,
        backgroundColor: 'rgba(244, 207, 180, 0.5)',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        borderRadius: 10,
        marginTop: 6,
        marginRight: 20,
    },
    textReload: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 9
    },
    viewRowSafeArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datas: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    photo: {
        height: 54,
        width: 54,
        borderRadius: 10,
        marginLeft: 20
    },
    btnEdit: {
        height: 35,
        width: 35,
        backgroundColor: 'rgba(244, 207, 180, 0.5)',
        borderRadius: 10,
        justifyContent: 'center',
        marginRight: 20,
        marginTop: 10
    },
    btnDelete: {
        height: 35,
        width: 35,
        backgroundColor: 'rgba(69, 62, 68, 1)',
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 20,
        marginTop: 10
    },
    textBtnDel: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: 'rgba(244, 207, 180, 1)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textBtnEdit: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})

export default Home