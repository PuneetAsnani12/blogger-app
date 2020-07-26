import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

const indexScreen = ({ navigation }) => {
  const { state, getBlogPosts, deleteBlogPost } = useContext(Context);

  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);
  return (
    <View>
      {/* <Spinner
        visible={state.length}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      /> */}
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                <Text style={{}}>
                  {item.summary.length === 50
                    ? item.summary + "..."
                    : item.summary}
                </Text>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 28,
                    alignSelf: "flex-end",
                  }}
                  onPress={() => deleteBlogPost(item.id)}
                >
                  <Feather style={styles.icon} name="trash" color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
  );
};

indexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("create")}>
        <Feather style={styles.iconStyle} name="plus" color="black" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "gray",
    margin: 10,
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 24,
    marginBottom: 3,
  },
  icon: {
    fontSize: 35,
  },
  iconStyle: {
    fontSize: 35,
    marginRight: 15,
  },
});

export default indexScreen;
