export const fetchCustomer = async ({ url, schema, setValue,onSuccess,onError }) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Customer not found");

    const data = await response.json();

    for (const key in data) {
      if (data[key] !== null && key in schema.fields) {
        setValue(key, data[key]);
      }
    }

    if (typeof data.salesRepEmployeeNumber === 'object') {
      setValue('salesRepEmployeeNumber', data.salesRepEmployeeNumber.employeeNumber);
    }

    if (typeof data.creditLimit === 'number') {
      setValue('creditLimit', data.creditLimit);
    }

    if (typeof onSuccess === 'function') onSuccess(data);

  } catch (error) {
    alert("Error fetching customer: " + error.message);
     if (typeof onError === 'function') onError(error);

  }
};

