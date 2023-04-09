import React from "react";
import { useState, useEffect } from "react";

import * as Location from "expo-location";

import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";

const PostScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);

    useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

 
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              marginHorizontal: 16,
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200, marginTop: 10 }}
            />
            <View style={styles.titleWrapper}>
              <Text>{item.formValues.title}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.commentsCountWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Comments", {item})}
                >
                  <Feather name="message-circle" size={24} color="black" />
                </TouchableOpacity>
                <Text>0</Text>
              </View>
              <View style={styles.locationWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate("Map", {location, item})}>
                  <Feather
                    name="map-pin"
                    size={18}
                    color="#BDBDBD"
                    style={styles.mapIcon}
                  />
                </TouchableOpacity>

                <Text style={styles.locationText}>
                  {item.formValues.location}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationWrapper: {
    flex: 1,
    flexDirection: "row",
    width: 300,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 19,
  },
  titleWrapper: {
    marginTop: 8,
    marginBottom: 11,
    width: 300,
  },
  commentsCountWrapper: {
    flexDirection: "row",
    flexGrow: 2,
  },
});
