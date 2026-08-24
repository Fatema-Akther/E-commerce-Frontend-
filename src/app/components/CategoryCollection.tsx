"use client";



import { allProducts } from "@/app/data/products";
import { FaCrown, FaShoppingBag, FaTags, FaTshirt } from "react-icons/fa";
import { GiClothes, GiDiamondRing, GiDress, GiSewingMachine, GiWool } from "react-icons/gi";
import { MdOutlineDryCleaning } from "react-icons/md";


const categoryIcons: Record<string, any> = {

  Sarees: GiSewingMachine,

  salwar: GiDress,

  kurta: FaTshirt,

  "Tops & Tunics": GiClothes,

  Dresses: GiDress,

  "Co-ords": FaShoppingBag,

  LUXE: FaCrown,

  Woolen: GiWool,

  Sale: FaTags,


  // Extra Categories
  Lehengas: GiDress,

  "Party Wear": FaCrown,

  "New Arrivals": FaShoppingBag,

  Accessories: GiDiamondRing,

  Footwear: MdOutlineDryCleaning,

};

export default function CategoryCollection() {


  // unique category
  const categories = Array.from(
    new Set(allProducts.map(product => product.category))
  );


  return (
    <section className="py-4 bg-white">

   <h2
  className="
  text-center
  text-black
  text-4xl
  font-bold
  mb-10
  tracking-wide
  "
>
  SHOP BY{" "}
  <span className="text-[#A73153]">CATE</span>
  <span className="text-[#EC1857] relative">
    GORY
    <span
      className="
      absolute
      left-1/2
      -translate-x-1/2
      bottom-[-8px]
      w-1/3
      h-[3px]
      bg-[#EC1857]
      rounded-full
      "
    ></span>
  </span>
</h2>

      <div className="
        max-w-7xl 
        mx-auto
        grid
        grid-cols-3
        sm:grid-cols-5
        md:grid-cols-6
        lg:grid-cols-9
        gap-8
        px-5
      ">


        {categories.map((category)=>{


          const Icon =
            categoryIcons[category] || FaShoppingBag;


          return (

            <div
              key={category}
              className="
group
flex
flex-col
items-center
justify-start
cursor-pointer
min-h-[110px]
"
            >
<div
  className="
  w-14
  h-14
  rounded-full
  bg-[#fff0ed]
  flex
  items-center
  justify-center
  text-[#FF5726]
  transition
  group-hover:scale-110
  "
>
  <Icon
    size={36}
  />
</div>



              <p
                className="
                mt-3
                text-sm
                font-semibold
                uppercase
                text-gray-800
                text-center
                "
              >
                {category}
              </p>


            </div>

          )


        })}


      </div>

    </section>
  );
}