import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../Firebase'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useRouter } from 'next/router'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import Head from 'next/head'

const CreateBlogPost = () => {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState(""); 
    const [short, setShort] = useState("")
    const [user, loading] = useAuthState(auth);

    const router = useRouter(); 

    if (loading) {
        return <h1 className='loading'>Loading...</h1>
    }

    const createPost = async () => {
        await setDoc(doc(db, "posts", title),  {
            title: title, 
            dateAdded: Timestamp.now(),
            content: content,
            shortDescript: short,
        })

        setTitle("")
        setContent("")
        setShort("")
    }
  return (
    <div>
    <Head>
        <title>Dom's Blog</title>
    </Head>
        {user.email === "dominiquedesertb@gmail.com" ? 
            (
                <div className='container'>
                    <input className='post-input' type="text" placeholder='Blog Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <br />
                    <input className='post-input' maxLength={40} placeholder="Short Description" value={short} onChange={(e) => setShort(e.target.value)} />
                    <br />
                    <textarea className='post-textarea' value={content} onChange={(e) => setContent(e.target.value)}/>
                    <br />
                    <button style={{ width: "150px" }} onClick={createPost}>Add Blog Post</button><button onClick={() => router.push("/")}>Cancel</button>
                    <hr />
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            )
            :
            <h1>You cannot be here. You're not a user.</h1>
        }
    </div>
  )
}

export default CreateBlogPost