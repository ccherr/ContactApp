import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Contact, { ContactReq } from "../models/contact";
import { UpdateContact } from "../redux/action/contact.action";
import { TypeContactReducer } from "../redux/reducer/contact.reducer";
import { updateContact } from "../services/contact.service";
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import { contactValidation } from "../validation/contactValidation";

const Edit: FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const contactState = useSelector((state: TypeContactReducer) => state.contactReducer)
    const [id, setId] = useState('')
    const [photo, setPhoto] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState(0)
    const [msgErr, setMsgErr] = useState("")
    const [loading, setLoading] = useState(false)

    const showToast = () => {
        ToastAndroid.showWithGravity("Edit Contact Success!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
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

    useEffect(() => {
        const contact = route.params
        if (contact) {
            if (contact.id != undefined) {
                setId(contact.id)
                setFirstName(contact.firstName)
                setLastName(contact.lastName)
                setAge(contact.age)
                setPhoto(contact.photo)
            }
        }
    }, [])

    const handlerUpdate = () => {
        setLoading(true)
        let msgError = contactValidation(firstName, lastName, age, photo)
        if (contactValidation(firstName, lastName, age, photo) == '') {
            const contact = new ContactReq()
            contact.firstName = firstName
            contact.lastName = lastName
            contact.age = age
            contact.photo = photo

            const contactId = id

            updateContact(contact, contactId)
                .then(res => {
                    const contact = new Contact()
                    contact.id = id
                    contact.firstName = firstName
                    contact.lastName = lastName
                    contact.age = age
                    contact.photo = photo

                    showToast()

                    dispatch(UpdateContact(contact))
                    navigation.navigate('home')
                }, (error) => {
                    ToastAndroid.showWithGravity(error.data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                })
        } else {
            setMsgErr(msgError)
            setLoading(false)
            ToastAndroid.showWithGravity(msgErr, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
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
                    <Text style={styles.titleText}>Edit Contact</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.input}>
                        <View style={styles.inputImage}>
                            <Text style={styles.imageText}>Profile Picture</Text>
                            <TouchableOpacity
                                onPress={chooseFile}
                            >
                                {loading ?
                                    <ActivityIndicator size="large" color="#453E44" />
                                    :
                                    <View style={styles.image}>
                                        {photo != 'N/A' ?
                                            <Image
                                                style={styles.image}
                                                source={{ uri: photo, }}
                                            /> :
                                            <Image
                                                style={styles.image}
                                                source={require('../assets/img/yoona.jpg')}
                                            />
                                        }
                                    </View>
                                }
                            </TouchableOpacity>
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
                                keyboardType={"number-pad"}
                                onChangeText={(text) => setAge(Number(text))}
                                defaultValue={String(age)}
                            />
                        </View>
                    </View>
                    <View style={styles.btn}>
                        {loading &&
                            <TouchableOpacity
                                style={styles.btnDissabled}
                                onPress={handlerUpdate}
                                disabled={true}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        }
                        {loading == false &&
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handlerUpdate}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        }
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
    image: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10,
    },
    plus: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 100,
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
        paddingLeft: 15
    },
    button: {
        height: 60,
        width: 319,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(69, 62, 68, 1)',
        marginTop: 30,
    },
    btnDissabled: {
        height: 60,
        width: 319,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(69, 62, 68, 0.5)',
        marginTop: 30,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    btn: {
        marginTop: 20,
    },
    msgError: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'red',
    },
})

export default Edit