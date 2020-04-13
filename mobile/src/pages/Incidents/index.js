import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  async function fetchData(isRefresh) {
    const response = await api.get("incidents", !isRefresh && { params: { page } });

    isRefresh
      ? setIncidents(response.data)
      : setIncidents([...incidents, ...response.data]);

    setTotal(response.headers["x-total-count"]);
    isRefresh
      ? setPage(2)
      : setPage(page + 1);
    console.log('"page" after request: ', page)
    setLoading(false);
  }

  async function refreshIncidents() {
    if (loading) {
      return;
    }

    setLoading(true);

    // setPage(1);

    fetchData((isRefresh = true));
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length == total) {
      return;
    }

    setLoading(true);
    console.log('carregando incidents')
    fetchData((isRefresh = false));
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
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
      <Text style={styles.description}>
        Choose one of the bellow incidents and save the day!
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        ListFooterComponent={total !== 0 && loading && <ActivityIndicator style={styles.loading} />}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshIncidents} />
        }
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Incident:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Description:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>City:</Text>
            <Text style={styles.incidentValue}>{incident.city}</Text>

            <Text style={styles.incidentProperty}>Value:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("en", {
                style: "currency",
                currency: "GBP",
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>More Details</Text>
              <Feather name="arrow-right" size={16} color="#e02041"></Feather>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
