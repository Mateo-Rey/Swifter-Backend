import express from 'express'
import cors from 'cors'
import functions from 'firebase-functions'
import { routes } from './functions.js'

const {getPosts, addPost, deletePost, updatePost} = routes

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3004, console.log("listening on port 3004"))


app.get('/posts', getPosts)
app.post('/add-post', addPost)
app.delete('/delete-post/:docId', deletePost)
app.put('/update-post/:docId', updatePost)

export const api = functions.https.onRequest(app)