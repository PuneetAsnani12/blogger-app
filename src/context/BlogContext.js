import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";
const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    // case "add_blogpost":
    //   return [
    //     ...state,
    //     {
    //       title: action.payload.title,
    //       id: Math.floor(Math.random() * 99999),
    //       content: action.payload.content,
    //     },
    //   ];

    case "edit_blogpost": {
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    }

    case "delete_blogpost":
      return state.filter((blogPost) => {
        return blogPost.id !== action.payload;
      });

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};
const addBlogPost = (dispatch) => {
  return async (title, content,summary, cb) => {
    await jsonServer.post("/blogposts", { title, content,summary });
    // dispatch({
    //   type: "add_blogpost",
    //   payload: {
    //     title,
    //     content,
    //   },
    // });
    cb ? cb() : null;
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (title, content, id,summary, cb) => {

    await jsonServer.put(`/blogposts/${id}`, { title, content,summary });

    dispatch({ type: "edit_blogpost", payload: { title, id, content,summary } });
    cb ? cb() : null;
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
