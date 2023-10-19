import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [record, setRecord] = useState([]);
  const [editid, setEditid] = useState("");

  const onsubmit = () => {
    if (editid) {
      axios.put(`https://fir-ebdab-default-rtdb.firebaseio.com/data/${editid}.json`, {
        name: name,
        email: email,
        phone: phone
      }).then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        getView();
      }).catch((err) => {
        return false;
      })
    } else {
      axios.post(`https://fir-ebdab-default-rtdb.firebaseio.com/data.json`, {
        name: name,
        email: email,
        phone: phone
      }).then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        getView();
      }).catch((err) => {
        return false;
      })
    }
  }

  const getView = () => {
    axios.get(`https://fir-ebdab-default-rtdb.firebaseio.com/data.json`)
      .then((res) => {
        let data = res.data;
        let record = [];
        for (let i in data) {
          record.unshift({
            ...data[i], id: i
          });
        }
        setRecord(record); 

      }).catch((err) => {
        return false;
      })
  }

  const ondelete = () => {
    axios.get(`https://fir-ebdab-default-rtdb.firebaseio.com/data.json`)
      .then((res) => {
        let data = res.data;
        let record = [];
        for (let i in data) {
          record.unshift({
            ...data[i], id: i
          });
        }
        setRecord(record);
      }).catch((err) => {
        return false;
      })
  }
  


  const onedit = (id, name, email, phone) => {
    setEditid(id);
    setName(name);
    setEmail(email);
    setPhone(phone);
  }

  useEffect(() => {
    getView();
  }, [])

  return (
    <div className='table' style={{ display: "grid", justifyContent: "center", paddingTop: "100px" }}>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
          </tr>
          <tr>
            <td><input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} style={{ height: "30px", border: "1px solid #000", borderRadius: "20px", margin: "0 0 10px 0", paddingLeft: "20px", outline: "none" }} /></td>
          </tr>
          <tr>
            <td>Email :-</td>
          </tr>
          <tr>
            <td><input type='text' name='email' onChange={(e) => setEmail(e.target.value)} value={email} style={{ height: "30px", border: "1px solid #000", borderRadius: "20px", margin: "0 0 10px 0", paddingLeft: "20px", outline: "none" }} /></td>
          </tr>
          <tr>
            <td>Phone :-</td>
          </tr>
          <tr>
            <td><input type='text' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} style={{ height: "30px", border: "1px solid #000", borderRadius: "20px", margin: "0 0 20px 0", paddingLeft: "20px", outline: "none" }} /></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td>
              {
                editid ? (<button onClick={() => onsubmit()} style={{ marginRight: "20px", width: "60px", height: "30px", border: "1px solid #000", borderRadius: "20px" }}>Edit</button>)
                  : (<button onClick={() => onsubmit()} style={{ marginRight: "20px", width: "60px", height: "30px", border: "1px solid #000", borderRadius: "20px" }}>Submit</button>)
              }
            </td>
          </tr>
        </tbody>
      </table>
      <table cellPadding={10} cellSpacing={20}>
        <thead >
          <tr style={{}}>
            <th >Id</th>
            <th >Name</th>
            <th >Email</th>
            <th >Phone</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {
            record.map((val) => {
              const { id, name, phone, email } = val
              return (
                <tr>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>
                    <button onClick={() => ondelete(id)} style={{ margin: "0 10px", width: "60px", height: "30px", border: "1px solid #000", borderRadius: "20px" }}>Delete</button>
                    <button onClick={() => onedit(id, name, email, phone)} style={{ margin: "0 10px", width: "60px", height: "30px", border: "1px solid #000", borderRadius: "20px" }}>Edit</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>
    </div>
  );
}

export default App;