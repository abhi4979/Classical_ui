export const updateCustomer = async ({ url, data, onSuccess, onError }) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Update failed:", errorText);
      if (onError) onError(errorText);
      return; // Important: exit early
    }

    // Success
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error("Fetch error:", err);
    if (onError) onError(err.message);
  }
};
