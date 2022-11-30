import {TbBrandJavascript, TbBrandNextjs} from "react-icons/tb"
import {RiCss3Fill, RiHtml5Fill, RiReactjsFill} from "react-icons/ri"
import {DiJava, DiMongodb, DiNodejsSmall, DiPython} from "react-icons/di"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../Firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { async } from "@firebase/util"
export default function Home() {
  const [posts, setPosts] = useState([]); 
  const [user, loading] = useAuthState(auth); 
  const provider = new GoogleAuthProvider(); 
  const router = useRouter();
  const login = () => {
    signInWithPopup(auth, provider).then((user) => {
      console.log(user.user)
    })
  }
  
  const getData = async () => {
    const setsRef = collection(db, "posts"); 
    await getDocs(setsRef).then((response) => {
        setPosts(response.docs.map((data) => {
          return {...data.data(), id: data.id}
        })); 
      });
}

const deletePost = async (post) => {
  await deleteDoc(doc(db, `posts/${post}`))
  getData();
}

useEffect(() => {
  getData();
}, [])
  return (
    <div>
      <div className='header'>
        <h1>Dominique Desert</h1>
        <p>Engineer, Developer</p>
      </div>

      <div className='container'>
      <h2 className="icon-holder">Languages I Know: <TbBrandNextjs className="icon"/><RiReactjsFill className="icon"/><RiHtml5Fill className="icon"/><RiCss3Fill className="icon"/><TbBrandJavascript className="icon"/></h2>
      <h2 className="icon-holder">Languages I am Learning: <DiPython className="icon"/><DiJava className="icon"/><DiMongodb className="icon"/><DiNodejsSmall className="icon"/></h2>
      <hr />
      <h2 className="heading">Posts</h2>
      <div className="posts">
      {!user ? <button onClick={login}>Login</button> : <button onClick={() => auth.signOut()}>Logout</button>}
      {user && user.email === "dominiquedesertb@gmail.com" ? <button onClick={() => router.push("/CreateBlogPost")}>Create Post</button>  : ""}
      </div>
      <ul>
        {posts.map((post) => {
          return <div><span className="post-title" onClick={() => router.push(`/Post/${post.title}`)}>{post.title} - {post.dateAdded.toDate().toDateString()}</span><br /><p>{post.shortDescript}</p>{user.email === "dominiquedesertb@gmail.com" ? <button onClick={() => deletePost(post.title)}>Delete Post</button> : ""}</div>
        })}
      </ul>
      </div>


    </div>
  )
}
