"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";


interface AdminDetails {
  id: number;
  name: string;
  location: string;
  charge_customers: boolean;
  amount: {
    category_6: number;
    category_7: number;
    category_8: number;
    category_9: number;
    category_10: number;
  };
}

const Dashboard: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);
  const [chargeCustomers, setChargeCustomers] = useState<boolean>(false);
  const [category6Value, setCategory6Value] = useState<number>(0);
  const [category7Value, setCategory7Value] = useState<number>(0);
  const [category8Value, setCategory8Value] = useState<number>(0);
  const [category9Value, setCategory9Value] = useState<number>(0);
  const [category10Value, setCategory10Value] = useState<number>(0);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch("https://stg.dhunjam.in/account/admin/4");
        const data: { status: number; response: string; data: AdminDetails } =
          await response.json();

        if (response.ok && data.status === 200) {
          setAdminDetails(data.data);
          setChargeCustomers(data.data.charge_customers);
          setCategory6Value(data.data.amount.category_6);
          setCategory7Value(data.data.amount.category_7);
          setCategory8Value(data.data.amount.category_8);
          setCategory9Value(data.data.amount.category_9);
          setCategory10Value(data.data.amount.category_10);
          checkSaveButtonStatus(data.data.charge_customers);
        } else {
          console.error(`Error: ${data.response}`);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleChargeCustomersChange = (value: boolean) => {
    setChargeCustomers(value);
    checkSaveButtonStatus(value);
  };

  const handleCategoryValueChange = (category: string, value: number) => {
    switch (category) {
      case "category_6":
        setCategory6Value(value);
        break;
      case "category_7":
        setCategory7Value(value);
        break;
      case "category_8":
        setCategory8Value(value);
        break;
      case "category_9":
        setCategory9Value(value);
        break;
      case "category_10":
        setCategory10Value(value);
        break;
      default:
        break;
    }

    checkSaveButtonStatus(chargeCustomers);
  };

  const checkSaveButtonStatus = (chargeCustomers: boolean) => {
    const isSaveButtonDisabled =
      !chargeCustomers;
    setSaveButtonDisabled(isSaveButtonDisabled);
  };

  const handleSaveButtonClick = async () => {
    const response = await fetch("https://stg.dhunjam.in/account/admin/4", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        charge_customers: chargeCustomers,
        amount: {
          category_6: category6Value,
          category_7: category7Value,
          category_8: category8Value,
          category_9: category9Value,
          category_10: category10Value,
        },
      }),
    });

    const responseData = await response.json();

    if (response.ok && responseData.status === 200) {
      console.log("Update successful");
    } else {
      console.error(`Error: ${responseData.response}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        {adminDetails?.name}, {adminDetails?.location} on Dhun Jam
      </h1>
      <div className={styles.radioContainer}>
        <label>Do you want to charge your customers for requesting songs?</label>
        <div className={styles.radioButton}>
          <label>
            <input
              type="radio"
              value="yes"
              checked={chargeCustomers}
              onChange={() => handleChargeCustomersChange(true)}
              className={styles.radio}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={!chargeCustomers}
              onChange={() => handleChargeCustomersChange(false)}
              className={styles.radio}
            />
            No
          </label>
        </div>
      </div>
      <div className={styles.customSong}>
        <label>Custom song request amount:</label>
        <input
          type="number"
          value={category6Value}
          onChange={(e) => handleCategoryValueChange("category_6", parseInt(e.target.value, 10))}
          disabled={!chargeCustomers}
        />
      </div>
      <div className={styles.categorySong}>
        <label>Regular song request amounts, from high to low:</label>
        <input
          type="number"
          value={category7Value}
          onChange={(e) => handleCategoryValueChange("category_7", parseInt(e.target.value, 10))}
          disabled={!chargeCustomers}
        />
        <input
          type="number"
          value={category8Value}
          onChange={(e) => handleCategoryValueChange("category_8", parseInt(e.target.value, 10))}
          disabled={!chargeCustomers}
        />
        <input
          type="number"
          value={category9Value}
          onChange={(e) => handleCategoryValueChange("category_9", parseInt(e.target.value, 10))}
          disabled={!chargeCustomers}
        />
        <input
          type="number"
          value={category10Value}
          onChange={(e) => handleCategoryValueChange("category_10", parseInt(e.target.value, 10))}
          disabled={!chargeCustomers}
        />
      </div>
      <button className={styles.save} onClick={handleSaveButtonClick} disabled={saveButtonDisabled}>
        Save
      </button>
    </div>
  );
};

export default Dashboard;
