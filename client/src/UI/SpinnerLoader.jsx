import React from "react";
import { ThreeCircles } from "react-loader-spinner";

function SpinnerLoader({ message }) {
  return (
    <div className='flex self-center items-center gap-9'>
      <ThreeCircles
        height='120'
        width='120'
        color='#4fa94d'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='three-circles-rotating'
      />
      <h2 className='text-3xl font-bold text-gray-700'>{message}</h2>
    </div>
  );
}

export default SpinnerLoader;
