import React from 'react';
import JSONTable from './JSONTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, Typography, Link, Box, TextField } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Assuming your combined file is named all_data.json
    const dataUrl = 'https://raw.githubusercontent.com/guidosassaroli/controlcompanies/main/data/all_data.json';
    
    axios.get(dataUrl)
      .then(response => {
        const combinedData = response.data;
        const dataArray = Object.values(combinedData);
        setData(dataArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.headquarter.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="App">
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Typography variant="h3" gutterBottom align="center">
          Awesome Control Companies
        </Typography>

        <Link href="https://github.com/guidosassaroli/controlcompanies/tree/main" target="_blank" rel="noopener">
          <Box display="flex" alignItems="center">
            <GitHubIcon />
            <Typography variant="body1" style={{ marginLeft: 8 }}>
              View on GitHub
            </Typography>
          </Box>
        </Link>
      </Box>

      <Box mb={2}>
        <TextField
          label="Search by name, tags or place"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      <Table style={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#f1f1f1', fontWeight: 'bold' }} align="center">Name</TableCell>
            <TableCell style={{ backgroundColor: '#f1f1f1', fontWeight: 'bold' }} align="center">Headquarter</TableCell>
            <TableCell style={{ backgroundColor: '#f1f1f1', fontWeight: 'bold' }} align="center">Short Description</TableCell>
            <TableCell style={{ backgroundColor: '#f1f1f1', fontWeight: 'bold' }} align="center">Tags</TableCell>
          </TableRow>
        </TableHead>
        {filteredData.map((item, index) => (
          <JSONTable key={index} data={item} />
        ))}
      </Table>
    </div>
  );
}

export default App;