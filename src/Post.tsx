import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import type { Post } from './app/_types/Post'
 
const Post: React.FC = () => {
  const { id } = useParams<string>();
  const [post, setPost] = useState<Post>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const findPost = async () => {
      try {
        const response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        const data = await response.json() as { post: Post };
        setPost(data.post);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    findPost();
  }, [id]);

  const changeDateFormat = (date: string) => date.substring(0, date.indexOf('T')).replace(/-/g, '/');

  if (isLoading) return <div>読み込み中...</div>;
  if(!post) return <div>記事が見つかりませんでした</div>;

  return (
    <div className="pt-14 flex flex-col items-center">
      <div className='max-w-3xl' >
        <img src="https://placehold.jp/800x400.png" alt="Placeholder"/>
      </div>
      <div className='max-w-3xl py-4'>
        <div className='flex justify-between'>
          <div className='text-xs text-gray-400'>{changeDateFormat(post.createdAt)}</div>
          <div className='flex gap-2'>
            {post.categories.map((tag) => (
              <div className='border border-solid border-blue-600 rounded px-2 py-1 text-xs text-blue-600' key={tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <h1 className='text-2xl my-4'>
          {post.title}
        </h1>
        <div>
          {parse(post.content)}
        </div>
      </div>
    </div>
  );
};

export default Post;
