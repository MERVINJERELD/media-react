const NewPost =({
    handleSubmit ,postTitle,setPostTitle,
    postBody,setPostBody})=>{
   return (
    <main className="NewPost">
        <h2>New Post</h2>
        <form className="newPostForm" onSubmit={handleSubmit}>
           <label style={{    marginLeft: "4px",
               fontSize: "16px",
             fontWeight: "bold",
             marginTop:"20px",
             color: "#333",}} htmlFor="postTitle">Title</label> 
           <input  style={{margin:"12px"}}
              id="postTitle"
              type="text"
              required
              value={postTitle}
              onChange={(e)=>setPostTitle(e.target.value)}
              />
             <label style={{    marginLeft: "4px",
               fontSize: "16px",
             fontWeight: "bold",
             color: "#333",}} htmlFor="postBody">Post:</label>  
             <textarea style={{margin:"12px"}}
               id="postBody"
               required
               value={postBody}
               onChange={(e)=>setPostBody(e.target.value)}
               />
               <button type="submit">Submit</button>
        </form>
    </main>
   )
}
export default NewPost