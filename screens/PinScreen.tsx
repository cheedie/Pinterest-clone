import { View, Text, StyleSheet, Image, SafeAreaView, Pressable, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useNhostClient} from "@nhost/react"

const GET_PIN_QUERY = `
query MyQuery($id: uuid!) {
  pins_by_pk(id: $id) {
    id
    image
    title
    user_id
    created_at
  }
 
}
`

const PinScreen = () => {
  const [ratio, setRatio] = useState(1)
  const [pin, setPin] = useState<any>(null)
  const inserts = useSafeAreaInsets()
    const navigation = useNavigation()
    const nhost = useNhostClient()
   const route = useRoute()
  const pinId = route.params?.id


  const fetchPin = async(pinId)=>{
const response = await nhost.graphql.request(
  GET_PIN_QUERY,
{id: pinId}
)
if(response.error){
Alert.alert('Error fetching the pin')
}
else {
  setPin(response.data.pins_by_pk)
}
  }

  useEffect(()=>{
    fetchPin(pinId)
  }, [pinId])
useEffect(()=>{
    if(pin?.image){
       Image.getSize(pin?.image,(width,height) => setRatio(width/height))

}

}, [pin?.image])


const goBack=()=>{
    navigation.goBack()
}

if(!pin){
    <Text>Pin not found</Text>
}

  return (
    <SafeAreaView style={{backgroundColor:"black"}}>
        <StatusBar style='light'/>
    <View style={styles.root}>
     <Image source={{uri: pin?.image}} style={[styles.image, {aspectRatio: ratio}]}/>
<Text style={styles.title}>{pin?.title}</Text>
<Pressable onPress={goBack} style={[styles.backBtn,{top: inserts.top - 20} ]}>

<Ionicons name={"chevron-back"} size={35} color={"white"} />
</Pressable>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
root:{
    height:"100%",
    backgroundColor:"white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
},
image:{
    width:"100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,

},
title:{
    margin:10,
    fontSize: 24,
    fontWeight:"600",
    textAlign:"center",
    lineHeight: 30,
},
backBtn:{
    position:"absolute",
    left: 10,
    top: 20

}
})

export default PinScreen