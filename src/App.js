import React from 'react';
import JSONTable from './JSONTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell } from '@mui/material';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the list of JSON files from the GitHub repository
    const repoUrl = 'https://api.github.com/repos/guidosassaroli/controlcompanies/git/trees/main?recursive=1';
    
    axios.get(repoUrl)
      .then(response => {
        const files = response.data.tree.filter(file => file.path.startsWith('data/') && file.path.endsWith('.json'));
        
        // Download each JSON file and store its contents
        const fetchData = async () => {
          for (const file of files) {
            const fileUrl = `https://raw.githubusercontent.com/guidosassaroli/controlcompanies/main/${file.path}`;
            const fileData = await axios.get(fileUrl);
            
            // Update the state as each file arrives
            setData(prevData => [...prevData, fileData.data]);
          }
        };

        fetchData();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <Table style={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#f1f1f1', fontWeight: 'bold' }} align="center">Name</TableCell>
            <TableCell style={{ backgroundColor: '#f1f1f1', fontWeight: 'bold' }} align="center">Headquarter</TableCell>
            <TableCell style={{ backgroundColor: '#f1f1f1', fontWeight: 'bold' }} align="center">Short Description</TableCell>
            <TableCell style={{ backgroundColor: '#f1f1f1', fontWeight: 'bold' }} align="center">Tags</TableCell>
          </TableRow>
        </TableHead>
        {data.map((item, index) => (
          <JSONTable key={index} data={item} />
        ))}
      </Table>
    </div>
  );
}

export default App;