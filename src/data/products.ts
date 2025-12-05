export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals who need to focus in noisy environments. Features include touch controls, foldable design, and comfortable memory foam ear cushions.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    description: "Track your health and fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS tracking, sleep analysis, and 50+ workout modes. Water-resistant up to 50 meters with a bright AMOLED display that's visible even in direct sunlight.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Minimalist Leather Backpack",
    price: 129.99,
    description: "Handcrafted genuine leather backpack with a modern minimalist design. Features padded laptop compartment (fits up to 15-inch), multiple organization pockets, and adjustable straps. Perfect for work, travel, or everyday use.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    category: "Fashion"
  },
  {
    id: 4,
    name: "Organic Coffee Beans",
    price: 24.99,
    description: "Premium single-origin Arabica coffee beans from the highlands of Colombia. Medium roast with notes of chocolate, caramel, and a hint of citrus. Ethically sourced and certified organic. 1lb bag, freshly roasted to order.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=80",
    category: "Food & Beverage"
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    description: "Compact yet powerful portable speaker with 360-degree sound. IPX7 waterproof rating, 20-hour playtime, and built-in microphone for hands-free calls. Perfect for outdoor adventures, beach trips, or poolside parties.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    category: "Electronics"
  },
  {
    id: 6,
    name: "Ceramic Plant Pot Set",
    price: 44.99,
    description: "Set of 3 modern ceramic plant pots with bamboo drainage trays. Perfect for succulents, herbs, or small indoor plants. Minimalist design with a matte finish that complements any home decor style.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
    category: "Home & Garden"
  },
  {
    id: 7,
    name: "Professional Chef Knife",
    price: 89.99,
    description: "8-inch Japanese steel chef knife with exceptional sharpness and edge retention. Ergonomic pakkawood handle for comfortable grip during extended use. Ideal for slicing, dicing, and mincing. Comes with a protective blade cover.",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&q=80",
    category: "Kitchen"
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    price: 49.99,
    description: "Extra-thick 6mm eco-friendly yoga mat with superior grip and cushioning. Non-slip surface for safe practice, includes carrying strap. Perfect for yoga, pilates, stretching, and floor exercises. Available in multiple colors.",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
    category: "Sports & Fitness"
  }
];
