import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import type { Post } from './app/_types/Post';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(()=> {
    const getAllPosts = async() => {
      try {
        const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts');
        const data = await response.json() as { posts: Post[]};
        setPosts(data.posts);
        setLoading(false);
      } catch(error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);

  const changeDateFormat = (date: string) => date.substring(0, date.indexOf('T')).replace(/-/g, '/');

  if(isLoading) return <div>読み込み中...</div>;
  if(!posts.length) return <div>記事が見つかりませんでした</div>;

  return(
    <>
      <div className="pt-10">
        <ul className="flex flex-col gap-8 max-w-3xl m-auto">
          {posts?.map((post)=> {
            return(
              <Link to={`/posts/${post.id}`} key={post.id}>
                <li className='border border-solid border-gray-300 p-4'>
                  <div className='flex justify-between'>
                    <div className='text-xs text-gray-400'>{changeDateFormat(post.createdAt)}</div>
                    <div className='flex gap-2'>
                      {post.categories.map((tag) => {
                        return(
                          <div key={tag} className='border border-solid border-blue-600 rounded px-2 py-1 text-xs text-blue-600'>
                            {tag}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <p className='text-2xl my-4'>
                    {post.title}
                  </p>

                  <div className='line-clamp-2'>
                    {parse(post.content)}
                  </div>
                </li>
              </Link>
              )
            }
          )}
        </ul>
      </div>
    </>
  )
}

export default Home;
