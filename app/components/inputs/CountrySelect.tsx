'use client';

import Select from 'react-select'

import citiesInBC from '@/app/hooks/useCountries';

export type CitySelectValue = {
  label: string;
  latlng: number[];
  value: string;
}

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = citiesInBC();

  return (
    <div style={{ zIndex: 1000 }}> {/* Adjust z-index here */}
      <Select
        placeholder="Select a city in BC"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        // ... (rest of your Select props)
      />
      <div className="mt-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-600">Complete Address</label>
        <input 
          type="text" 
          id="address" 
          name="address" 
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter complete address"
        />
      </div>
    </div>
  );
};

export default CitySelect;