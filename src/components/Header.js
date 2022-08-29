import React, { useState } from 'react';
import Image from 'next/image';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  LoginIcon,
  LogoutIcon,
  XIcon,
} from '@heroicons/react/outline';
import Menu from './Menu';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectQuantity } from '../slices/cartSlice';

const menu = [
  {
    menuItemTitle: 'Digital Content & Devices',
    menuItems: ['Amazon Music', 'Kindle E-Readers', 'Appstore For Android'],
  },
  {
    menuItemTitle: 'Shop By Department',
    menuItems: ['Electronics', 'Computers', 'Smart Home', 'Arts & Crafts'],
  },
  {
    menuItemTitle: 'Programs & Features',
    menuItems: [
      'Give A Gift Card',
      '#FoundItOnAmazon',
      'Amazon Live',
      'International Shopping',
    ],
  },
  {
    menuItemTitle: 'Help & Settings',
    menuItems: [
      'Your Account',
      'Lang: English',
      'Country: US',
      'Customer Service',
      'Sign in',
    ],
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session } = useSession();

  const toggleMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  const quantity = useSelector(selectQuantity);

  return (
    <header>
      <nav className={`nav slide ${menuOpen ? 'open' : 'close'}`}>
        <button
          className='flex items-center p-3 text-left text-[1.4rem] font-bold text-white bg-amazon_blue-light w-full'
          onClick={!session ? signIn : signOut}
        >
          <span className='w-7 h-7 mr-4 bg-white rounded-full flex items-center justify-center'>
            {session ? (
              <LoginIcon className='h-6 text-amazon_blue-light' />
            ) : (
              <LogoutIcon className='h-6 text-amazon_blue-light' />
            )}
          </span>
          {session ? `Hello, ${session.user.name}` : 'Sign in'}
        </button>
        {menu.map((item, i) => (
          <Menu
            key={i}
            menuItemTitle={item.menuItemTitle}
            menuItems={item.menuItems}
          />
        ))}
      </nav>

      {menuOpen && (
        <XIcon
          className='cursor-pointer h-8 absolute top-3 left-[81%] md:left-[51%] lg:left-[36%] xl:left-[21%] z-50 text-white'
          onClick={() => setMenuOpen(false)}
        />
      )}

      {menuOpen && (
        <div
          className='absolute w-full h-full bg-black opacity-75 z-40'
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
        <Link href='/'>
          <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
            <Image
              src='https://links.papareact.com/f90'
              width={150}
              height={40}
              objectFit='contain'
              className='cursor-pointer'
            />
          </div>
        </Link>

        <div className='hidden sm:flex flex-grow cursor-pointer items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500'>
          <input
            type='text'
            className='p-2 h-full w-6 flex-grow flex=shring rounded-l-md focus:outline-none'
          />
          <SearchIcon className='h-12 p-4' />
        </div>

        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div className='link' onClick={!session ? signIn : signOut}>
            {session ? `Hello, ${session.user.name}` : 'Sign in'}
            <p className='bold'>Account & Lists</p>
          </div>

          <Link href='/orders'>
            <div className='link'>
              <p>Returns</p>
              <p className='bold'>& Orders</p>
            </div>
          </Link>

          <Link href='/checkout'>
            <div className='relative link flex items-center'>
              <span className='absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold'>
                {quantity}
              </span>
              <ShoppingCartIcon className='h-10' />
              <p className='bold hidden md:inline mt-2'>Cart</p>
            </div>
          </Link>
        </div>
      </div>

      <div className='flex space-x-3 p-2 pl-6 items-center bg-amazon_blue-light text-white text-sm'>
        <button className='link flex items-center' onClick={toggleMenu}>
          <MenuIcon className='h-6 mr-1' />
          All
        </button>
        <p className='link'>Prime Video</p>
        <p className='link'>Amazon Business</p>
        <p className='link'>Today's Deals</p>
        <p className='link hidden lg:inline-flex'>Electronics</p>
        <p className='link hidden lg:inline-flex'>Food & Grocery</p>
        <p className='link hidden lg:inline-flex'>Prime</p>
        <p className='link hidden lg:inline-flex'>Buy Again</p>
        <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
        <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
