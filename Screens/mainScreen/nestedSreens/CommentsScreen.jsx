import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";

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
  Image,
  FlatList,
} from "react-native";

const CommentScreen = ({ route }) => {
  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.item.photo);
    }
  }, [route.params]);

  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [commentsArr, setCommentsArr] = useState(null);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setCommentsArr([]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await AsyncStorage.getItem("@items");
        console.log("data in getItems", data);
        const items = data !== null ? JSON.parse(data) : [];
        console.log("items in getItems", items);
        setCommentsArr([...items]);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, []);

  const setItems = async () => {
    try {
      setCommentsArr((prevState) => [...prevState, comment]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false)
  }

  useEffect(() => {
    AsyncStorage.setItem("@items", JSON.stringify(commentsArr));
  }, [commentsArr]);

  return (
      <View style={styles.container}>
        {!isShowKeyboard && <View style={styles.photoWrapper}>
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
          />
        </View>}
        <FlatList
          data={commentsArr}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentWrapper}>
              <Text style={styles.comments}>{item.comment}</Text>
            </View>
          )}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholderTextColor="#BDBDBD"
            placeholder="Write a comment..."
            onChangeText={(value) => setComment({ comment: value })}
            style={styles.input}
            value={comment}
            onBlur={keyboardHide}
            onFocus={()=>setIsShowKeyboard(true)}
          />
          <TouchableOpacity onPress={setItems} style={styles.btnWrap}>
            <AntDesign name="arrowup" size={24} color="#ffff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={clearAll}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoWrapper: {
    marginTop: 32,
    marginBottom: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    height: 240,
  },

  inputWrapper: {
    backgroundColor: "#E8E8E8",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    left: 16,
    right: 16,
    bottom: 16,
    height: 50,
    borderRadius: 100,
    paddingHorizontal: 16,
  },

  btnWrap: {
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 17,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  commentWrapper: {
    marginBottom: 12,
    marginTop: 12,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },

  comments: {
    color: "#212121",
    fontSize: 13,
    lineHeight: 18,
  },
});
