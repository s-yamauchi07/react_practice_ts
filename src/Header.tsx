import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return(
    <div className='bg-gray-800'>
      <ul className='flex justify-between p-6 text-white font-bold'>
        <li><Link to="/">Blog</Link></li>
        <li><Link to="/contact">お問い合わせ</Link></li>
      </ul>
    </div>
  )
}

export default Header;
