import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { useStateContext } from "../contexts/ContextProvider";
import { cartData } from "../data/dummy";
import { Button } from ".";

const Cart = () => {
  const { currentColor, handleClick } = useStateContext();
  const [quantities, setQuantities] = useState(cartData.map(() => 1));

  const increment = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const decrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) newQuantities[index]--;
    setQuantities(newQuantities);
  };

  const calculateTotal = () => {
    return cartData
      .reduce((total, item, idx) => {
        const price =
          typeof item.price === "string"
            ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
            : item.price;
        return total + price * quantities[idx];
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0">
      <div className="float-right h-screen lg:pl-30 duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center mb-6">
          <p className="font-semibold text-lg">Shopping Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
            onClick={() => handleClick("cart")}
          />
        </div>

        {cartData.map((item, index) => (
          <div
            key={index}
            className="flex items-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4"
          >
            <img className="rounded-lg w-24" src={item.image} alt={item.name} />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                {item.category}
              </p>
              <div className="flex gap-4 mt-2 items-center">
                <p className="font-semibold text-lg">{item.price}</p>
                <div className="flex items-center border-1 border-color rounded">
                  <button
                    className="p-2 border-r-1 border-color text-red-600"
                    onClick={() => decrement(index)}
                  >
                    <AiOutlineMinus />
                  </button>
                  <p className="p-2 border-r-1 border-color text-green-600">
                    {quantities[index]}
                  </p>
                  <button
                    className="p-2 text-green-600"
                    onClick={() => increment(index)}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-semibold">${calculateTotal()}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">
              Total (Incl. Taxes)
            </p>
            <p className="font-semibold">${calculateTotal()}</p>
          </div>
        </div>

        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Place Order"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
