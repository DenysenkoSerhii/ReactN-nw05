import React from "react";

import { useState, useEffect } from "react";

import MapView, { Marker } from "react-native-maps";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Platform,
} from "react-native";

const MapScreen = ({ route }) => {
  const { location, item } = route.params;
  console.log("location in maps", location);
  console.log("item", item);
  const [region, setRegion] = useState({
          latitude: 47.788,
          longitude: 30.6661,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        });

  useEffect(() => {
    if (location) {
      setRegion(location);
    }
  }, [location]);

  const onChangeRegion = () => {
    if (!region) return
    setRegion(region);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 47.788,
          longitude: 30.6661,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        onRegionChange={onChangeRegion}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={item.formValues.title}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
