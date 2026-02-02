import top1 from '../assets/top1.png';
import top2 from '../assets/top2.jpeg';
import top3 from '../assets/top3.jpeg';
import top4 from '../assets/top4.jpeg';
import top5 from '../assets/top5.jpeg';

export interface Dish {
    id: number;
    image: string;
    text: string;
    description: string;
    price: string;
    rating: number;
    category: 'veg' | 'non-veg';
    displayCategory: string;
}

// Vegetarian Dishes (50 items)
const vegDishes: Dish[] = [
    // Best Sellers - Veg
    { id: 1, image: top2, text: 'Falafel Royale', description: 'Crispy chickpea falafel served with tahini and pickled vegetables.', price: '£11.99', rating: 4.7, category: 'veg', displayCategory: 'Best Sellers' },
    { id: 2, image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=500', text: 'Mezze Platter', description: 'Assorted dips with warm pita bread.', price: '£16.99', rating: 4.9, category: 'veg', displayCategory: 'Best Sellers' },
    // Starters - Veg
    { id: 3, image: top3, text: 'Grilled Halloumi', description: 'Golden halloumi with pomegranate molasses.', price: '£12.99', rating: 4.8, category: 'veg', displayCategory: 'Starters' },
    { id: 4, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Hummus & Pita', description: 'Creamy chickpea dip with olive oil and paprika.', price: '£8.99', rating: 4.6, category: 'veg', displayCategory: 'Starters' },
    { id: 5, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500', text: 'Samosa Chaat', description: 'Crispy pastry with spiced potatoes and chutneys.', price: '£9.99', rating: 4.5, category: 'veg', displayCategory: 'Starters' },
    { id: 6, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Baba Ganoush', description: 'Smoky roasted eggplant dip.', price: '£8.49', rating: 4.4, category: 'veg', displayCategory: 'Starters' },
    { id: 7, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Stuffed Grape Leaves', description: 'Dolmas filled with herbed rice.', price: '£9.49', rating: 4.5, category: 'veg', displayCategory: 'Starters' },
    { id: 8, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Paneer Tikka', description: 'Grilled cottage cheese cubes.', price: '£10.99', rating: 4.7, category: 'veg', displayCategory: 'Starters' },
    { id: 9, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Onion Bhaji', description: 'Crispy fried onion fritters.', price: '£7.99', rating: 4.3, category: 'veg', displayCategory: 'Starters' },
    { id: 10, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500', text: 'Spring Rolls', description: 'Crispy vegetable spring rolls.', price: '£8.49', rating: 4.4, category: 'veg', displayCategory: 'Starters' },
    // Mains - Veg
    { id: 11, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500', text: 'Vegetable Biryani', description: 'Fragrant basmati rice with seasonal vegetables.', price: '£12.99', rating: 4.5, category: 'veg', displayCategory: 'Mains' },
    { id: 12, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500', text: 'Paneer Butter Masala', description: 'Cottage cheese in buttery tomato gravy.', price: '£13.99', rating: 4.7, category: 'veg', displayCategory: 'Mains' },
    { id: 13, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Dal Makhani', description: 'Creamy black lentils slow-cooked overnight.', price: '£11.99', rating: 4.6, category: 'veg', displayCategory: 'Mains' },
    { id: 14, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Palak Paneer', description: 'Spinach curry with cottage cheese.', price: '£12.99', rating: 4.5, category: 'veg', displayCategory: 'Mains' },
    { id: 15, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Chana Masala', description: 'Spiced chickpea curry.', price: '£10.99', rating: 4.4, category: 'veg', displayCategory: 'Mains' },
    { id: 16, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Aloo Gobi', description: 'Potato and cauliflower curry.', price: '£10.49', rating: 4.3, category: 'veg', displayCategory: 'Mains' },
    { id: 17, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Mushroom Masala', description: 'Rich mushroom curry.', price: '£11.99', rating: 4.5, category: 'veg', displayCategory: 'Mains' },
    { id: 18, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Kadai Paneer', description: 'Paneer in spicy bell pepper sauce.', price: '£12.99', rating: 4.6, category: 'veg', displayCategory: 'Mains' },
    { id: 19, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Mixed Veg Curry', description: 'Assorted vegetables in rich gravy.', price: '£10.99', rating: 4.4, category: 'veg', displayCategory: 'Mains' },
    { id: 20, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Malai Kofta', description: 'Fried cheese balls in creamy sauce.', price: '£13.49', rating: 4.7, category: 'veg', displayCategory: 'Mains' },
    { id: 21, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Vegetable Korma', description: 'Vegetables in mild cashew sauce.', price: '£11.49', rating: 4.4, category: 'veg', displayCategory: 'Mains' },
    { id: 22, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Tarka Dal', description: 'Yellow lentils with tempered spices.', price: '£9.99', rating: 4.3, category: 'veg', displayCategory: 'Mains' },
    { id: 23, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Bhindi Masala', description: 'Spiced okra stir-fry.', price: '£10.49', rating: 4.2, category: 'veg', displayCategory: 'Mains' },
    { id: 24, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Paneer Jalfrezi', description: 'Stir-fried paneer with vegetables.', price: '£12.49', rating: 4.5, category: 'veg', displayCategory: 'Mains' },
    { id: 25, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Vegetable Tikka Masala', description: 'Grilled vegetables in tikka sauce.', price: '£11.99', rating: 4.4, category: 'veg', displayCategory: 'Mains' },
    // Platters - Veg
    { id: 26, image: top5, text: 'Mixed Mezze', description: 'A feast of hummus, baba ganoush, tabbouleh.', price: '£18.99', rating: 5.0, category: 'veg', displayCategory: 'Platters' },
    { id: 27, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Falafel Feast', description: 'Falafel platter with all the fixings.', price: '£19.99', rating: 4.8, category: 'veg', displayCategory: 'Platters' },
    { id: 28, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Vegetarian Thali', description: 'Complete Indian meal platter.', price: '£22.99', rating: 4.9, category: 'veg', displayCategory: 'Platters' },
    { id: 29, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Paneer Platter', description: 'Assorted paneer dishes.', price: '£24.99', rating: 4.7, category: 'veg', displayCategory: 'Platters' },
    { id: 30, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Grilled Veg Platter', description: 'Assorted grilled vegetables.', price: '£20.99', rating: 4.6, category: 'veg', displayCategory: 'Platters' },
    // Desserts - Veg
    { id: 31, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500', text: 'Baklava', description: 'Layered pastry with nuts and syrup.', price: '£6.99', rating: 4.8, category: 'veg', displayCategory: 'Desserts' },
    { id: 32, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500', text: 'Chocolate Lava Cake', description: 'Warm chocolate cake with gooey center.', price: '£7.99', rating: 4.9, category: 'veg', displayCategory: 'Desserts' },
    { id: 33, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Gulab Jamun', description: 'Sweet milk dumplings in syrup.', price: '£5.99', rating: 4.7, category: 'veg', displayCategory: 'Desserts' },
    { id: 34, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Kheer', description: 'Creamy rice pudding.', price: '£5.49', rating: 4.5, category: 'veg', displayCategory: 'Desserts' },
    { id: 35, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Rasmalai', description: 'Cheese dumplings in cardamom milk.', price: '£6.49', rating: 4.8, category: 'veg', displayCategory: 'Desserts' },
    { id: 36, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Jalebi', description: 'Crispy sweet spirals.', price: '£4.99', rating: 4.4, category: 'veg', displayCategory: 'Desserts' },
    { id: 37, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Kulfi', description: 'Traditional Indian ice cream.', price: '£4.49', rating: 4.6, category: 'veg', displayCategory: 'Desserts' },
    { id: 38, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Mango Lassi Cake', description: 'Mango-infused sponge cake.', price: '£7.49', rating: 4.7, category: 'veg', displayCategory: 'Desserts' },
    // Drinks - Veg
    { id: 39, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Mango Lassi', description: 'Creamy mango yogurt drink.', price: '£4.99', rating: 4.7, category: 'veg', displayCategory: 'Drinks' },
    { id: 40, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Sweet Lassi', description: 'Traditional yogurt drink.', price: '£3.99', rating: 4.5, category: 'veg', displayCategory: 'Drinks' },
    { id: 41, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Masala Chai', description: 'Spiced Indian tea.', price: '£3.49', rating: 4.8, category: 'veg', displayCategory: 'Drinks' },
    { id: 42, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Fresh Mint Lemonade', description: 'Refreshing mint citrus drink.', price: '£3.99', rating: 4.6, category: 'veg', displayCategory: 'Drinks' },
    { id: 43, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Rose Sherbet', description: 'Traditional rose-flavored drink.', price: '£3.49', rating: 4.4, category: 'veg', displayCategory: 'Drinks' },
    { id: 44, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Jallab', description: 'Date and rose water drink.', price: '£4.49', rating: 4.5, category: 'veg', displayCategory: 'Drinks' },
    // Breads - Veg
    { id: 45, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Garlic Naan', description: 'Fluffy bread with garlic butter.', price: '£3.49', rating: 4.6, category: 'veg', displayCategory: 'Breads' },
    { id: 46, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Butter Naan', description: 'Classic buttered naan bread.', price: '£2.99', rating: 4.5, category: 'veg', displayCategory: 'Breads' },
    { id: 47, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Cheese Naan', description: 'Naan stuffed with melted cheese.', price: '£4.49', rating: 4.7, category: 'veg', displayCategory: 'Breads' },
    { id: 48, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Peshwari Naan', description: 'Sweet naan with coconut and raisins.', price: '£4.49', rating: 4.6, category: 'veg', displayCategory: 'Breads' },
    { id: 49, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Roti', description: 'Traditional whole wheat bread.', price: '£2.49', rating: 4.3, category: 'veg', displayCategory: 'Breads' },
    { id: 50, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Paratha', description: 'Layered flaky bread.', price: '£3.99', rating: 4.5, category: 'veg', displayCategory: 'Breads' },
];

// Non-Vegetarian Dishes (50 items)
const nonVegDishes: Dish[] = [
    // Best Sellers - Non-Veg
    { id: 51, image: top1, text: 'Signature Shawarma', description: 'Slow-roasted lamb with fresh herbs and secret spices.', price: '£14.99', rating: 4.9, category: 'non-veg', displayCategory: 'Best Sellers' },
    { id: 52, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500', text: 'Chicken Tikka', description: 'Tender chicken marinated in aromatic spices.', price: '£13.99', rating: 4.8, category: 'non-veg', displayCategory: 'Best Sellers' },
    // Starters - Non-Veg
    { id: 53, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=500', text: 'Chicken Wings', description: 'Spicy grilled chicken wings.', price: '£10.99', rating: 4.7, category: 'non-veg', displayCategory: 'Starters' },
    { id: 54, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Lamb Samosa', description: 'Crispy pastry with spiced lamb.', price: '£9.99', rating: 4.6, category: 'non-veg', displayCategory: 'Starters' },
    { id: 55, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Seekh Kebab', description: 'Minced lamb skewers.', price: '£11.99', rating: 4.8, category: 'non-veg', displayCategory: 'Starters' },
    { id: 56, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Chicken Malai Tikka', description: 'Creamy marinated chicken pieces.', price: '£11.49', rating: 4.7, category: 'non-veg', displayCategory: 'Starters' },
    { id: 57, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Fish Pakora', description: 'Crispy fried fish fritters.', price: '£10.99', rating: 4.5, category: 'non-veg', displayCategory: 'Starters' },
    { id: 58, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Prawns Puri', description: 'Spiced prawns on crispy bread.', price: '£12.99', rating: 4.6, category: 'non-veg', displayCategory: 'Starters' },
    { id: 59, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Chicken Lollipop', description: 'Spicy chicken drumettes.', price: '£10.49', rating: 4.5, category: 'non-veg', displayCategory: 'Starters' },
    { id: 60, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Lamb Chops', description: 'Grilled lamb chops with herbs.', price: '£14.99', rating: 4.8, category: 'non-veg', displayCategory: 'Starters' },
    // Mains - Non-Veg
    { id: 61, image: top4, text: 'Lamb Kofta', description: 'Hand-rolled spiced lamb skewers.', price: '£15.99', rating: 4.9, category: 'non-veg', displayCategory: 'Mains' },
    { id: 62, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Butter Chicken', description: 'Classic rich tomato and cream curry.', price: '£14.99', rating: 4.8, category: 'non-veg', displayCategory: 'Mains' },
    { id: 63, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Lamb Rogan Josh', description: 'Kashmiri-style lamb curry.', price: '£15.99', rating: 4.7, category: 'non-veg', displayCategory: 'Mains' },
    { id: 64, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Chicken Korma', description: 'Creamy cashew chicken curry.', price: '£13.99', rating: 4.6, category: 'non-veg', displayCategory: 'Mains' },
    { id: 65, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Lamb Biryani', description: 'Aromatic rice with tender lamb.', price: '£16.99', rating: 4.9, category: 'non-veg', displayCategory: 'Mains' },
    { id: 66, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Chicken Biryani', description: 'Fragrant rice with spiced chicken.', price: '£14.99', rating: 4.7, category: 'non-veg', displayCategory: 'Mains' },
    { id: 67, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Prawn Masala', description: 'Tiger prawns in rich sauce.', price: '£17.99', rating: 4.8, category: 'non-veg', displayCategory: 'Mains' },
    { id: 68, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Fish Curry', description: 'Bengali-style fish curry.', price: '£14.99', rating: 4.6, category: 'non-veg', displayCategory: 'Mains' },
    { id: 69, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Lamb Karahi', description: 'Wok-cooked lamb with tomatoes.', price: '£16.49', rating: 4.7, category: 'non-veg', displayCategory: 'Mains' },
    { id: 70, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Chicken Jalfrezi', description: 'Stir-fried chicken with peppers.', price: '£13.49', rating: 4.5, category: 'non-veg', displayCategory: 'Mains' },
    { id: 71, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Lamb Saag', description: 'Lamb in creamy spinach sauce.', price: '£15.49', rating: 4.6, category: 'non-veg', displayCategory: 'Mains' },
    { id: 72, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Chicken Madras', description: 'Hot and tangy chicken curry.', price: '£12.99', rating: 4.4, category: 'non-veg', displayCategory: 'Mains' },
    { id: 73, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Lamb Vindaloo', description: 'Fiery Goan-style lamb curry.', price: '£14.99', rating: 4.5, category: 'non-veg', displayCategory: 'Mains' },
    { id: 74, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Chicken Bhuna', description: 'Thick, spiced chicken curry.', price: '£12.49', rating: 4.4, category: 'non-veg', displayCategory: 'Mains' },
    { id: 75, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Lamb Dhansak', description: 'Sweet-sour lamb with lentils.', price: '£15.99', rating: 4.6, category: 'non-veg', displayCategory: 'Mains' },
    // Wraps - Non-Veg
    { id: 76, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Chicken Shawarma Wrap', description: 'Spiced chicken in warm pita.', price: '£9.99', rating: 4.7, category: 'non-veg', displayCategory: 'Wraps' },
    { id: 77, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Lamb Shawarma Wrap', description: 'Tender lamb in flatbread.', price: '£10.99', rating: 4.8, category: 'non-veg', displayCategory: 'Wraps' },
    { id: 78, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Seekh Kebab Roll', description: 'Minced lamb kebab in paratha.', price: '£9.49', rating: 4.6, category: 'non-veg', displayCategory: 'Wraps' },
    { id: 79, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Chicken Tikka Wrap', description: 'Grilled chicken in soft wrap.', price: '£9.49', rating: 4.5, category: 'non-veg', displayCategory: 'Wraps' },
    { id: 80, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Fish Wrap', description: 'Crispy fish in tortilla.', price: '£10.49', rating: 4.4, category: 'non-veg', displayCategory: 'Wraps' },
    // Platters - Non-Veg
    { id: 81, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500', text: 'BBQ Platter', description: 'Assorted grilled kebabs and chops.', price: '£24.99', rating: 4.9, category: 'non-veg', displayCategory: 'Platters' },
    { id: 82, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500', text: 'Seafood Platter', description: 'Grilled fish, prawns, and calamari.', price: '£29.99', rating: 4.8, category: 'non-veg', displayCategory: 'Platters' },
    { id: 83, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Lamb Feast', description: 'Premium lamb dishes platter.', price: '£32.99', rating: 4.9, category: 'non-veg', displayCategory: 'Platters' },
    { id: 84, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Chicken Feast', description: 'Assorted chicken dishes.', price: '£26.99', rating: 4.7, category: 'non-veg', displayCategory: 'Platters' },
    { id: 85, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Mixed Grill', description: 'Best of meat grills.', price: '£28.99', rating: 4.8, category: 'non-veg', displayCategory: 'Platters' },
    // Rice - Non-Veg
    { id: 86, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Chicken Fried Rice', description: 'Wok-fried rice with chicken.', price: '£10.99', rating: 4.5, category: 'non-veg', displayCategory: 'Rice' },
    { id: 87, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Lamb Pulao', description: 'Spiced rice with lamb chunks.', price: '£12.99', rating: 4.6, category: 'non-veg', displayCategory: 'Rice' },
    { id: 88, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Prawn Fried Rice', description: 'Fried rice with juicy prawns.', price: '£13.99', rating: 4.7, category: 'non-veg', displayCategory: 'Rice' },
    { id: 89, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Keema Rice', description: 'Minced beef with basmati rice.', price: '£11.99', rating: 4.5, category: 'non-veg', displayCategory: 'Rice' },
    { id: 90, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Egg Fried Rice', description: 'Classic egg fried rice.', price: '£8.99', rating: 4.3, category: 'non-veg', displayCategory: 'Rice' },
    // Specialties - Non-Veg
    { id: 91, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Lamb Shank', description: 'Slow-cooked lamb shank.', price: '£22.99', rating: 4.9, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 92, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Whole Grilled Fish', description: 'Fresh fish grilled to perfection.', price: '£24.99', rating: 4.8, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 93, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'Tandoori Whole Chicken', description: 'Full chicken from the tandoor.', price: '£19.99', rating: 4.7, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 94, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Lamb Shoulder', description: 'Slow-roasted lamb shoulder.', price: '£28.99', rating: 4.9, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 95, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Lobster Thermidor', description: 'Premium lobster dish.', price: '£39.99', rating: 5.0, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 96, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500', text: 'Duck Confit', description: 'Slow-cooked duck leg.', price: '£21.99', rating: 4.7, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 97, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', text: 'Lamb Rack', description: 'Premium rack of lamb.', price: '£34.99', rating: 4.9, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 98, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', text: 'King Prawns Butter Garlic', description: 'Jumbo prawns in garlic butter.', price: '£22.99', rating: 4.8, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 99, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500', text: 'Grilled Salmon', description: 'Fresh Atlantic salmon.', price: '£19.99', rating: 4.7, category: 'non-veg', displayCategory: 'Specialties' },
    { id: 100, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500', text: 'Mixed Seafood Curry', description: 'Prawns, fish, and squid in curry.', price: '£21.99', rating: 4.8, category: 'non-veg', displayCategory: 'Specialties' },
];

// Combined menu
export const allDishes: Dish[] = [...vegDishes, ...nonVegDishes];

// Categories for the sidebar
export const categories = ['Best Sellers', 'Starters', 'Mains', 'Platters', 'Desserts', 'Drinks', 'Breads', 'Wraps', 'Rice', 'Specialties'];

// Helper to parse price string to number for storage
export const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
};
