"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

interface AdminDetails {
  id: number;
  name: string;
  location: string;
  charge_customers: boolean;
  amount: {
    [key: string]: number;
  };
}

const Dashboard: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);

  useEffect(() => {
    // Function to fetch admin details
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch("https://stg.dhunjam.in/account/admin/4");
        const data: { status: number; response: string; data: AdminDetails } =
          await response.json();

        if (response.ok && data.status === 200) {
          setAdminDetails(data.data);
        } else {
          console.error(`Error: ${data.response}`);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    // Call the fetch function
    fetchAdminDetails();
  }, []); // Empty dependency array means this effect runs once after the first render

  return (
    <div className={styles.container}>
      <h1>{adminDetails?.name}, {adminDetails?.location} on Dhun Jam</h1>
    </div>
  );
};

export default Dashboard;
