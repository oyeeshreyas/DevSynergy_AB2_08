import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Use MONGO_URI instead of MONGODB_URI to match your .env file
const MONGO_URI = process.env.MONGO_URI;

// Type guard to check if MONGO_URI is defined
if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
}

// Define the Menu Schema
const menuSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    savings: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
      enum: ['fruits', 'vegetables', 'dairy'] // Add all your categories
    },
    location: {
      type: String,
    },
    rating: {
      type: Number,
    }
  }, {
    timestamps: true
  });
  
  // ... rest of the code remains the same ...

const Menu = mongoose.model('Menu', menuSchema);

// ... existing imports and setup ...

const menuItems = [
  // 🥭 Fruits (ID: 1-10)
  {
    id: 1,
    name: "Organic Apples",
    price: 120,
    discount: "10% OFF",
    description: "Fresh organic apples from Himalayan Orchards",
    image: "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=900&auto=format&fit=crop&q=60",
    savings: 12,
    category: "fruits",
    location: "Himalayan Orchards",
    rating: 4.5
  },
  {
    id: 2,
    name: "Fresh Bananas",
    price: 60,
    discount: "5% OFF",
    description: "Fresh bananas from Kerala Farms",
    image: "https://plus.unsplash.com/premium_photo-1675731118330-08c71253af17?w=600&auto=format&fit=crop&q=60",
    savings: 3,
    category: "fruits",
    location: "Kerala Farms",
    rating: 4.2
  },
  {
    id: 3,
    name: "Sweet Oranges",
    price: 90,
    discount: "8% OFF",
    description: "Sweet and juicy oranges from Nagpur Groves",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcBcaA-q2H_VwderIuAfJ8EFlG8iihNT6fcg&s",
    savings: 7,
    category: "fruits",
    location: "Nagpur Groves",
    rating: 4.3
  },
  {
    id: 4,
    name: "Juicy Watermelon",
    price: 80,
    discount: "15% OFF",
    description: "Naturally sweet watermelon from Rajasthan Farms",
    image: "https://images.unsplash.com/photo-1675346980561-66d6231f8bf7?w=600&auto=format&fit=crop&q=60",
    savings: 12,
    category: "fruits",
    location: "Rajasthan Farms",
    rating: 4.7
  },
  {
    id: 5,
    name: "Alphonso Mangoes",
    price: 350,
    discount: "5% OFF",
    description: "King of mangoes from Ratnagiri Gardens",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCr4IwI33vge8DCw0M-WdI8yp6uYz-LdEL0A&s",
    savings: 17,
    category: "fruits",
    location: "Ratnagiri Gardens",
    rating: 4.9
  },

  // 🥦 Vegetables (ID: 11-20)
  {
    id: 11,
    name: "Fresh Tomatoes",
    price: 80,
    discount: "15% OFF",
    description: "Fresh tomatoes from Community Garden",
    image: "data:image/jpeg;base64,...",
    savings: 12,
    category: "vegetables",
    location: "Community Garden",
    rating: 4.2
  },
  {
    id: 12,
    name: "Organic Potatoes",
    price: 40,
    discount: "5% OFF",
    description: "Fresh organic potatoes from Punjab Farms",
    image: "data:image/jpeg;base64,...",
    savings: 2,
    category: "vegetables",
    location: "Punjab Farms",
    rating: 4.0
  },
  {
    id: 13,
    name: "Green Spinach",
    price: 30,
    discount: "10% OFF",
    description: "Locally grown green spinach",
    image: "data:image/jpeg;base64,...",
    savings: 3,
    category: "vegetables",
    location: "Local Hydroponic Farm",
    rating: 4.5
  },
  {
    id: 14,
    name: "Red Onions",
    price: 50,
    discount: "8% OFF",
    description: "Fresh onions from Maharashtra Fields",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXJpVJ9w3RvtIiSE9kc6B7VUmrar_A_79RUw&s",
    savings: 4,
    category: "vegetables",
    location: "Maharashtra Fields",
    rating: 4.3
  },
  {
    id: 15,
    name: "Green Capsicum",
    price: 70,
    discount: "12% OFF",
    description: "Crisp green capsicum from Karnataka Gardens",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4IvqPZZ_jf5bNT2An_eHeDUcSFJbL33QaCg&s",
    savings: 8,
    category: "vegetables",
    location: "Karnataka Gardens",
    rating: 4.1
  },

  // 🥛 Dairy (ID: 21-30)
  {
    id: 21,
    name: "Fresh Cow Milk",
    price: 60,
    discount: "0% OFF",
    description: "Pure cow milk from Amul Dairy Farm",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvsjFTgYsIC043Rb3jrh5MJyunx5fnLMQ3ag&s",
    savings: 0,
    category: "dairy",
    location: "Amul Dairy Farm",
    rating: 4.8
  },
  {
    id: 22,
    name: "Organic Curd",
    price: 100,
    discount: "5% OFF",
    description: "Organic curd from Local Dairy",
    image: "data:image/jpeg;base64,...",
    savings: 5,
    category: "dairy",
    location: "Local Dairy",
    rating: 4.5
  },
  {
    id: 23,
    name: "Paneer",
    price: 400,
    discount: "8% OFF",
    description: "Fresh Paneer from Punjab Dairy",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-0jOSxHBz7NSDXwm-KwWnGwFtC9wWtjIrz-hV7miOUrH42Dfv5RmaK-sRYG1Z575tLno&usqp=CAU",
    savings: 32,
    category: "dairy",
    location: "Punjab Dairy",
    rating: 4.7
  },
  {
    id: 24,
    name: "Butter",
    price: 500,
    discount: "0% OFF",
    description: "Pure Himalayan butter",
    image: "data:image/jpeg;base64,...",
    savings: 0,
    category: "dairy",
    location: "Himalayan Dairy",
    rating: 4.6
  },
  {
    id: 25,
    name: "Flavored Yogurt",
    price: 35,
    discount: "15% OFF",
    description: "Delicious flavored yogurt from Modern Dairy",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fepxa28-GsB1t5iFAQcu93odo10nDKVqxg&s",
    savings: 5,
    category: "dairy",
    location: "Modern Dairy",
    rating: 4.3
  }
];

// ... rest of the code remains the same ...

async function seedDatabase() {
    try {
        // Connect to MongoDB using the URI from environment variables
        // The type guard above ensures MONGO_URI is defined here
        await mongoose.connect(MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        
        console.log('Connected to MongoDB');

        // Delete existing menu items
        await Menu.deleteMany({});
        console.log('Cleared existing menu items');

        // Insert new menu items
        const insertedMenuItems = await Menu.insertMany(menuItems);
        console.log(`Successfully seeded ${insertedMenuItems.length} menu items`);

        // Log the IDs of inserted items
        console.log('Inserted menu items IDs:');
        insertedMenuItems.forEach(item => {
            console.log(`${item.name}: ${item._id}`);
        });

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the seed function
seedDatabase();