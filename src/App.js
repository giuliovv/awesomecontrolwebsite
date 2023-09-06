import React from 'react';
import JSONTable from './JSONTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, Typography, Link, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const [data, setData] = useState([]);
  const [uniqueNames, setUniqueNames] = useState(new Set());

  useEffect(() => {
    // Fetch the list of JSON files from the GitHub repository
    const repoUrl = 'https://api.github.com/repos/guidosassaroli/controlcompanies/git/trees/main?recursive=1';
    
    axios.get(repoUrl)
      .then(response => {
        const files = response.data.tree.filter(file => file.path.startsWith('data/') && file.path.endsWith('.json'));
        
        // Download each JSON file and store its contents
        const fetchData = async () => {
          for (const file of files) {
            if (file.path.endsWith('_data_structure.json')) {
              continue;
            }
        
            const fileUrl = `https://raw.githubusercontent.com/guidosassaroli/controlcompanies/main/${file.path}`;
            const fileData = await axios.get(fileUrl);
      
            if (!uniqueNames.has(fileData.data.name)) {
              // Update the set with new unique name
              setUniqueNames(prevUniqueNames => new Set([...prevUniqueNames, fileData.data.name]));
      
              // Update state with new data
              setData(prevData => [...prevData, fileData.data]);
            }
          }
        };

        fetchData();
        console.log("Setting data: ", data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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