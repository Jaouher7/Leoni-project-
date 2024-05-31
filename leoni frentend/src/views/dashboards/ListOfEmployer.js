import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table-v6';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-table-v6/react-table.css';
import ComponentCard from '../../components/ComponentCard';
import useAuth from './auth';
import user4 from '../../assets/images/users/user4.jpg';


const ListOfEmployer = () => {
  useAuth();
  const [data, setData] = useState([]);
  const token = Cookies.get('token') || localStorage.getItem('token');
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/users', {  
        headers: {
          Authorization: `Bearer ${token}`
        }
    }
      );
      console.log(response.data);
      setData(response.data);
      const donnees = response.data;
      const imageCrypteeBase64 = donnees.image;
      const imageData = Buffer.from(imageCrypteeBase64, 'base64');
      console.log(imageData); 
      
    } catch (error) {
      console.error(error);
    }
  };
  ListOfEmployer.propTypes = {
    original: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      roles: PropTypes.string,
      imageData: PropTypes.string,
    }),
  };
  const deleteUser = async (id) => {
    try {
       // eslint-disable-next-line
      const confirmed = window.confirm(`Are you sure you want to delete the user ?`);
       if (confirmed) {
        const response = await axios.delete(`http://localhost:8080/api/auth/users/${id}`);
        if (response.status === 200) {
          fetchData();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);
 
  const columns = [
    {
      
      columns: [
        {
          Header: 'id',
          accessor: 'id',
        },
        {
          Header: 'User name',
          id: 'username',
          accessor: 'username',
        },
      ],
    },
    {
      
      columns: [
        {
          Header: 'E-mail',
          accessor: 'email',
        },
      
      ],
    },
    {
  
      columns: [
        {
          Header: 'Role',
          accessor: 'roles',
        },
        {
          Header: 'Image',
          accessor: 'image.name',
          Cell: ({ original }) =>  {
            return (
              <>
                {original.imageData ? (
                  <img
                    src={`data:image/jpeg;base64,${original.imageData}`}
                    alt="user"
                    className="img-fluid rounded-circle"
                    width="80"
                  />
                ) : (
                  <img
                    src={user4}
                    alt="user"
                    className="img-fluid rounded-circle"
                    width="80"
                  />
                )}
              </>
            );
          }
        },
        {
          Header: 'Actions',
          accessor: 'id',
          Cell: ({ original }) => ( 
          
            <div className="button-group">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
              
                window.location.href = `/User/UpdateUser/${original.id}`;
              }}
            >
              Update
            </button>
            <button className="btn btn-danger" type='button'
                onClick={() => deleteUser(original.id)}
              >
                Delete
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  

  return (
    <div>
      <ComponentCard title="List of Employer">
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </ComponentCard>
    </div>
  );
};

export default ListOfEmployer;
