import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import '../src/Table.css'


export default function Table() {
  const [data, setData] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    axios
      .get("http://localhost:8000") // Ensure this matches your backend route
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const HandleAdd = () => {

    

    
  };

  const HandleRemove = () => {
    const id=parseInt(prompt("enter id to delete: "));
    axios.delete(`http://localhost:8000/delete/${id}`)
    .then((res)=>{console.log("from backend",res.data);
        setData((prevData) => prevData.filter((emp) => emp.EmployeeId !== parseInt(id)));
    })
    .catch((err)=>{console.log(err);
    })
  };

  const HandleEdits = (id) => {    
    const dept=prompt("Enter new Department: ");
    axios.put(`http://localhost:8000/update/${id}`,{Department:dept})
    .then((res)=>{"from backend",console.log(res.data);
        // setData((prevData) =>
        //     prevData.map((emp) =>
        //       emp._id === id ? { ...emp, Department: dept } : emp
        //     )
        //   );
    }).catch((err)=>{console.log(err);
    })
  };

  const HandleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <>
      <button onClick={HandleAdd}>Add + </button>
      <button onClick={HandleRemove}>Remove -</button>
      <table border="1" width={700}>
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Location</th>
            <th>Editable</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp, index) => (
            <tr key={index}>
              <td>{emp.EmployeeId}</td>
              <td>{emp.Name}</td>
              <td>{new Date(emp.DOB).toLocaleDateString()}</td>
              <td>{emp.Department}</td>
              <td>{emp.Location}</td>
              <td>
                <button onClick={() => HandleEdits(emp._id)}>Edit</button>
                <button onClick={() => HandleShowModal(emp)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


            {/* Modal for displaying selected employee details */}
            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem ? (
            <>
              <p>
                <strong>Name:</strong> {selectedItem.Name}
              </p>
              <p>
                <strong>DOB:</strong>{" "}
                {new Date(selectedItem.DOB).toLocaleDateString()}
              </p>
              <p>
                <strong>Department:</strong> {selectedItem.Department}
              </p>
              <p>
                <strong>Location:</strong> {selectedItem.Location}
              </p>
            </>
          ) : (
            <p>No item selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    </>
  );
}






// import React, { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";


// export default function Table(){
//     const [data, setData] = useState([]);

//     useEffect((user)=>{
//         axios.get('http://localhost:3000')
//         .then((res)=>{
//             setData(res.data)
//             console.log(res.data);
            
//         })
//         .catch((err)=>{console.log(err);}
//         )
//     },[])
    

//     const HandleAdd=()=>{

//     }

//     const HandleRemove =()=>{

//     }

//     const HandleEdit=()=>{

//     }

//     return(

//         <>
//         <button onClick={HandleAdd}>Add + </button>
//         <button onClick={HandleRemove}>Remove -</button>
//         <table border='1' width={700}>
//         <thead>
//            <tr>
//             <th>EmployeeId</th>
//             <th>Name</th>
//             <th>DOB</th>
//             <th>Department</th>
//             <th>Location</th>
//             <th>Editable</th>
//            </tr>
//           </thead>
//           <tbody>
//          {data.map((emp,index)=>{  
//             return(
//                 <tr key={index}>
//                     <td>{emp.EmployeeId}</td>
//                     <td>{emp.Name}</td>
//                     <td>{new Date(emp.DOB).toLocaleDateString()}</td>
//                     <td>{emp.Department}</td>
//                     <td>{emp.Location}</td>
//                     <td><button onClick={HandleEdit}>Edit </button></td>
//                 </tr>
//             )
//          })}
//          </tbody>
//         </table>
        
//         </>
//     )
// }