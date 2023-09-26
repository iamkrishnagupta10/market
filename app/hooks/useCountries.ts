const citiesInBC = [
  { value: 'Vancouver', label: 'Vancouver', latlng: [49.2827, -123.1207], region: 'British Columbia' },
  { value: 'Victoria', label: 'Victoria', latlng: [48.4284, -123.3656], region: 'British Columbia' },
  { value: 'Kelowna', label: 'Kelowna', latlng: [49.8877, -119.4960], region: 'British Columbia' },
  { value: 'Kamloops', label: 'Kamloops', latlng: [50.6745, -120.3273], region: 'British Columbia' },
  { value: 'Nanaimo', label: 'Nanaimo', latlng: [49.1659, -123.9401], region: 'British Columbia' },
  // Add more cities here
];

const useCitiesInBC = () => {
  const getAll = () => citiesInBC;

  const getByValue = (value: string) => {
    return citiesInBC.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCitiesInBC;
