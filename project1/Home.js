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


// import React, { useState } from "react";
// import logo from "./plant.png"; 
// import PlantList from "./PlantList";
// import PlantDetails from "./PlantDetails";

// function Home() {
//   const [showList, setShowList] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <div>
//       {/* Header section with logo and toggle buttons */}
//       <div className="home" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", backgroundColor: "#43b558" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//           <img src={logo} alt="Plant Logo" width="80" />
//           <input type="text" placeholder="Search..." />
//         </div>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <button onClick={() => setShowList(!showList)}>
//             {showList ? "Hide" : "Show"} Plant List
//           </button>
//           <button onClick={() => setShowDetails(!showDetails)}>
//             {showDetails ? "Hide" : "Show"} Details
//           </button>
//         </div>
//       </div>

//       {/* Conditional sections */}
//       {showList && <PlantList />}
//       {showDetails && <PlantDetails />}

//       {/* Static plant image grid */}
//       <div className="images" style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         <div>cactus<br /><img src="https://www.thespruce.com/thmb/Yl2rOmWKj-gMa7c6Hi04o3UcjCU=/600x400/how-to-grow-cactus-1902954-04-d5f8940f124a4ac3abce5369f316830a.jpg" width="180" /></div>
//         <div>eucalyptus<br /><img src="https://www.thespruce.com/thmb/MDsaqFjxRMAQQ9xbBBauvJ5Z1UA=/600x400/DryingEucalyptus_300-7063b7e0fd7f4ce9aea79223b6512ad3.jpg" width="180" /></div>
//         <div>philodendron<br /><img src="https://www.thespruce.com/thmb/9S2zD7Fa2_-y3g6VIEHfL-5b7w8=/600x400/grow-philodendron-houseplants-1902768-06-a9bdf1c387414f05a6ac3176bdb4115e.jpg" width="180" /></div>
//         <div>snake plant<br /><img src="https://www.thespruce.com/thmb/un1pY2DAldWETjVwilpBZH7qqAo=/600x400/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1.jpg" width="180" /></div>
//         <div>orchid<br /><img src="https://www.thespruce.com/thmb/PX1kxm4q4M1gaYbM1cBftTN089A=/600x400/cattleya-orchids-overview-1902861-01-41afe3700488424698d11752a10eee27.jpg" width="180" /></div>
//         <div>abelia<br /><img src="https://www.thespruce.com/thmb/vOlwMCmMlotN46efo3Oo0BbpGV8=/600x400/abelia-growing-guide-5216289-hero-bcca3a9260ae44109c507904c233de62.jpg" width="180" /></div>
//         <div>african iris<br /><img src="https://www.thespruce.com/thmb/9at-v9SGUH-7BUYqVwZwDlu6ycU=/600x400/SPR-african-iris-care-guide-6822878-01-922e33af4fb94379a5131b9019d05e58.jpg" width="180" /></div>
//         <div>baby's breath<br /><img src="https://www.thespruce.com/thmb/Lm0zXIW162L78jL-vLeilgeAiTs=/600x400/babys-breath-garden-favorite-4082480-hero-3541658fa2994c57b0b7bea92973f2b8.JPG" width="180" /></div>
//         <div>baby tears<br /><img src="https://www.thespruce.com/thmb/moD-erS749mOo3NdcbnmHdrNGdw=/600x400/baby-tears-plant-4582879-RECIRC-4e48ca937305404ead1da7ba176e1877.jpg" width="180" /></div>
//         <div>bahia grass<br /><img src="https://www.thespruce.com/thmb/uD8iV5GVXiE89qj9aBp2T6OH4dU=/600x400/growing-bahia-grass-5093956-hero-d961302ac698404c891924c1abf0c8ab.jpg" width="180" /></div>
//         <div>cabbage<br /><img src="https://www.thespruce.com/thmb/3u9nyrIIarhudk6xQtW0t1jP4xw=/600x400/growing-and-caring-for-cabbage-plants-1402815-4-42a06f135816449286b60694cf6bd30c.jpg" width="180" /></div>
//         <div>dahlia<br /><img src="https://www.thespruce.com/thmb/F98pv-caDDLC4U4dJFutGlHkSQw=/600x400/growing-and-caring-for-dahlias-1402255-03-306dc2f2b09849189998f1bbe86b2a44.jpg" width="180" /></div>
//       </div>
//     </div>
//   );
// }

// export default Home;
