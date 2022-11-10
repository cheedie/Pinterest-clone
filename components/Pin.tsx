import { useState, useEffect} from 'react';
import { StyleSheet, Image, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Text, View} from '../components/Themed'
import {useNavigation} from '@react-navigation/native'
const Pin = ({pins}:any) => {
  const{id, image, title} = pins
const navigation = useNavigation()
    const onLike=()=>{}
const [ratio, setRatio] = useState(1)
const goToPinPage=()=>{
  navigation.navigate("Pin", {id})
}
useEffect(()=>{
         if(image){
            Image.getSize(image,(width,height) => setRatio(width/height))

     }

     }, [image])
    return (
        <Pressable onPress={goToPinPage} style={styles.pin}>
        <View>
    <Image
     source={{uri: image}} 
     style={[styles.image, {aspectRatio: ratio}]}
    />
        <Pressable onPress={onLike} style={styles.heartBtn}>
       <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
        </View>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
  pin:{
  width:"100%",
  padding: 4
    },

    image:{
  width: '100%',
  borderRadius: 15,
    },

    title: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '600',
      margin:5,

    },
    heartBtn:{
        backgroundColor:'red',
        position:"absolute",
        bottom: 10,
        right:10,
        padding: 5,
        borderRadius: 50,
    }
  });
  
  export default Pin