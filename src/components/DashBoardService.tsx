const API_BASE_URL = "https://stg.dhunjam.in/account/admin/4";

export const fetchDashboardData = async () => {
  const response = await fetch(API_BASE_URL);
  const data = await response.json();

  return { status: response.ok ? 200 : response.status, response: data.response, data: data.data };
};

export const updateDashboardData = async (data: any) => {
  const response = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  return { status: response.ok ? 200 : response.status, response: responseData.response };
};
