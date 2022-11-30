import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { BLOCKED_PAGES } from 'next/dist/shared/lib/constants';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactMarkdown from 'react-markdown';
import { auth, db } from '../../Firebase';
import picture from "/pages/Blog.png"
const Post = () => {
    const [post, setPost] = useState([])
    const [date, setDate] = useState("")
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([]);
    const router = useRouter(); 
    const { id } = router.query;

    const provider = new GoogleAuthProvider(); 

    const [user, loading] = useAuthState(auth);

    const getData = async () => {
        const docRef = doc(db, "posts", id); 
        const docSnap = await getDoc(docRef); 

        if (docSnap.exists()){
            setPost(docSnap.data());
        } else {
            alert("Document doesn't exist")
        }

        const setsRef = collection(db, `posts/${id}/comments`); 
        await getDocs(setsRef).then((response) => {
        setComments(response.docs.map((data) => {
          return {...data.data(), id: data.id}
        })); 
      });
    }

    const notUser = () => {
        signInWithPopup(auth, provider)
    }

    const addComment = async () => {
        await setDoc(doc(db, `posts/${id}/comments`, comment), {
            comment: comment, 
            user: user.displayName,
        })

        getData(); 
        setComment("")
    }

    const deleteComment = async (comment) => {
        await deleteDoc(doc(db, `posts/${id}/comments/${comment}`))
        getData();
    }

    useEffect(() => {
        getData(); 
       
    }, [])
  return (
    <div className='container'>
    <Head>
        <title>Dom's Blog: {post.title}</title>
    </Head>
        <h1>{id}</h1>
        <hr />
        <ReactMarkdown>{post.content}</ReactMarkdown>
        <hr />
        {user ? (
            <div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='comment' />
                <br />
                <button onClick={addComment}>Comment</button>
            </div>
        ) : <button onClick={notUser}>Login to Add Comment</button>}
        {comments.map((comment) => {
            return (
                <div className='comment-container'>
                <p className='comment-p'>{comment.comment}</p>
                <small className='comment-small'>{comment.user}</small>
                {user.displayName == comment.user ? <button onClick={() => deleteComment(comment.comment)}>Delete Post</button> : ""}
                </div>
            )
        })}
    </div>
  )
}

export default Post