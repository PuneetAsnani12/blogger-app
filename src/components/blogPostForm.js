import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export const BlogPostForm = ({ titleP, contentP, onSubmit }) => {
  const [title, setTitle] = useState(titleP);
  const [content, setContent] = useState(contentP);
  return(
    <View style={styles.container}>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        multiline={true}
        onContentSizeChange={(e) => {
          e.nativeEvent.contentSize.height;
        }}
        style={styles.contentInput}
        value={content}
        onChangeText={(Content) => setContent(Content)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          let summary;
          if (content.length > 50) {
            summary = content.slice(0, 50);
          } else {
            summary = content;
          }
          onSubmit(title, content,summary);
        }}
      >
        <Text style={styles.buttonText}>Save Blog Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    paddingTop: 15,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
  },
  button: {
    backgroundColor: "orange",
    borderWidth: 5,
    borderColor: "#aaa",
    borderRadius: 10,
    height: 70,
    width: 170,
    padding: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  label: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    padding: 5,
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
  },
  titleInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 40,
    padding: 5,
    margin: 5,
    marginLeft: 10,

    backgroundColor: "white",
    borderRadius: 7,
  },
  contentInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 40,
    padding: 5,
    margin: 5,
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 7,
  },
});
