import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)

  const navigation = useNavigation()

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.lenght === total) {
      return;
    }

    setLoading(true)

    const response = await api.get('incidents', { params: { page } })

    setIncidents([...incidents, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total of <Text styles={styles.headerTextBold}>{total} incidents</Text>
        </Text>
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.description}>Choose one of the bellow incidents and save the day!</Text>


      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (

          <View style={styles.incident} >
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>City:</Text>
            <Text style={styles.incidentValue}>{incident.city} / {incident.district}</Text>

            <Text style={styles.incidentProperty}>Incident:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Value:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('en', { style: 'currency', currency: 'GBP' }).format(incident.value)}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailsButtonText}>More Details</Text>
              <Feather name="arrow-right" size={16} color="#e02041"></Feather>
            </TouchableOpacity>
          </View>
        )} />

    </View>
  )
}