import React, { useEffect, useState } from "react";

function Home() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Fetch from backend
  useEffect(() => {
    fetch("http://localhost:4002/api/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="home-container">
      <h2 style={{ textAlign: "center" }}>BEST SELLER</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {plants.map((plant, index) => (
          <div
            key={index} className="plant-card">
            <img
              src={`http://localhost:4002/uploads/${plant.image}`} // Dynamic image
              alt={plant.name}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedPlant(plant)} // open modal
            />
            <h4>{plant.name}</h4>
            <p>₹{plant.price}</p>
            <button
  style={{
    marginTop: "8px",
    padding: "6px 12px",
    backgroundColor: "#43b558",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
  onClick={() => setSelectedPlant(plant)} // opens the modal
>
  View Details
</button>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedPlant && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "20px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={`http://localhost:4002/uploads/${selectedPlant.image}`}
              alt={selectedPlant.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>{selectedPlant.name}</h3>
            <p><strong>Type:</strong> {selectedPlant.type}</p>
            <p><strong>Description:</strong> {selectedPlant.description}</p>
            <p><strong>Price:</strong> ₹{selectedPlant.price}</p>
            <button
              onClick={() => setSelectedPlant(null)}
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#43b558",
                color: "white",
                border: "none",
                borderRadius: "5px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
