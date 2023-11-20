"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css";
import Chart from "chart.js/auto";
import useDashboardForm from "@/components/DashboardForm";
import { fetchDashboardData, updateDashboardData } from "@/components/DashBoardService";
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
  const {
    adminDetails,
    chargeCustomers,
    category6Value,
    category7Value,
    category8Value,
    category9Value,
    category10Value,
    saveButtonDisabled,
    chartRef,
    handleChargeCustomersChange,
    handleCategoryValueChange,
    handleSaveButtonClick,
  } = useDashboardForm({
    fetchData: fetchDashboardData,
    updateData: updateDashboardData,
  });

  return (
    <div className={styles.container}>
      <h1>
        {adminDetails?.name}, {adminDetails?.location} on Dhun Jam
      </h1>
      <div className={styles.radioContainer}>
        <label>
          Do you want to charge your customers for requesting songs?
        </label>
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
          onChange={(e) =>
            handleCategoryValueChange(
              "category_6",
              parseInt(e.target.value, 10)
            )
          }
          disabled={!chargeCustomers}
        />
      </div>
      <div className={styles.categorySong}>
        <label>Regular song request amounts, from high to low:</label>
        <input
          type="number"
          value={category7Value}
          onChange={(e) =>
            handleCategoryValueChange(
              "category_7",
              parseInt(e.target.value, 10)
            )
          }
          disabled={!chargeCustomers}
        />
        <input
          type="number"
          value={category8Value}
          onChange={(e) =>
            handleCategoryValueChange(
              "category_8",
              parseInt(e.target.value, 10)
            )
          }
          disabled={!chargeCustomers}
        />
        <input
          type="number"
          value={category9Value}
          onChange={(e) =>
            handleCategoryValueChange(
              "category_9",
              parseInt(e.target.value, 10)
            )
          }
          disabled={!chargeCustomers}
        />
        <input
          type="number"
          value={category10Value}
          onChange={(e) =>
            handleCategoryValueChange(
              "category_10",
              parseInt(e.target.value, 10)
            )
          }
          disabled={!chargeCustomers}
        />
      </div>
      {/*Chart to be rendered */}
      <div className={styles.chartContainer}>
        <canvas ref={chartRef} width="600" height="400"></canvas>
      </div>
      <button
        className={styles.save}
        onClick={handleSaveButtonClick}
        disabled={saveButtonDisabled}
      >
        Save
      </button>
    </div>
  );
};

export default Dashboard;
