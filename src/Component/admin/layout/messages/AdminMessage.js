import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Feedback from '../../../user/layout/addFeedback/Feedback';
import AdminFeedback from './AdminFeedback';

const AdminMessage = () => {

  const [getRole, setRole] = useState();

  useEffect(() => {
    setRole(localStorage.getItem('role'));
}, []);

  return (
    <div>
      {
        getRole == 1?(
          <AdminFeedback />
        ):(
          <Feedback />
        )
      }
    </div>
  )
}

export default AdminMessage