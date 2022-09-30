import { dbConnect } from "./connect.js"
const db = dbConnect();

function handleError(err, res) {
    console.log(err);
    res.status(500).send(err);
}

const getPosts = (req, res) => {
    db.collection('posts')
        .get()
        .then((collection) => {
            const allPosts = collection.docs.map((doc) => doc.data())
            res.send(allPosts)
        })
}

const addPost = (req, res) => {
    const newPost = req.body
    db.collection('posts')
        .add(newPost)
        .then((doc) => {
            res.status(201).send({
                success: true,
                docId: doc.id
            });
        })
        .catch((err) => handleError(err, res))

}

const deletePost = (req, res) => {
    const docRef = req.params.docId
    db.collection('posts').doc(docRef).delete()
        .then(res.status(200).send('Successful Delete'))
        .catch((err) => handleError(err, res))
}

const updatePost = (req, res) => {
    const docRef = req.params.docId
    const postUpdate = req.body
    db.collection('posts').doc(docRef).update(postUpdate)
        .then((doc) => res.status(200).send(`Successfully updated doc: ${doc.id}`))
        .catch((err) => handleError(err, res))
}

export const functions = {
    getPosts,
    addPost,
    deletePost,
    updatePost
}