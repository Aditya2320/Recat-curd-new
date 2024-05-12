import './App.css';
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { PlusCircle, Edit, Trash2 } from 'react-feather';
import { Modal } from 'react-responsive-modal';
function App() {

  const blankuser = {
    "name":"",
    "email":"",
    "mobile ":"",
    "dob":""
  }

  const [open, setOpen] = useState(false);
  const [action,setAction] = useState('Add');
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useState(blankuser);
  const [editIndex, setEditIndex] = useState(null);


  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add')
  }

  const addUser = () => {
    setUserdata([...userdata,user]);
    setUser(blankuser);
    onCloseModal();
  }

  const editUser = (index) => {
    
    setAction('Edit');
    onOpenModal();
    console.log("index",index);
    const selectedUser = userdata.find((x,i) => i === index);
    setUser(selectedUser);
    setEditIndex(index);
     
  }

  const updateUser = () => {
    const newusers = userdata.map((x,i) => {
      if(i === editIndex){
        x = user
      }
      return x
    });
    setUserdata(newusers);
    setUser(blankuser);
    setEditIndex(null);
    onCloseModal();
  }

  const deleteUser = (index) => {
    const newusers = userdata.filter((x,i) => {return i !== index});
    setUserdata(newusers);
  }

  return (
    
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
      <button className='btn btn-p' onClick={onOpenModal}><PlusCircle size={16}></PlusCircle><span>Add</span></button>
      </div>
      <hr />
      { /*<p>{JSON.stringify(userdata)}</p>*/ }
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile no</th>
            <th>D.O.B</th>
            <th>Action</th>
            
            
          </tr>
        </thead>
        <tbody>
          {userdata.length > 0 && userdata.map((user,index) => {
            return (<tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.dob}</td>
              <td>
                <button className='btn ml2' onClick={() => editUser(index)}><Edit size={16}></Edit><span>Edit</span></button>
                <button className='btn ml2' onClick={() => deleteUser(index)}><Trash2 size={16}></Trash2><span>Delete</span></button>
              </td>
            </tr>)
          })
          }
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action}User</h2>
        {/*<p>{JSON.stringify(user)}</p>*/}
        <div className='form'>
          <label htmlFor="">Name</label>
          <input type="text" value={user.name} onChange={(e) => setUser({...user,"name":e.target.value})} />
          <label htmlFor="">Email</label>
          <input type="text" value={user.email} onChange={(e) => setUser({...user,"email":e.target.value})} />
          <label htmlFor="">Mobile no</label>
          <input type="text" value={user.mobile} onChange={(e) => setUser({...user,"mobile":e.target.value})} />
          <label htmlFor="">D.O.B</label>
          <input type="text" value={user.dob} onChange={(e) => setUser({...user,"dob":e.target.value})} />
          {action === 'Add' && <button className='btn' onClick={() => addUser()}>Submit</button>}
          {action === 'Edit' && <button className='btn' onClick={() => updateUser()}>Update</button>}
        </div>
      </Modal>
    </div>
  );
}

export default App;