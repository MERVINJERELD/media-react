import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import Post from "./Post";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import PostLayout from "./PostLayout";
import { useState }from "react";
import {useEffect }from "react";
import {format, set} from "date-fns";
import { Routes,Route,useNavigate } from "react-router-dom";
import apiRequest from "./apiRequest";
function App() {
  const[posts,setPosts]=useState([])
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const[postTitle,setPostTitle]=useState('')
  const[postBody,setPostBody]=useState('')
  const [fetchError,setFetchError]=useState(null)
  const [isLoading,setIsLoading]=useState(true)
  const navigate=useNavigate()
  useEffect(()=>{
    const filteredResults=posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())||
    ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  },[posts,search])
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const id=posts.length?posts[posts.length-1].id+1:1;
    const datetime =format(new Date(),'MMMM dd,yyyy pp');
    const newPost ={id, title:postTitle,datetime,
    body:postBody};
    const allPosts=[newPost,...posts];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/')
    const postOptions={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newPost)
    }
    const result=await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)
  }
  const handleDelete=async (id)=>{
    const postsList=posts.filter(post=>post.id!==id);
    setPosts(postsList);
    navigate('/')
    const deleteOptions={method:'DELETE'}
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,deleteOptions)
    if(result) setFetchError(result)
  }
  const API_URL='http://localhost:3500/items';
  useEffect(()=>{
    const fetchItems =async()=>{
      try{
        const response= await fetch( API_URL);
        console.log(response);
        if(!response.ok)throw Error("data not received");
        const listItems=await response.json();
        console.log(listItems);
         setPosts(listItems);
         setFetchError(null)
      }catch (err){
        setFetchError(err.message)
     }finally{
      setIsLoading(false)
     }
    }
     setTimeout(()=>{
      (async () =>await fetchItems())()
     },2000)
  },[])
  
  return (
    <div className="App">
   
      <Header title="Mervin Social Media"/>
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
      <Route path="/" element={<main>{isLoading &&
      <p>Loading items..</p>}
      {fetchError &&
      <p>{`Error:${fetchError}`}</p>}
      {!isLoading &&  !fetchError &&
      <Home posts={searchResults}/>}</main>}/>
      <Route path="post">
         <Route index element={<NewPost
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
           postBody={postBody}
          setPostBody={setPostBody}
        />}/>
      <Route path=":id" element={ 
      <PostPage posts={posts}
         handleDelete={handleDelete}/>}/>
         </Route>
       <Route path="about" element={<About/>}/>
       <Route path="*" element={<Missing/>}/>
     </Routes>
      <Footer/>
    </div>
  );
}

export default App;
