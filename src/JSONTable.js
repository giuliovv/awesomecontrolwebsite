import React from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material';

export default function JSONTable({ data }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center">{data.name}</TableCell>
        <TableCell align="center">{data.headquarter}</TableCell>
        <TableCell align="center">{data.short_description}</TableCell>
        <TableCell align="center">{data.tags.join(', ')}</TableCell>
      </TableRow>
    </TableBody>
  );
}