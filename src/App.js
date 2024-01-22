import { useEffect, useState } from 'react';
import './App.css';
import Popup from './component/Popup';

function App() {

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  //get
  const [data, setData] = useState([]);


  //post
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    fetch("http://localhost:4300/getAll")
      .then((response) => response.json())
      .then((resp) => {
        console.warn("resp.", resp);
        setData(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEdit = (id) => {
    console.log(`edit clicked for ID: ${id}`);
  };

  //post Call function
  function saveUser() {
    if (!email) {
      setErrorEmail('Please Enter the email ... ');
      return;
    } else
      if (!password) {
        setErrorPassword('Please Enter the password  .... ')
      } 
    fetch("http://localhost:4300/postuser", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(resp => {
        console.warn("User saved successfully:", resp);
        fetch("http://localhost:4300/getAll")
          .then(response => response.json())
          .then(data => setData(data.data))
          .catch(error => console.error("Error fetching data:", error));
      })
      .catch(error => console.error("Error saving user:", error));
  }

  function deleteUser(id) {
    fetch(`http://localhost:4300/deleteuser/${id}`, {
      method: 'DELETE',
    }).then(response => response.json())
      .then(resp => {
        console.warn("User Delete successfully:", resp);
        fetch("http://localhost:4300/getAll")
          .then(response => response.json())
          .then(data => setData(data.data))
          .catch(error => console.error("Error fetching data:", error));
      })
      .catch(error => console.error("Error saving user:", error));
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Crud Api</h1>
      <div className='row mx-0'>
        <div className='col-7'>
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
                  <td style={{ width: '43%' }}>{item._id}</td>
                  <td style={{ width: '15%' }}>{item.email}</td>
                  <td style={{ width: '15%' }}>{item.password}</td>
                  <td>
                    <button onClick={() => handleEdit(item._id)} style={{ backgroundColor: 'lightsteelblue', border: 'none', borderRadius: '6px', height: '5vh', color: 'white', width: '60px' }} className='ml-2'>Edit</button>
                    <button onClick={() => deleteUser(item._id)} style={{ backgroundColor: 'red', border: 'none', borderRadius: '6px', height: '5vh', color: 'white' }} className='ml-2'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-5' style={{ border: '1px solid black', height: '21vh', width: '30px', padding: '30px' }} >
          <form>
            <input
              placeholder='Enter Email'
              type="text"
              value={email}
              className='col-6 form-control container'
              onChange={(e) => { setEmail(e.target.value) }}
              name='name'
            />
            {errorEmail && <p style={{ color: 'red', textAlign: 'center' }}>{errorEmail}</p>}
            <input
              placeholder='Enter Password'
              type="password"
              className='col-6 form-control container mt-3'
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              name='password'
            />
            {errorPassword && <p style={{ color: 'red', textAlign: 'center' }}>{errorPassword}</p>}
            <div className="d-flex justify-content-center mt-3">
              <button
                type='button'
                onClick={saveUser}
                style={{ backgroundColor: 'darkgreen', border: 'none', borderRadius: '5px', height: '5vh', color: 'white' }}
              >
                Save User
              </button>
            </div>
          </form>
        </div>
        {/* <Popup trigger={true}>
          <p>Do You Want To Delete ?</p>
          <button
                type='button'
                className='ml-4'
                style={{ backgroundColor:'red', border: 'none', borderRadius: '5px', height: '5vh', color: 'white' }}
              >
                Yes
              </button>
              <button
                type='button'
                
                style={{ backgroundColor: 'darkgreen', border: 'none', borderRadius: '5px', height: '5vh', color: 'white' }}
              >
                No
              </button>
        </Popup> */}
      </div>
    </>
  );
}

export default App;

