import {useEffect, useState} from 'react'
import {useNhostClient} from "@nhost/react"
import MasonryLists from '../components/MasonryLists';
import { Alert } from 'react-native';

export default function HomeScreen() {
  const nhost = useNhostClient()
  const[pins, setPins] = useState([])
  const fetchPins = async()=>{
  const response = await nhost.graphql.request(`query MyQuery {
    pins {
      created_at
      id
      image
      title
      user_id
    }
  }

  `)
  if(response.error){
    Alert.alert('Error fetching pins')
    console.log(response.error)
  }

  else {
    setPins(response.data.pins)
  }
  }

  useEffect(()=>{
    fetchPins()
  }, [])
  return (


   <MasonryLists pins={pins}/>
  );
}

