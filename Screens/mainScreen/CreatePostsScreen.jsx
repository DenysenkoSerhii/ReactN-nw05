import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { View, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";

const CreatePostScreen = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [startCamera, setStartCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef();
  const [formValues, setFormValues] = useState({ title: "", location: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocus, setIsFocus] = useState({
    title: false,
    location: false,
  });


  useEffect(() => {
    if (formValues.title && formValues.location) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formValues]);

  const makePhoto = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    setPhoto(photo.uri);
  };

  
  const cleanPhoto = () => {
    setPhoto('');
    setFormValues({ title: "", location: "" });
  }

  const sendPhotoInfo = () => {
    navigation.navigate("Posts", { photo, formValues });
  };


  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  return (
    <View style={styles.container}>
      {startCamera ? (
        <>
          {!isShowKeyboard && (
            <Camera style={styles.camera} ref={cameraRef}>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{flex:1}}
                  />
                </View>
              )}
              <TouchableOpacity style={styles.snapWrapper} onPress={makePhoto}>
                <Entypo name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          )}
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            {!photo ? (
              <Text style={styles.text}>Download photo</Text>
            ) : (
              <Text onPress={cleanPhoto} style={styles.text}>Edit photo</Text>
            )}
            {photo && (
              <View style={styles.photoInfoWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Name..."
                  value={formValues.title}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsFocus({ ...isFocus, title: true });
                  }}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                    Keyboard.dismiss();
                    setIsFocus({ ...isFocus, title: false });
                  }}
                  onChangeText={(value) => {
                    setFormValues({ ...formValues, title: value });
                  }}
                />
                <View style={styles.inputMapWrapper}>
                  <Feather
                    name="map-pin"
                    size={18}
                    color="#BDBDBD"
                    style={styles.mapIcon}
                  />
                  <TextInput
                    style={styles.inputMap}
                    placeholder="Location..."
                    value={formValues.location}
                    onChangeText={(value) =>
                      setFormValues({ ...formValues, location: value })
                    }
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocus({ ...isFocus, location: true });
                    }}
                    onBlur={() => {
                      setIsShowKeyboard(false);
                      Keyboard.dismiss();
                      setIsFocus({ ...isFocus, location: false });
                    }}
                  />
                </View>
              </View>
            )}
            {photo && (
              <>
                <TouchableOpacity
                  style={[
                    styles.publishButton,
                    !isFormValid && styles.disabledPublishButton,
                  ]}
                      onPress={() => {
                      if (isFormValid) {
                        sendPhotoInfo();
                      }
                    }}
                >
                  <Text
                    style={{
                      ...styles.publishButtonText,
                      color: isFormValid ? "#FFFFFF" : "#BDBDBD",
                    }}
                  >
                    Publish
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cleanBtnWrapper} onPress={cleanPhoto}>
                  <Feather name="trash-2" size={24} color="#DADADA" />
                </TouchableOpacity>
              </>
            )}
          </KeyboardAvoidingView>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffff'
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 8,
  },

  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    width: 100,
    height:100
  },

  snapWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },

  publishButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    height: 51,
    marginTop: 30,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom:30
  },

  disabledPublishButton: {
    backgroundColor: "#F6F6F6",
  },

  publishButtonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },

  text: {
    marginLeft: 16,
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  photoInfoWrapper: {
    marginHorizontal: 16,
  },

  inputMapWrapper: {
    position: "relative",
  },

  input: {
    marginTop: 32,
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  mapIcon: {
    position: "absolute",
    top: 24,
  },
  inputMap: {
    marginTop: 10,
    paddingLeft: 20,
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  cleanBtnWrapper: {
    marginLeft: 'auto',
    marginRight:'auto',
    width: 70,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius:20,
  }
});
