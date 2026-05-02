// Function to fetch data from Google Sheet
function fetchSheetData() {
    // Your spreadsheet ID
    const spreadsheetId = '1dnxqPAaUgbcST_0t9UqOSjUW447iKyMImr13_wpYMKk';
    
    // Construct the URL to get the sheet as JSON (assuming the sheet is published)
    const sheetId = 0; // First sheet (gid=0)
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${sheetId}`;
    
    console.log('Fetching data from Google Sheet...');
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonString = text.substring(jsonStart, jsonEnd);
        
        const data = JSON.parse(jsonString);
        
        const processedData = processTableData(data.table);
        
        console.log('Google Sheet Data:');
        console.log(processedData);
  
        processedData.forEach((row, index) => {
          const url = row['Link to journal'];
          if(url != null && (url.replace('https://www.tandfonline.com','').toLocaleUpperCase() == window.location.pathname.replace('20','').toLocaleUpperCase())){
            console.log(row['Deposited in PMC']);
            console.log(row['Google Scholar']);
            console.log(row['Indexed in DOAJ']);
            console.log(row['Indexed in Ei Compendex']);
            console.log(row['Indexed in Embase']);
            console.log(row['Indexed in Geobase']);
            console.log(row['Indexed in MEDLINE']);
            console.log(row['Scopus covered?']);
            console.log();

            const logoHtml = `
                ${row['Web of Science Covered'] == 'Yes' ? `
                    <div class="${tag}__logo">
                        <img src="${logoData.url}" alt="${logoData.name}">
                        <p class="name">${logoData.name}</p>
                        <p class="${tag}__tooltip">${logoData.tooltip}</p>
                    </div>              
                    ` : ''
                }
            `;
          }
        });
        
        return processedData;
      })
      .catch(error => {
        console.error('Error fetching spreadsheet:', error);
        console.log('Note: Make sure the spreadsheet is published to the web (File > Share > Publish to web)');
      });
  }
  
  // Helper function to convert Google's data format to a more usable array of objects
  function processTableData(table) {
    // Extract column headers
    const headers = table.cols.map(col => col.label || `Column${col.id}`);
    
    // Map each row to an object with keys from headers
    return table.rows.map(row => {
      const rowData = {};
      row.c.forEach((cell, index) => {
        // Handle null cells and different value types
        rowData[headers[index]] = cell ? (cell.v !== undefined ? cell.v : '') : '';
      });
      return rowData;
    });
  }
  
  // Call the function immediately
  fetchSheetData();