import React from 'react';
import ImageCard from './ImageCard';

// Component to display the grid of search results
const Gallery = ({ properties, onAddFav }) => {
    return (
        <div className="container">
            <div className="all-items">
                {/* Display the total count so the user knows how many results there are */}
                <h2>{properties.length} Properties Found</h2>
                
                <div className="gallery">
                    {/* Check if we actually have properties to show */}
                    {properties.length > 0 ? (
                        // If yes, loop through the list and create a card for each one
                        properties.map((property) => (
                            <ImageCard 
                                key={property.id} // React requires a unique ID for every item in a list
                                product={property} 
                                onAddFav={onAddFav} // Pass the "Save" function down to the button
                            />
                        ))
                    ) : (
                        // If the list is empty, show a helpful message
                        <p>No properties match your search.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gallery;