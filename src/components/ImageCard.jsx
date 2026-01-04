import React from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';

const ImageCard = ({ product, onAddFav }) => {
    // Unpack the product data so it's easier to use below
    const { type, price, location, picture, id } = product; 
    
    // 1. Remove any leading slash from the data (e.g., "/images/..." becomes "images/...")
    const cleanPath = picture.startsWith('/') ? picture.slice(1) : picture;
    
    // 2. Add the correct repo folder name in front
    const imagePath = `${import.meta.env.BASE_URL}${cleanPath}`;

    // Setup Drag and Drop: specific config to make this card draggable
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PROPERTY', // Identify this item type for the Drop Target (Favourites panel)
        item: { property: product }, // Data to send when dropped
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(), // Check if currently being dragged
        }),
    }));

    return (
        <section 
            ref={drag} // Bind the drag logic to this HTML section
            className="card"
            // Fade out the card slightly when the user is dragging it so they know it's working
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }} 
        >
            <div className="image-container">
                {/* Link to the full details page using the unique ID */}
                <Link to={`/property/${id}`}>
                    <img 
                        src={imagePath} 
                        alt={type} 
                        // If image fails to load, hide the broken icon
                        onError={(e) => {e.target.style.display = 'none';}} 
                    />
                    <div className="card-badge">FOR SALE</div>
                </Link>
            </div>
            
            <div className="description">
                {/* Format price with commas (e.g. 350,000) so it looks professional */}
                <h3 className="card-price">£{price ? price.toLocaleString() : '0'}</h3>
                
                <h4 className="card-title">{type}</h4>
                <p className="card-location">{location}</p>
                
                {/* Button to save to favourites list */}
                <button 
                    className="add-fav-btn"
                    onClick={() => onAddFav(product)}
                >
                    ♡ Save Property
                </button>
            </div>
        </section>
    );
};

export default ImageCard;