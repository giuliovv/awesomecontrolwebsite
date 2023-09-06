import React from 'react';
import { TableBody, TableCell, TableRow, Link } from '@mui/material';

export default function JSONTable({ data }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center">
          {data.url ? (
            <Link href={data.url} target="_blank" rel="noopener">
              {data.name}
            </Link>
          ) : (
            data.name
          )}
        </TableCell>
        <TableCell align="center">{data.headquarter}</TableCell>
        <TableCell align="center">{data.short_description}</TableCell>
        <TableCell align="center">{data.tags.join(', ')}</TableCell>
      </TableRow>
    </TableBody>
  );
}
