import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import { FaArrowLeft } from 'react-icons/fa';

const PropertyDetails = () => {
    // Get the ID from the URL (e.g. /property/prop1)
    const { id } = useParams(); 
    const [property, setProperty] = useState(null);
    // State to track which image is currently being shown big
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        // Load the data file
        fetch(`${import.meta.env.BASE_URL}properties.json`)
            .then(res => res.json())
            .then(data => {
                // Find the specific property that matches the ID
                const found = data.properties.find(p => p.id === id);
                if (found) {
                    setProperty(found);
                    // Set the default image to the first one available
                    const initialImg = found.picture || (found.images && found.images[0]);
                    setMainImage(initialImg.startsWith('/') ? initialImg : `/${initialImg}`);
                }
            });
    }, [id]); // Run this whenever the ID changes

    // Show a message while data is loading
    if (!property) return <div className="loading">Loading Property Details...</div>;

    return (
        <div className="property-details-container">
            {/* Link to go back to the home page */}
            <Link to="/" className="back-btn"><FaArrowLeft /> Back to Search</Link>

            <div className="details-header">
                <h1>{property.type} in {property.location}</h1>
                <h2 className="price-tag">£{property.price.toLocaleString()}</h2>
            </div>

            <div className="details-grid">
                {/* LEFT COLUMN: GALLERY */}
                <div className="gallery-section">
                    <div className="main-image-frame">
                        {/* Display the selected main image */}
                        <img src={mainImage} alt="Main view" />
                    </div>
                    <div className="thumbnail-row">
                        {/* Loop through all images to create small thumbnails */}
                        {property.images && property.images.map((img, index) => {
                            const imgPath = img.startsWith('/') ? img : `/${img}`;
                            return (
                                <img 
                                    key={index}
                                    src={imgPath} 
                                    alt={`Thumbnail ${index}`}
                                    // Highlight the thumbnail if it is the current main image
                                    className={mainImage === imgPath ? "thumb active" : "thumb"}
                                    // Change main image when clicked
                                    onClick={() => setMainImage(imgPath)} 
                                />
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT COLUMN: TABS & INFO */}
                <div className="info-section">
                    {/* Using React Tabs library to organize information */}
                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Floor Plan</Tab>
                            <Tab>Map</Tab>
                        </TabList>

                        {/* Content for the Description Tab */}
                        <TabPanel>
                            <div className="tab-content">
                                <h3>About this Property</h3>
                                <p>{property.description}</p>
                                <ul className="details-list">
                                    <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                                    <li><strong>Tenure:</strong> {property.tenure}</li>
                                    <li><strong>Added:</strong> {property.added.month} {property.added.year}</li>
                                    <li><strong>Postcode:</strong> {property.postcode || 'N/A'}</li>
                                </ul>
                            </div>
                        </TabPanel>

                        {/* Content for the Floor Plan Tab */}
                        <TabPanel>
                            <div className="tab-content">
                                <h3>Floor Plan</h3>
                                <div className="placeholder-box">
                                    <img src="/images/floorplan_placeholder.jpg" alt="Floor Plan" style={{maxWidth: '100%'}} />
                                </div>
                            </div>
                        </TabPanel>

                        {/* Content for the Map Tab */}
                        <TabPanel>
                            <div className="tab-content">
                                <h3>Location Map</h3>
                                {/* Embedding Google Maps based on property location */}
                                <iframe 
                                    title="map"
                                    width="100%" 
                                    height="300" 
                                    style={{border:0}} 
                                    src={`https://maps.google.com/maps?q=${property.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;