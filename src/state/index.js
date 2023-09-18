import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: "light",
  user:null,
  token:null,
  posts:[],

}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state)=>{
        state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogin: (state,action)=>{
        state.user = action.payload.user
        state.token = action.payload.token
    },
    setUser: (state,action)=>{
        state.user = action.payload
    },
    setLogout: (state,action)=>{
        state.user = null
        state.token = null
    },
    setPosts: (state,action)=>{
        console.log("payload",action.payload)
        state.posts = action.payload
    },
    setFriend: (state,action)=>{
        if(state.user){
            state.user.friends= action.payload
        }
    },
    setPost: (state,action)=>{
        const updatedPosts = state.posts.map((post)=>{
            if(post._id===action.payload.postId){
                return action.payload.post
            }else{
                return post
            }
        })
        state.posts = updatedPosts
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMode, setLogin, setLogout, setPosts, setFriend, setPost,setUser } = authSlice.actions

export default authSlice.reducer