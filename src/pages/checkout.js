import React from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import { selectQuantity, selectTotalPrice } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key);

const checkout = () => {
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  const totalQuantity = useSelector(selectQuantity);
  const total = useSelector(selectTotalPrice);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon Clone - Checkout</title>
      </Head>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto min-h-screen'>
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0
                ? 'Your Amazon Cart is Empty'
                : `Your Shopping Cart`}
            </h1>
            {items.map(
              (
                {
                  id,
                  title,
                  rating,
                  price,
                  totalPrice,
                  description,
                  category,
                  image,
                  hasPrime,
                  quantity,
                },
                i
              ) => (
                <CheckoutProduct
                  key={i}
                  id={id}
                  title={title}
                  image={image}
                  rating={rating}
                  price={price}
                  totalPrice={totalPrice}
                  description={description}
                  category={category}
                  hasPrime={hasPrime}
                  quantity={quantity}
                />
              )
            )}
          </div>
        </div>

        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap font-semibold'>
                Subtotal ({totalQuantity} items):&nbsp;
                <span>
                  <Currency quantity={total} />
                </span>
              </h2>
              <button
                role='link'
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session
                    ? 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                    : ''
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default checkout;
