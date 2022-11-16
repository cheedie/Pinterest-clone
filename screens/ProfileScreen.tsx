import { StyleSheet, Image, ScrollView, Pressable} from 'react-native';
import { Text, View } from '../components/Themed';
import MasonryLists from '../components/MasonryLists';
import pins from '../assets/data/pins';
import { Entypo, Feather } from '@expo/vector-icons';
import { useNhostClient, useSignOut } from '@nhost/react';
export default function ProfileScreen() {
const {signOut} = useSignOut()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>

<Feather name="share" size={24} color="white" style={styles.icon}/>
          </Pressable>
    <Entypo name='dots-three-horizontal'
    size={24}
    color='white'
style={styles.icon}/>
        </View>
      <Image source={require("../assets/images/profile-image.jpg")} style={styles.image}/>
      <Text style={styles.title}>Chidinma Ebeogu</Text>
      <Text style={styles.subtitle}>123 Followers | 534 Following</Text>
      </View>
     
      <MasonryLists pins={pins}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  subtitle: {
    color:"gray",
    fontWeight: '600',
    marginBottom: 10
  },
 image:{
width: 200,
height: 200,
borderRadius: 200,
marginVertical:10
 },
 header:{
  alignItems: "center"
 },
 icons:{
  flexDirection:"row",
  alignSelf:"flex-end",
  padding: 10
 },
 icon:{
  paddingHorizontal: 10
 }
});
