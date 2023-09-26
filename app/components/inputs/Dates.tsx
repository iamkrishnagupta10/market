// Dates.tsx
import React, { useState } from 'react';
import Input from './Input';
import DatePicker from './Calendar';  // Import the existing DatePicker component
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { Range, RangeKeyDict } from 'react-date-range';

interface DateRange {
  startDate: Range;
  endDate: Range;
  startTime: string;
  endTime: string;
  specialDate: string;
}

interface DatesProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Dates: React.FC<DatesProps> = ({ register, errors }) => {
  const [dateRanges, setDateRanges] = useState<DateRange[]>([
    {
      startDate: { startDate: new Date(), endDate: new Date(), key: 'selection' },
      endDate: { startDate: new Date(), endDate: new Date(), key: 'selection' },
      startTime: '',
      endTime: '',
      specialDate: '',
    },
  ]);

  const addDateRange = () => {
    setDateRanges([
      ...dateRanges,
      {
        startDate: { startDate: new Date(), endDate: new Date(), key: 'selection' },
        endDate: { startDate: new Date(), endDate: new Date(), key: 'selection' },
        startTime: '',
        endTime: '',
        specialDate: '',
      },
    ]);
  };

  const handleDateChange = (index: number, key: 'startDate' | 'endDate', value: RangeKeyDict) => {
    const updatedDateRanges = [...dateRanges];
    updatedDateRanges[index][key] = value.selection;
    setDateRanges(updatedDateRanges);
  };

  return (
    <div className="flex flex-col gap-4">
      {dateRanges.map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <DatePicker
            value={dateRanges[index].startDate}
            onChange={(value) => handleDateChange(index, 'startDate', value)}
          />
          <DatePicker
            value={dateRanges[index].endDate}
            onChange={(value) => handleDateChange(index, 'endDate', value)}
          />
          <Input
            id={`startTime[${index}]`}
            label="Start Time"
            type="time"
            register={register}
            errors={errors}
            required
          />
          <Input
            id={`endTime[${index}]`}
            label="End Time"
            type="time"
            register={register}
            errors={errors}
            required
          />
          <Input
            id={`specialDate[${index}]`}
            label="Special Date"
            type="date"
            register={register}
            errors={errors}
          />
        </div>
      ))}
      <button
        type="button"
        className="mt-2 bg-blue-500 text-white p-2 rounded"
        onClick={addDateRange}
      >
        Add Another Date Range
      </button>
    </div>
  );
};

export default Dates;
