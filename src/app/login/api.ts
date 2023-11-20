interface ApiResponse {
    status: number;
    response: string;
    data: {
      id: number;
      token: string;
    };
    server_err_msg: string | null;
    ui_err_msg: string | null;
  }
  
export const adminLogin = async (username: string, password: string): Promise<ApiResponse> => {
    const url = 'https://stg.dhunjam.in/account/admin/login';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.ui_err_msg || 'Failed to login');
    }
  
    const data = await response.json();
    return data;
  };
  