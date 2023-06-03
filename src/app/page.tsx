import "@/app/styles/globals.css";
import Post from "./components/Post";
import { getPageURL } from "./libs/url";

export default function Home() {
  const data = getPageURL();

  return (
    <div>
      <ul className="post-container">
        {data?.map(
          (post, index) =>
            post.slug && (
              <Post
                key={index}
                title={post.title}
                date={post.date}
                href={post.slug}
              />
            )
        )}
      </ul>
    </div>
  );
}
