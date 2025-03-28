import { useState } from "react";
import Header from "./components/Navbar";
import MenuItem from "./components/MenuItem";
import Cart from "./components/Cart";
import Receipt from "./components/Receipt";
import "./index.css";
import CheeseIMG from "./product_img/Cheese.webp";
import TunaIMG from "./product_img/Tuna.webp";
import MooING from "./product_img/moo.jpg";
import EggIMG from "./product_img/Egg.jpg";
import HamING from "./product_img/Ham.jpg";
import CrabIMG from "./product_img/Crab Stick.jpg";
import RedIMG from "./product_img/Red.webp";
import MilkIMG from "./product_img/Milk.jpg";
import CreamIMG from "./product_img/Cream.jpg";
import CornIMG from "./product_img/Corn.jpg";
import OreoIMG from "./product_img/Oreo.jpg";
import ButterIMG from "./product_img/Taiyaki.webp";
import Waggel from "./product_img/Waffel.jpg";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

const menuItems = [
  { category: "ไทยากิไส้หวาน", name: "ไทยากิไส้ถั่วแดง", price: 10, imageSrc: RedIMG },
  { category: "ไทยากิไส้หวาน", name: "ไทยากิไส้คัสตาร์ด", price: 10, imageSrc: CreamIMG },
  { category: "ไทยากิไส้หวาน", name: "ไทยากิไส้โอริโอ้", price: 10, imageSrc: OreoIMG },
  { category: "ไทยากิไส้หวาน", name: "ไทยากิไส้เนยนม", price: 10, imageSrc: ButterIMG },
  { category: "ไทยากิไส้หวาน", name: "ไทยากิไส้ข้าวโพด", price: 10, imageSrc: CornIMG },
  { category: "ไทยากิไส้หวาน", name: "ไทยากิไส้นม", price: 10, imageSrc: MilkIMG },
  { category: "ไทยากิไส้คาว", name: "ไทยากิไส้ชีส", price: 10, imageSrc: CheeseIMG },
  { category: "ไทยากิไส้คาว", name: "ไทยากิหมูยองพริกเผา", price: 10, imageSrc: MooING },
  { category: "ไทยากิไส้คาว", name: "ไทยากิปูอัด", price: 10, imageSrc: CrabIMG },  
  { category: "ไทยากิไส้คาว", name: "ไทยากิแฮมชีส", price: 10, imageSrc: HamING },
  { category: "ไทยากิไส้คาว", name: "ไทยากิไส้ไข่เค็ม", price: 10, imageSrc: EggIMG },
  { category: "ไทยากิไส้คาว", name: "ไทยากิไส้ทูน่า", price: 10, imageSrc: TunaIMG },
  { category: "เมนูอื่นๆ", name: "วาฟเฟิลไส้กรอก", price: 10, imageSrc: Waggel },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (name: string, price: number) => {
    const existingIndex = cart.findIndex(item => item.name === name);
    if (existingIndex !== -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { name, price, quantity: 1 }]);
    }
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(index);
      return;
    }
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <div className="container">
      <Header />
      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="grid">
            {menuItems.filter(item => item.category === category).map(({ name, price, imageSrc }) => (
              <MenuItem key={name} name={name} price={price} imageSrc={imageSrc} addToCart={() => addToCart(name, price)} />
            ))}
          </div>
        </div>
      ))}
      <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
      {cart.length > 0 && <Receipt cart={cart} />}
    </div>
  );
}