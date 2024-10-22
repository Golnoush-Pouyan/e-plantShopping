import React, { useState } from 'react'; 
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addItem } from './CartSlice'; // Import addItem action

function ProductList() {
    const [showCart, setShowCart] = useState(false); 
    const [cart, setCart] = useState([]); 
    const [addedToCart, setAddedToCart] = useState({}); 
    const dispatch = useDispatch(); // Initialize the dispatch function

    const plantsArray = [
        // your plants data here...
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
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
        // Dispatch the addItem action
        dispatch(addItem(plant));

        // Update addedToCart state to reflect that the plant has been added
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true // Mark the plant as added
        }));
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
                            {/* Cart SVG */}
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
                <CartItem onContinueShopping={handleContinueShopping} cartItems={cart} />
            )}
        </div>
    );
}

export default ProductList;
