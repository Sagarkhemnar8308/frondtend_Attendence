import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4300/getAll")
      .then((response) => response.json())
      .then((resp) => {
        console.warn("resp.", resp);
        if (Array.isArray(resp.data)) {
          setData(resp.data);
        } else {
          console.error("Invalid data format in API response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Get API </h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Password</th>
            <th>option</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
