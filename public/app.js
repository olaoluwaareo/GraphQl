function calculate() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const operation = document.getElementById('operation').value;
  
    // GraphQL query based on the selected operation
    const query = `
      {
        ${operation}(a: ${a}, b: ${b})
      }
    `;
  
    // Send the GraphQL query to the server
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then(response => response.json())
      .then(data => {
        const result = data.data[operation];
        document.getElementById('result').innerText = `Result: ${result}`;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error performing calculation';
      });
  }
  