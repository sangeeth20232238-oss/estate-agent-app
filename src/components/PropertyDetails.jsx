import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import { FaArrowLeft } from 'react-icons/fa';
import { propertyData } from '../data'; // Make sure this path is correct

const PropertyDetails = () => {
    const { id } = useParams(); 
    const [property, setProperty] = useState(null);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        const found = propertyData.properties.find(p => p.id === id);
        if (found) {
            setProperty(found);
            
            // Image Fix
            const rawImg = found.picture || (found.images && found.images[0]);
            const cleanRaw = rawImg.startsWith('/') ? rawImg.slice(1) : rawImg;
            setMainImage(`${import.meta.env.BASE_URL}${cleanRaw}`);
        }
    }, [id]);

    if (!property) return <div className="loading">Loading Property Details...</div>;

    // Helper to fix floorplan path
    const getFloorPlanUrl = () => {
        if (!property.floorplan) return null;
        const cleanPlan = property.floorplan.startsWith('/') ? property.floorplan.slice(1) : property.floorplan;
        return `${import.meta.env.BASE_URL}${cleanPlan}`;
    };

    return (
        <div className="container property-details">
             <Link to="/" className="back-btn"><FaArrowLeft /> Back to Search</Link>

             <div className="detail-grid">
                {/* Left Side: Images */}
                <div className="image-section">
                    <img src={mainImage} alt={property.type} className="main-image" />
                    
                    <div className="thumbnail-row">
                        {property.images && property.images.map((img, index) => {
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

                {/* Right Side: Info & Tabs */}
                <div className="info-section">
                    <h2>{property.type} in {property.location}</h2>
                    <h3 className="price">£{property.price.toLocaleString()}</h3>
                    
                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Floor Plan</Tab>
                            <Tab>Map</Tab>
                        </TabList>

                        {/* TAB 1: Description */}
                        <TabPanel>
                            <div className="desc-content">
                                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                <p><strong>Tenure:</strong> {property.tenure}</p>
                                <p>{property.description}</p>
                                <p className="added-date">Added: {property.added ? 
                                    `${property.added.day} ${property.added.month} ${property.added.year}` : 'N/A'}
                                </p>
                            </div>
                        </TabPanel>

                        {/* TAB 2: Floor Plan (Dynamic Fix) */}
                        <TabPanel>
                            {property.floorplan ? (
                                <img 
                                    src={getFloorPlanUrl()} 
                                    alt="Floor Plan" 
                                    className="tab-image" 
                                />
                            ) : (
                                <div className="placeholder-box">No Floor Plan Image Available</div>
                            )}
                        </TabPanel>

                        {/* TAB 3: Map (Dynamic Fix) */}
                        <TabPanel>
                            <iframe
                                width="100%"
                                height="350"
                                style={{ border: 0, borderRadius: '8px' }}
                                loading="lazy"
                                allowFullScreen
                                title="Property Location"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                            ></iframe>
                        </TabPanel>
                    </Tabs>
                </div>
             </div>
        </div>
    );
};

export default PropertyDetails;