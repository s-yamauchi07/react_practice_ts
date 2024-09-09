import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

type PostType = {
    id: number,
    title: string,
    createdAt: string,
    categories: string[],
    content: string
}

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(()=> {
    const getAllPosts = async() => {
      try {
        const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts');
        const data = await response.json() as { posts: PostType[]};
        setPosts(data.posts);
        setLoading(false);
      } catch(error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);

  const changeDateFormat = (date: string) => date.substring(0, date.indexOf('T')).replace(/-/g, '/');

  if(isLoading) return <div>読み込み中...</div>

  return(
    <div className="pt-10">
      <ul className="flex flex-col gap-8 max-w-3xl m-auto">
        {posts?.map((post)=> {
          return(
            <li className='border border-solid border-gray-300 p-4' key={post.id}>
              <div className='flex justify-between'>
                <div className='text-xs text-gray-400'>{changeDateFormat(post.createdAt)}</div>
                <div className='flex gap-2'>
                  {post.categories.map((tag) => {
                    return(
                      <div className='border border-solid border-blue-600 rounded px-2 py-1 text-xs text-blue-600' key={tag}>
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
          )
        }
        )}
      </ul>
    </div>
  )
}

export default Home;
