import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Record from './Record';
function Records(props) {
    const [loading, setLoading] = useState(false);
    const [filter,setFilter]=useState("")
    const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadRecords = async () => {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const response = await axios.get(`http://localhost:4000/record`);
      setRecords(response.data);
      setLoading(false);
    };

    loadRecords();
  }, []);
    const handleSubmit=(e)=>{
        setFilter(e.target.value)
        
    }
    
    return (
        <div>
            <input className="search" placeholder="Search..." type="text" onChange={e=>handleSubmit(e)} value={filter} /> 
             <Table striped bordered hover>
      <thead>
        <tr>
          <th>Renter</th>
          <th>Owner</th>
          <th>item</th>
          <th>state</th>
        </tr>
        </thead>
        <tbody>
        {loading ? (
        <h4>Loading ...</h4>
      ) : (
        records
          .filter((value) => {
            if (filter === "") {
              return value;
            } else if (
              value.renter.name.toLowerCase().includes(filter.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => <Record record={item}/>))}
         </tbody>
        </Table>
        </div>
    );
}

export default Records;