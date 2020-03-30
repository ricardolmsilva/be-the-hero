import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import api from '../../services/api'

import { Feather } from '@expo/vector-icons'
import logoIMG from '../../assets/logo.png'
import styles from './styles';

const Detail = () => {

  const route = useRoute();
  const incident = route.params.incident

  const navigation = useNavigation()
  const message = `Hello ${incident.name}, I'm getting in touch because would like to help with the incident "${incident.title}" with the value of ${Intl.NumberFormat('en', { style: 'currency', currency: 'GBP' }).format(incident.value)}.`

  function navigateBack() {
    navigation.navigate('Incidents')
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: incident.title,
      recipients: [`${incident.email}`],
      body: message
    })
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.phone}&text=${message}`)
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoIMG} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident} >
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} </Text>

        <Text style={styles.incidentProperty}>City:</Text>
        <Text style={styles.incidentValue}>{incident.city} / {incident.district}</Text>

        <Text style={styles.incidentProperty}>Incident:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Value:</Text>
        <Text style={[styles.incidentValue, { marginBottom: 0 }]}>{Intl.NumberFormat('en', { style: 'currency', currency: 'GBP' }).format(incident.value)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero of that incident.</Text>

        <Text style={styles.heroDescription}>Get in touch:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
export default Detail;
