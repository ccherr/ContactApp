import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetContactById } from "../redux/action/contact.action";
import { TypeContactReducer } from "../redux/reducer/contact.reducer";
import { getContactById } from "../services/contact.service";

const Detail: FC = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()
    const contactState = useSelector((state: TypeContactReducer) => state.contactReducer)
    const [photo, setPhoto] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (route.params) {
            const data = route.params
            if (contactState.length != 0) {
                getContactById(data.id)
                    .then(res => {
                        dispatch(GetContactById(res))
                        setPhoto(res.photo)
                        setFirstName(res.firstName)
                        setLastName(res.lastName)
                        setAge(res.age)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }
    }, [route.params])

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
                <View style={styles.container}>
                    {loading ?
                        <ActivityIndicator size="large" color="#453E44" />
                        :
                        <View>
                            <View style={styles.backgroundImage}>
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
                            </View>
                            <View>
                                <View style={styles.containerData}>
                                    <Text style={styles.text}>First Name</Text>
                                    <Text style={styles.data}>{firstName}</Text>
                                </View>
                                <View style={styles.containerData}>
                                    <Text style={styles.text}>Last Name</Text>
                                    <Text style={styles.data}>{lastName}</Text>
                                </View>
                                <View style={styles.containerData}>
                                    <Text style={styles.text}>Age</Text>
                                    <Text style={styles.data}>{age}</Text>
                                </View>
                            </View>
                        </View>
                    }
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
    container: {
        height: 580,
    },
    backgroundImage: {
        height: 311,
        width: 350,
        backgroundColor: 'rgba(69, 62, 68, 0.5)',
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    image: {
        height: 273,
        width: 300,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    containerData: {
        height: 60,
        width: 320,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    text: {
        fontSize: 13,
    },
    data: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default Detail