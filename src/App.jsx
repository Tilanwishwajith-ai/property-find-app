import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import Favorites from './components/Favorites';
import NavBar from './components/NavBar';
import propertiesData from './data/properties.json';
import './App.css';
import './components/SearchForm.css';
import './components/PropertyCard.css';
import './components/PropertyDetails.css';
import './components/Favorites.css';
import './components/NavBar.css';

const App = () => {
  const [properties] = useState(propertiesData.properties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  const handleSearch = (criteria) => {
    const results = properties.filter((property) => {
      const matchesType = criteria.type ? property.type === criteria.type : true;
      const matchesPrice =
        (criteria.minPrice ? property.price >= criteria.minPrice : true) &&
        (criteria.maxPrice ? property.price <= criteria.maxPrice : true);
      const matchesBedrooms =
        (criteria.minBedrooms ? property.bedrooms >= criteria.minBedrooms : true) &&
        (criteria.maxBedrooms ? property.bedrooms <= criteria.maxBedrooms : true);
      const matchesPostcode = criteria.postcode
        ? property.location.toLowerCase().includes(criteria.postcode.toLowerCase())
        : true;

      // Convert custom "added" structure to a valid Date object
      const propertyDate = new Date(
        `${property.added.month} ${property.added.day}, ${property.added.year}`
      );
      const matchesDateAfter = criteria.dateAfter
        ? propertyDate >= new Date(criteria.dateAfter)
        : true;
      const matchesDateBefore = criteria.dateBefore
        ? propertyDate <= new Date(criteria.dateBefore)
        : true;

      return (
        matchesType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesPostcode &&
        matchesDateAfter &&
        matchesDateBefore
      );
    });
    setFilteredProperties(results);
  };

  const handleViewDetails = (id) => {
    const property = properties.find((property) => property.id === id);
    setSelectedProperty(property);
  };

  const handleAddFavorite = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      const updatedFavorites = [...favorites, property];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app-container">
      <NavBar />
      {selectedProperty ? (
        <PropertyDetails
          property={selectedProperty}
          onBack={() => setSelectedProperty(null)}
        />
      ) : (
        <>
          <div id="search">
            <SearchForm onSearch={handleSearch} />
          </div>
          <div className="main-content">
            <div id="properties" className="properties-section">
              <div className="properties-grid">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={handleViewDetails}
                    onAddFavorite={handleAddFavorite}
                  />
                ))}
              </div>
            </div>
            <div id="favorites" className="favorites-section">
              <Favorites
                favorites={favorites}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
