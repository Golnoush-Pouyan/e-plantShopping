import React, { useState } from 'react'; 
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { addItem } from './CartSlice'; // Import addItem action

function ProductList() {
    const [showCart, setShowCart] = useState(false); 
    const [addedToCart, setAddedToCart] = useState({}); 
    const [totalQuantity, setTotalQuantity] = useState(0); // State for total quantity
    const dispatch = useDispatch(); // Initialize the dispatch function
    const cartItems = useSelector(state => state.cart.items); // Get cart items from the Redux store

    const plantsArray = [
        // your plants data here...
    ];

    // Update the total quantity
    const updateCartCount = () => {
        const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalQuantity(quantity);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    // Add plant to the cart and dispatch the action
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true // Mark the plant as added
        }));
        updateCartCount(); // Update total quantity
        alert(`${plant.name} has been added to the cart!`); // Optional alert to confirm
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                        <h1 className='cart'>
                            Cart ({totalQuantity}) {/* Display total quantity */}
                        </h1>
                    </a></div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1>{category.category}</h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">Cost: {plant.cost}</div>

                                        {addedToCart[plant.name] ? (
                                            <button className="product-button" disabled>
                                                Added
                                            </button>
                                        ) : (
                                            <button 
                                                className="product-button" 
                                                onClick={() => handleAddToCart(plant)}
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} updateCartCount={updateCartCount} />
            )}
        </div>
    );
}

export default ProductList;
