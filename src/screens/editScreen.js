import React, { useContext, useState } from "react";
import { BlogPostForm } from "../components/blogPostForm";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const editScreen = ({ navigation }) => {
  const blogId = navigation.getParam("id");
  const { state, editBlogPost } = useContext(Context);
  const blogPost = state.find((blogPost) => blogPost.id === blogId);
  return (
    <BlogPostForm
      titleP={blogPost.title}
      contentP={blogPost.content}
      onSubmit={(title, content, summary) => {
        editBlogPost(title, content, blogId, summary, () => {
          navigation.pop();
        });
      }}
    ></BlogPostForm>
  );
};

const styles = StyleSheet.create({});

editScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Editing this Blog",
  };
};

export default editScreen;
