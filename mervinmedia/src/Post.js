import {Link} from "react-router-dom";
const Post = ({post}) => {
  return (
    <article className="post">
      <Link to={`post/${post.id}`}> <h2>{post.title}</h2>
        <p >{post.datetime}</p> 
        </Link>
        <p style={{
          marginLeft: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
          fontStyle: "italic",
        }}>
            {
                (post.body).length<=25? post.body
                :`${(post.body).slice(0,25)}...` 
            }           
       </p>
    </article>
  )
}
export default Post