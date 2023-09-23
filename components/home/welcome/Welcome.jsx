import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, } from 'react-native';
import {useRouter} from 'expo-router'


import styles from './welcome.style'
import {icons, SIZES} from '../../../constants'

const jobTypes = ['full Time', 'part Time', 'Contractor',]

const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {

  const [activeJob, setactiveJob] = React.useState('full Time')

  const router = useRouter();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Welcome Abhinav</Text>
        <Text style={styles.welcomeMessage}>Find Your perfect Job </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(term)=>setSearchTerm(term)}
            placeholder='What are you looking for'
             />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image 
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>

        
      </View>

      <View style={styles.tabsContainer}>
          <FlatList 
            data={jobTypes}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.tab(activeJob, item)}
              onPress={()=>{
                setactiveJob(item)
                router.push(`/search/${item}`)
              }}
              >
                <Text style={styles.tabText(activeJob, item)}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal
          />
        </View>
    </View>
  )
}

export default Welcome