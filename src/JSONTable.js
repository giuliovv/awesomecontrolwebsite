import React from 'react';
import { TableBody, TableCell, TableRow, Link } from '@mui/material';

export default function JSONTable({ data }) {
  const url = data.url;

  // If url doesn't start with 'http' or 'https', prepend 'http://'
  const validURL = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;

  return (
    <TableBody>
      <TableRow>
        <TableCell align="center">
          <Link href={validURL} target="_blank" rel="noopener noreferrer">
            {data.name}
          </Link>
        </TableCell>
        <TableCell align="center">{data.headquarter}</TableCell>
        <TableCell align="center">{data.short_description}</TableCell>
        <TableCell align="center">{data.tags.join(', ')}</TableCell>
      </TableRow>
    </TableBody>
  );
}