<<<<<<< Updated upstream
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setweekView } from '../../redux/reducers/notificationReducer';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectProps> = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const dispatch = useDispatch()

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    dispatch(setweekView())
    onChange(value);
  };

  return (
    <select className='border-0 cursor-pointer outline-none' value={selectedValue} onChange={handleOnChange}>
      <option value="Week">Week</option>
      <option value="Month">Month</option>
    </select>
  );
};

export default SelectField;
=======
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setweekView } from '../../redux/reducers/notificationReducer';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectProps> = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const dispatch = useDispatch()

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    dispatch(setweekView())
    onChange(value);
  };

  return (
    <select className='border-0 cursor-pointer outline-none' value={selectedValue} onChange={handleOnChange}>
      <option value="Week">Week</option>
      <option value="Month">Month</option>
    </select>
  );
};

export default SelectField;
>>>>>>> Stashed changes
