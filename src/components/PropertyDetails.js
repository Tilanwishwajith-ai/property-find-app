import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./PropertyDetails.css";

const PropertyDetails = ({ property }) => {
  // State for storing the currently selected image
  const [currentImage, setCurrentImage] = useState(
    localStorage.getItem("currentImage") || (property.images && property.images[0]) || "/fallback-image.jpg"
  );

  // Reset currentImage when the property changes
  useEffect(() => {
    if (property && property.images && property.images.length > 0) {
      setCurrentImage(property.images[0]);
    }
  }, [property]);

  useEffect(() => {
    localStorage.setItem("currentImage", currentImage);
  }, [currentImage]);

  // Handle navigation to next or previous image
  const navigateImage = (direction) => {
    if (property.images && property.images.length > 0) {
      const currentIndex = property.images.indexOf(currentImage);
      let newIndex;

      if (direction === "next") {
        newIndex = (currentIndex + 1) % property.images.length;
      } else if (direction === "prev") {
        newIndex = (currentIndex - 1 + property.images.length) % property.images.length;
      }

      setCurrentImage(property.images[newIndex]);
    }
  };

  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-details">
      <h2>{property.type}</h2>

      {/* Large Image Display */}
      <div className="image-display">
        <button
          className="nav-button prev-button"
          onClick={() => navigateImage("prev")}
        >
          &lt;
        </button>
        <img
          src={currentImage}
          alt={`${property.type} view`}
          className="large-image"
        />
        <button
          className="nav-button next-button"
          onClick={() => navigateImage("next")}
        >
          &gt;
        </button>
      </div>

      {/* Property Information */}
      <div className="property-info">
        <h1>{property.type}</h1>
        <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Tenure:</strong> {property.tenure}</p>
      </div>

      {/* Thumbnail Navigation */}
      <div className="thumbnail-gallery">
        {property.images && property.images.length > 0 ? (
          property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${property.type} - Thumbnail ${index + 1}`}
              className={`thumbnail ${currentImage === img ? "active" : ""}`}
              onClick={() => setCurrentImage(img)}
            />
          ))
        ) : (
          <p>No images available for this property.</p>
        )}
      </div>

      {/* Tabs for Property Details */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        <TabPanel>
          <h3> Description</h3>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <h3>Floor Plan</h3>
          {property.floorPlan ? (
            <div className="floor-plan-container">
              <img
                src={property.floorPlan}
                alt="Floor Plan"
                className="floor-plan"
              />
            </div>
          ) : (
            <p>No floor plan available.</p>
          )}
        </TabPanel>

        <TabPanel>
          <h3>Google Map</h3>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              property.location
            )}&output=embed`}
            width="100%"
            height="300"
            allowFullScreen
            title={`Map showing ${property.location}`}
          ></iframe>
        </TabPanel>
      </Tabs>

      {/* Exit Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="exit-button"
      >
        Exit
      </button>
    </div>
  );
};

export default PropertyDetails;
