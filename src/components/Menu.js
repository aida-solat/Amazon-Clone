import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';

const Menu = ({ menuItemTitle, menuItems }) => {
  return (
    <ul className='flex flex-col space-y-4 pb-2 border-b-[1px]'>
      <h5 className='text-[1.2rem] font-bold pl-4 pt-4'>{menuItemTitle}</h5>
      {menuItems.map((item, i) => (
        <li
          key={i}
          className='py-2 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-200'
        >
          {item}{' '}
          {menuItemTitle !== 'Help & Settings' && (
            <ChevronRightIcon className='h-6' />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
