import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm<FormValues>();
  
  type FormValues = {
    name: string,
    email: string,
    message: string
  }

  const onsubmit:SubmitHandler<FormValues> = async(data) => {
    try{
      await axios.post('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', data);
      window.alert('送信しました');
      reset();
    }catch(error){
      window.alert('メール送信に失敗しました');
    }
  }

  return(
    <>
    <div className='mt-10 m-auto max-w-3xl'>
      <h1 className='text-xl font-bold mb-10'>問い合わせフォーム</h1>
      <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-8' noValidate>
        <div className='flex justify-between items-center'>
          <label htmlFor="name" className='w-60'>
            お名前
          </label>
          <div className='w-full flex flex-col'>
            <input 
              id='name'
              type='text'
              className='border border-solid border-gray-300 rounded-lg p-4'
              disabled={isSubmitting}
              {...register('name', {
                required: 'お名前は必須です。',
                maxLength: {
                  value: 30,
                  message: 'お名前は30文字以内で入力してください。'
                }
              })}
            />
            <p className='text-sm text-red-700'>{errors.name?.message}</p>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <label htmlFor='email' className='w-60'>
            メールアドレス
          </label>
          <div className='w-full flex flex-col'>
            <input 
              id='email'
              type='email'
              className='border border-solid border-gray-300 rounded-lg p-4 w-full'
              disabled={isSubmitting}
              {...register('email', {
                required: 'メールアドレスは必須です。',
                pattern: {
                  value: /[a-z\d+\-.]+@([a-z\d-]+(?:\.[a-z]+)*)/i,
                  message: 'メールアドレスの形式で入力してください。'
                }
              })}
            />
            <p className='text-sm text-red-700'>{errors.email?.message}</p>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <label htmlFor='message'className='w-60'>
            本文
          </label>
          <div className='w-full flex flex-col'>
            <textarea 
              id='message'
              className='border border-solid border-gray-300 rounded-lg p-4 w-full h-60'
              disabled={isSubmitting}
              {...register('message', {
                required: '本文は必須です。',
                maxLength: {
                  value: 500,
                  message: '本文は500文字以内で入力してください。'
                }
              })}
            />
            <p className='text-sm text-red-700'>{errors.message?.message}</p>
          </div>
        </div>
        <div className='flex justify-center gap-4'>
          <button 
            type="submit"
            className='bg-gray-800 rounded-lg text-white py-2 px-4'
            disabled={isSubmitting}
          >送信</button>
          <button
            type="button"
            className='bg-gray-200 rounded-lg py-2 px-4'
            disabled={isSubmitting}
            onClick={() => reset()}
          >クリア</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Contact;