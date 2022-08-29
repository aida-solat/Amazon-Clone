import React from "react";
import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      {products.slice(0, 4).map(({ id, ...productInfo }) => (
        <Product key={id} id={id} product={productInfo} />
      ))}

      <img
        className='md:col-span-full'
        src='https://links.papareact.com/dyz'
        alt='banner'
      />

      <div className='md:col-span-2'>
        {products.slice(4, 5).map(({ id, ...productInfo }) => (
          <Product key={id} id={id} product={productInfo} />
        ))}
      </div>

      {products.slice(5, products.length).map(({ id, ...productInfo }) => (
        <Product key={id} id={id} product={productInfo} />
      ))}
    </div>
  );
};

export default ProductFeed;
