import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector

const ManageSellerOrders = () => {
  const { user } = useSelector((state) => state.auth); // Get the user from the Redux store
  const sellerId = user?.id; // Assuming the user object contains the seller ID

  // Log the user data to the console
  console.log("User data:", user);

  const [orders, setOrders] = useState([]);

  const fetchSellerOrders = async () => {
    if (!sellerId) {
      console.error("Seller ID is undefined."); // Log error if sellerId is not available
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/orders/seller/${sellerId}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("Fetched orders:", data); // Log fetched orders
      setOrders(data);
    } catch (error) {
      console.error("Error fetching seller orders:", error);
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, [sellerId]); // Re-fetch if sellerId changes

  return (
    <div>
      <h1>Manage Seller Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{/* Render order details here */}</li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default ManageSellerOrders;
