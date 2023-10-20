'use client';

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

interface Props {
  items: string[];
  onSelect: (items: string[]) => void
}
export default function MultiSelectFilter({ items, onSelect }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    const selectedItems = typeof value === 'string' ? value.split(',') : value;
    setSelected(selectedItems);
    onSelect(selectedItems);
  };

  return (
    <div className='w-full'>
      <FormControl className='w-full my-5'>
        <InputLabel id='demo-multiple-chip-label'>Filter by requester</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Filter by requester' />}
          renderValue={(selected) => (
            <Box className='flex flex-wrap gap-1'>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
