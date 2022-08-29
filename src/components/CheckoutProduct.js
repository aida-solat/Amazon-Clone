import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from '../slices/cartSlice';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

const CheckoutProduct = ({
  id,
  title,
  price,
  totalPrice,
  description,
  category,
  rating,
  image,
  hasPrime,
  quantity,
}) => {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    const product = {
      id,
      category,
      image,
      title,
      description,
      price,
      rating,
      hasPrime,
    };
    dispatch(addToCart(product));
  };

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id }));
  };

  const decreaseItemQuantity = () => {
    dispatch(decreaseQuantity({ id }));
  };

  return (
    <div className='grid grid-cols-5'>
      <Image src={image} height={200} width={200} objectFit='contain' />
      <div className='col-span-3 mx-5'>
        <p className='font-bold'>{title}</p>
        <div className='flex'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <div className='flex'>
          <Currency quantity={totalPrice} />
          <p className='ml-4'>Items: {quantity}</p>
        </div>
        <div className='flex mt-1 items-center space-x-1'>
          <MinusIcon
            onClick={decreaseItemQuantity}
            className='w-5 h-5 cursor-pointer rounded-sm border text-gray-700 border-gray-700'
          />
          <PlusIcon
            onClick={addItemToCart}
            className='w-5 h-5 cursor-pointer rounded-sm border text-gray-700 border-gray-700'
          />
        </div>
        {hasPrime && (
          <div className='flex items-center space-x-2'>
            <img
              loading='lazy'
              src='https://links.papareact.com/fdw'
              alt='prime logo'
              className='w-12'
            />
            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <button
        className='button justify-self-end self-end'
        onClick={removeItemFromCart}
      >
        Remove from Cart
      </button>
    </div>
  );
};

export default CheckoutProduct;
