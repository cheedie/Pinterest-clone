import { StyleSheet, ScrollView, FlatList, useWindowDimensions} from 'react-native';
import {Text, View} from '../components/Themed'
import Pin from '../components/Pin';
import React, {useState} from 'react'

interface IMasonryList {
    pins: {
        id: string,
        image: string,
        title: string
    }[]
}
const MasonryLists = ({pins}: IMasonryList) => {
const width = useWindowDimensions().width
const numColumns = Math.ceil(width / 350)
  return (
    <ScrollView>
    <View style={styles.container} >
    {Array.from(Array(numColumns)).map((_, colIndex) => (
      <View style={styles.column} key={`column_${colIndex}`}>
        {pins.filter((_,index) => index % numColumns === colIndex).map((pin) => <Pin key={pin.id} pins={pin}/>)}
      </View>
    ))}
      
     
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      padding: 4
    },
  
    column:{
      flex:1,
  
    }
  });
  
export default MasonryLists