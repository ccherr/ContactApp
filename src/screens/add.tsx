import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, ToastAndroid, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { TypeContactReducer } from "../redux/reducer/contact.reducer";
import Contact, { ContactReq } from "../models/contact";
import { insertContact } from "../services/contact.service";
import { AddContact } from "../redux/action/contact.action";
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import { contactValidation } from "../validation/contactValidation";

const Add: FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const contactState = useSelector((state: TypeContactReducer) => state.contactReducer)

    const [id, setId] = useState('')
    const [photo, setPhoto] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState(0)
    const [msgErr, setMsgErr] = useState("")
    const [loading, setLoading] = useState(false)

    const showToast = () => {
        ToastAndroid.showWithGravity("Create New Contact Success!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }

    const chooseFile = () => {
        setLoading(true)
        launchImageLibrary({ mediaType: "photo" }, async function (res) {
            if (res && res.assets) {
                const asset = res.assets[0]
                const reference = storage().ref(`/photos/${asset.fileName}`);

                await reference.putFile(asset.uri);
                const url = await reference.getDownloadURL();
                setPhoto(url)
                setLoading(false)
            } else {
                if (photo == "") {
                    ToastAndroid.showWithGravity("Please select a profile picture for this contact!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                }
                setLoading(false)
            }

        })
    }

    const handlerInsert = () => {
        let msgError = contactValidation(firstName, lastName, age, photo)
        if (contactValidation(firstName, lastName, age, photo) == '') {
            const contact = new ContactReq()
            contact.firstName = firstName
            contact.lastName = lastName
            contact.age = age
            contact.photo = photo

            insertContact(contact)
                .then(res => {
                    const contact = new Contact()
                    contact.id = id
                    contact.firstName = firstName
                    contact.lastName = lastName
                    contact.age = age
                    contact.photo = photo

                    showToast()

                    dispatch(AddContact(contact))
                    navigation.navigate('home', contact)
                }, (error) => {
                    ToastAndroid.showWithGravity(error.data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                })
        } else {
            setMsgErr(msgError)
        }
    }

    return (
        <ScrollView>
            <View style={styles.all}>
                <View style={styles.top}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }}>
                        <Image
                            style={styles.back}
                            source={require('../assets/img/back.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Create New Contact</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.input}>
                        <View style={styles.inputImage}>
                            <Text style={styles.imageText}>Profile Picture</Text>
                            {loading ?
                                <ActivityIndicator size="large" color="#453E44" />
                                :
                                <TouchableOpacity
                                    onPress={chooseFile}>
                                    <View style={styles.image}>
                                        {!!(photo == '') &&
                                            (
                                                <Image
                                                    style={styles.plus}
                                                    source={require('../assets/img/plus.png')}
                                                />
                                            )
                                        }
                                        {!!(photo != '') && (<Text style={styles.imageData}>{photo != 'N/A' ?
                                            <Image
                                                style={styles.imageData}
                                                source={{ uri: photo, }}
                                            /> :
                                            <Image
                                                style={styles.imageData}
                                                source={require('../assets/img/yoona.jpg')}
                                            />
                                        } </Text>)}


                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.inputData}>
                            <Text style={styles.text}>First Name</Text>
                            <TextInput
                                style={styles.data}
                                onChangeText={setFirstName}
                                defaultValue={firstName}
                            />
                        </View>
                        <View style={styles.inputData}>
                            <Text style={styles.text}>Last Name</Text>
                            <TextInput
                                style={styles.data}
                                onChangeText={setLastName}
                                defaultValue={lastName}
                            />
                        </View>
                        <View style={styles.inputData}>
                            <Text style={styles.text}>Age</Text>
                            <TextInput
                                style={styles.data}
                                onChangeText={(text) => setAge(Number(text))}
                            />
                        </View>
                    </View>
                    <View style={styles.btn}>
                        {msgErr != '' && <Text style={styles.msgError}>{msgErr}</Text>}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handlerInsert}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    top: {
        height: 80,
    },
    all: {
        backgroundColor: 'white',
        display: 'flex',
        flex: 1,
    },
    back: {
        height: 17,
        width: 30,
        marginTop: 35,
        marginLeft: 35
    },
    title: {
        height: 70,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 40,
    },
    container: {
        height: 580,
    },
    input: {
        height: 350,
        width: 319,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    inputImage: {
        height: 150,
        width: 319,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 15,
    },
    imageText: {
        fontSize: 13,
    },
    plus: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    image: {
        height: 100,
        width: 100,
        backgroundColor: 'rgba(69, 62, 68, 0.07)',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10,
    },
    imageData: {
        height: 200,
        width: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 100,
    },
    inputData: {
        height: 60,
        width: 319,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 15,
    },
    text: {
        fontSize: 13,
    },
    data: {
        height: 40,
        width: 319,
        backgroundColor: 'rgba(69, 62, 68, 0.07)',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    btn: {
        marginTop: 20,
    },
    msgError: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'red',
    },
    button: {
        height: 60,
        width: 319,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(69, 62, 68, 1)',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
})

export default Add