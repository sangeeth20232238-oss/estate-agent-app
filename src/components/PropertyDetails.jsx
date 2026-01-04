import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import { FaArrowLeft } from 'react-icons/fa';
import { propertyData } from '../data';


const PropertyDetails = () => {
    const { id } = useParams(); 
    const [property, setProperty] = useState(null);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        // Find the property using the imported data
        const found = propertyData.properties.find(p => p.id === id);
        
        if (found) {
            setProperty(found);
            
            // Image Fix: Clean the path and add the Base URL
            const rawImg = found.picture || (found.images && found.images[0]);
            const cleanRaw = rawImg.startsWith('/') ? rawImg.slice(1) : rawImg;
            setMainImage(`${import.meta.env.BASE_URL}${cleanRaw}`);
        }
    }, [id]);

    if (!property) return <div className="loading">Loading Property Details...</div>;

    return (
        <div className="container property-details">
             <Link to="/" className="back-btn"><FaArrowLeft /> Back to Search</Link>

             <div className="detail-grid">
                <div className="image-section">
                    <img src={mainImage} alt={property.type} className="main-image" />
                    
                    <div className="thumbnail-row">
                        {property.images && property.images.map((img, index) => {
                            // Thumbnail Fix: Clean path + Base URL
                            const cleanThumb = img.startsWith('/') ? img.slice(1) : img;
                            const thumbPath = `${import.meta.env.BASE_URL}${cleanThumb}`;

                            return (
                                <img 
                                    key={index}
                                    src={thumbPath} 
                                    alt={`Thumbnail ${index}`}
                                    className={mainImage === thumbPath ? "thumb active" : "thumb"}
                                    onClick={() => setMainImage(thumbPath)} 
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="info-section">
                    <h2>{property.type} in {property.location}</h2>
                    <h3 className="price">£{property.price.toLocaleString()}</h3>
                    <p className="description">{property.description}</p>
                    
                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Floor Plan</Tab>
                            <Tab>Map</Tab>
                        </TabList>

                        <TabPanel>
                            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                            <p><strong>Tenure:</strong> {property.tenure}</p>
                            <p>{property.description}</p>
                        </TabPanel>
                        <TabPanel>
                            <div className="placeholder-box">Floor Plan Image</div>
                        </TabPanel>
                        <TabPanel>
                            <div className="placeholder-box">Google Map View</div>
                        </TabPanel>
                    </Tabs>
                </div>
             </div>
        </div>
    );
};

export default PropertyDetails;