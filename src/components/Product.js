import React, { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const MAX_RATING = 1;
const MIN_RATING = 5;

const Product = ({ product, id }) => {
  const { category, image, title, description, price } = product;

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  const dispatch = useDispatch();

  const addItemToCart = () => {
    const product = {
      id,
      category,
      image,
      title,
      description,
      price,
      totalPrice: price,
      rating,
      hasPrime,
      quantity: 1,
    };

    dispatch(addToCart(product));
  };

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 italic text-gray-400'>{category}</p>
      <Image src={image} height={200} width={200} objectFit='contain' />
      <h4 className='my-3'>{title}</h4>
      <div className='flex'>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}
      </div>
      <p className='text-xs my-2 line-clamp-2'>{description}</p>
      <div className='mb-5'>
        <Currency quantity={price} />
      </div>
      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img
            className='w-12'
            src='https://links.papareact.com/fdw'
            alt='Amazon prime logo'
          />
          <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToCart} className='mt-auto button'>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
