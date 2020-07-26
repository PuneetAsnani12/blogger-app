import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const showScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const blogId = navigation.getParam("id");
  const blogPost = state.find((blogPost) => blogPost.id === blogId);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{blogPost.title}</Text>
      <Text style={styles.content}>{blogPost.content}</Text>
    </View>
  );
};

showScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("edit", { id: navigation.getParam("id") });
        }}
      >
        <Feather style={styles.iconStyle} name="edit" size={35} color="black" />
      </TouchableOpacity>
    ),
    title: "Your Blog",
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginTop: 30,
    fontSize: 35,
  },
  content: {
    fontSize: 25,
    marginTop: 15,
    marginHorizontal: 10,
    textAlign: "left",
  },
  iconStyle: {
    marginRight: 15,
  },
});

export default showScreen;
