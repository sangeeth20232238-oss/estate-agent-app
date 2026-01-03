import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import Favourites from './components/Favourites';
import PropertyDetails from './components/PropertyDetails';
import './App.css';

function App() {
  // State to hold all properties from the JSON file
  const [allProperties, setAllProperties] = useState([]); 
  // State to hold only the properties that match the search (initially shows all)
  const [filteredProperties, setFilteredProperties] = useState([]); 
  // State to store the user's favourite properties
  const [favourites, setFavourites] = useState([]); 

  // Load the data when the app starts
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}properties.json`)
      .then(res => res.json())
      .then(data => {
        // Save data to both states so we have a backup of the full list
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch(err => console.error("Error loading data:", err));
  }, []);

  // Helper function to fix the date format from the JSON file
  const convertDate = (dateObj) => {
    if (!dateObj) return new Date(0);
    const month = String(dateObj.month).trim();
    const day = String(dateObj.day).trim();
    const year = String(dateObj.year).trim();
    const dateString = `${month} ${day}, ${year}`;
    const converted = new Date(dateString);
    if (isNaN(converted)) return new Date(0); 
    return converted;
  };

  // This function runs when the user clicks "Search"
  const handleSearch = (criteria) => {
    const results = allProperties.filter(property => {
        // 1. Check Property Type (House, Flat, etc.)
        if (criteria.type !== 'any' && property.type !== criteria.type) return false;
        
        // 2. Check Price Range
        const price = property.price || 0;
        if (price < parseInt(criteria.minPrice) || price > parseInt(criteria.maxPrice)) return false;
        
        // 3. Check Minimum Bedrooms
        if (property.bedrooms < parseInt(criteria.minBedrooms)) return false;
        
        // 4. Check Postcode (matches if it's in the postcode OR location text)
        if (criteria.postcode) {
            const searchPostcode = criteria.postcode.toLowerCase();
            const propertyPostcode = property.postcode ? property.postcode.toLowerCase() : '';
            const propertyLocation = property.location ? property.location.toLowerCase() : '';
            if (!propertyPostcode.includes(searchPostcode) && !propertyLocation.includes(searchPostcode)) return false;
        }
        
        // 5. Check Date Added
        const propertyDate = convertDate(property.added);
        if (criteria.dateAfter && propertyDate < criteria.dateAfter) return false;
        if (criteria.dateBefore && propertyDate > criteria.dateBefore) return false;
        
        return true; // If it passes all checks, keep it in the list
    });
    setFilteredProperties(results);
  };

  // Function to add a property to favourites (prevents duplicates)
  const handleAddToFav = (property) => {
    setFavourites((prevFavourites) => {
        // Check if the item is already in the list
        const isDuplicate = prevFavourites.some(fav => fav.id === property.id);
        
        if (!isDuplicate) {
            return [...prevFavourites, property];
        } else {
            alert("This property is already in your favourites!");
            return prevFavourites;
        }
    });
  };

  // Remove a specific item from favourites
  const handleRemoveFav = (id) => {
    setFavourites(favourites.filter(fav => fav.id !== id));
  };

  // Clear the entire favourites list
  const handleClearFavs = () => {
    setFavourites([]);
  };

  return (
    // DndProvider is needed for Drag and Drop to work
    <DndProvider backend={HTML5Backend}>
        <div className="App">
            {/* I removed the Header component as per the coursework brief */}
            
            <div className="content-wrap">
                <Routes>
                    <Route path="/" element={
                        <>
                            <SearchBar onSearch={handleSearch} />
                            <div className="main-layout">
                                <div className="results-column">
                                   <Gallery properties={filteredProperties} onAddFav={handleAddToFav} />
                                </div>
                                <div className="favourites-column">
                                   <Favourites 
                                       favs={favourites} 
                                       onRemove={handleRemoveFav}
                                       onClear={handleClearFavs}
                                       onDropProperty={handleAddToFav}
                                   />
                                </div>
                            </div>
                        </>
                    } />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                </Routes>
            </div>
        </div>
    </DndProvider>
  );
}

export default App;