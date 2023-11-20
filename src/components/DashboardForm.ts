import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
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

interface DashboardFormProps {
  fetchData: () => Promise<{
    status: number;
    response: string;
    data: AdminDetails;
  }>;
  updateData: (data: any) => Promise<{ status: number; response: string }>;
}

const useDashboardForm = ({ fetchData, updateData }: DashboardFormProps) => {
  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);
  const [chargeCustomers, setChargeCustomers] = useState<boolean>(false);
  const [category6Value, setCategory6Value] = useState<number>(0);
  const [category7Value, setCategory7Value] = useState<number>(0);
  const [category8Value, setCategory8Value] = useState<number>(0);
  const [category9Value, setCategory9Value] = useState<number>(0);
  const [category10Value, setCategory10Value] = useState<number>(0);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const MINIMUM_VALUES = {
    category_6: 99,
    category_7: 79,
    category_8: 59,
    category_9: 39,
    category_10: 19,
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { status, response, data } = await fetchData();

        if (status === 200) {
          setAdminDetails(data);
          setChargeCustomers(data.charge_customers);
          setCategory6Value(data.amount.category_6);
          setCategory7Value(data.amount.category_7);
          setCategory8Value(data.amount.category_8);
          setCategory9Value(data.amount.category_9);
          setCategory10Value(data.amount.category_10);
          checkSaveButtonStatus();
        } else {
          console.error(`Error: ${response}`);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchDashboardData();
  }, [fetchData]);

  useEffect(() => {
    const updateChart = () => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          // Destroy the existing chart
          Chart.getChart(chartRef.current)?.destroy();

          const data = {
            labels: [
              "Custom",
              "Category 1",
              "Category 2",
              "Category 3",
              "Category 4",
            ],
            datasets: [
              {
                label: "Amount",
                backgroundColor: "#F0C3F1",
                borderColor: "#FFFFFF",
                borderWidth: 0.5,
                data: [
                  category6Value,
                  category7Value,
                  category8Value,
                  category9Value,
                  category10Value,
                ],
              },
            ],
          };

          const options = {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "₹",
                  color: "#FFFFFF",
                },
                ticks: {
                  display: false,
                },
              },
              x: {
                ticks: {
                  color: "#FFFFFF",
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: true,
          };

          new Chart(ctx, {
            type: "bar",
            data: data,
            options: options,
          });
        }
      }
    };

    updateChart();
  }, [
    category6Value,
    category7Value,
    category8Value,
    category9Value,
    category10Value,
  ]);
  
  useEffect(() => {
    checkSaveButtonStatus();
  }, [chargeCustomers, category6Value, category7Value, category8Value, category9Value, category10Value]);

  const handleChargeCustomersChange = (value: boolean) => {
    setChargeCustomers(value);
    setSaveButtonDisabled(false);
  };

  const handleCategoryValueChange = (category: string, value: number) => {
    const categoryStateKey = `set${category
      .replace("_", "")
      .replace(/^\w/, (c) => c.toUpperCase())}Value`;
    const categoryStateSetter = eval(categoryStateKey);
    categoryStateSetter(value);
  };

  const checkSaveButtonStatus = () => {
    const isSaveButtonDisabled =
      !chargeCustomers ||
      isNaN(category6Value) ||
      category6Value < MINIMUM_VALUES.category_6 ||
      isNaN(category7Value) ||
      category7Value < MINIMUM_VALUES.category_7 ||
      isNaN(category8Value) ||
      category8Value < MINIMUM_VALUES.category_8 ||
      isNaN(category9Value) ||
      category9Value < MINIMUM_VALUES.category_9 ||
      isNaN(category10Value) ||
      category10Value < MINIMUM_VALUES.category_10;

      console.log(category6Value, category7Value, category8Value, category9Value, category10Value);
      

    setSaveButtonDisabled(isSaveButtonDisabled);
  };

  const handleSaveButtonClick = async () => {
    const response = await updateData({
      charge_customers: chargeCustomers,
      amount: {
        category_6: category6Value,
        category_7: category7Value,
        category_8: category8Value,
        category_9: category9Value,
        category_10: category10Value,
      },
    });

    if (response.status === 200) {
      console.log("Update successful");
      setSaveButtonDisabled(false);
    } else {
      console.error(`Error: ${response.response}`);
    }
  };


  return {
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
  };
};

export default useDashboardForm;
