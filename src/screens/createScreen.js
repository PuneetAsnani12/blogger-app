import React, { useContext, useState } from "react";
import { BlogPostForm } from "../components/blogPostForm";

import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const createScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);
  return (
    <BlogPostForm
      onSubmit={(title, content,summary) => {
        addBlogPost(title, content,summary, () => {
          navigation.navigate("index");
        });
      }}
      titleP=""
      contentP=""
    />
  );
};

const styles = StyleSheet.create({});
createScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Create a Blog",
  };
};


export default createScreen;
