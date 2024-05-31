import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactTable from 'react-table-v6';
import { Button} from 'reactstrap';
import PropTypes from 'prop-types';
import 'react-table-v6/react-table.css';
import useAuth from './auth';

import ComponentCard from '../../components/ComponentCard';

  const ListOfProductionDesign = () => {
    useAuth();
  const [modal, setModal] = useState(false);
  const [ setObj] = useState({});
  const [jsonData, setJsonData] = useState([]);

  console.log(Cookies.get('token'));
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/designs/show', {  headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },}
      );

      setJsonData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const deleteDesign = async (id) => {
    try { 
      // eslint-disable-next-line
      const confirmed = window.confirm(`Are you sure you want to delete the design ${id} ? `);
      if (confirmed) {
      const response = await axios.delete(`http://localhost:8080/api/designs/delete/${id}`);
      if (response.status === 204) {
        fetchData();
      }
      else{
        // eslint-disable-next-line
        window.alert(`The design ${id} is used in a Task, you can't delete it`);
      }
    }
    } catch (error) {
      console.error(error);
    }
  };

  ListOfProductionDesign.propTypes = {
    original: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      roles: PropTypes.string,
    }),
  };


  const data2 = jsonData.map((prop, key) => {
    return {
      id: key,
      name: prop.name,
      designation: prop.designation,
      location: prop.location,
      age: prop.age,
      actions: (
        <div className="text-center">
          <Button
            onClick={() => {
              const sobj = data2.find((o) => o.id === key);
              setModal(!modal);
              setObj(sobj);
            }}
            color="inverse"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fa fa-edit" />
          </Button>
        </div>
      ),
    };
  });

  return (
    <div>
      

      <ComponentCard title="List of production design ">
        <ReactTable
          columns={[
            {
              Header: 'id',
              accessor: 'id',
            },
            {
              Header: 'plant',
              accessor: 'plant',
            },
            {
              Header: 'account',
              accessor: 'account',
            },
          
            {
              Header: 'projectName',
              accessor: 'projectName',
            },
            {
              Header: 'designDescription',
              accessor: 'designDescription',
            },
            {
              Header: 'usedSystemBeforeMigration',
              accessor: 'usedSystemBeforeMigration',
            },
            {
              Header: 'designNbr',
              accessor: 'designNbr',
            },
            {
              Header: 'countOfLeads',
              accessor: 'countOfLeads',
            },
            {
              Header: 'targetDesignTimeAssigned',
              accessor: 'targetDesignTimeAssigned',
            },
            {
              Header: 'plannedStartDate',
              accessor: 'plannedStartDate',
            },
            {
              Header: 'designImportResponsible',
              accessor: 'designImportResponsible',
            },
            {
              Header: 'componentLoadedToLpDb',
              accessor: 'componentLoadedToLpDb',
            },
            {
              Header: 'productDesignCompleted',
              accessor: 'productDesignCompleted',
            },
            {
              Header: 'designIndex',
              accessor: 'designIndex',
            }, {
              Header: 'start date',
              accessor: 'startDate',
            },
            {
              Header: 'drcCompletedStatus',
              accessor: 'drcCompletedStatus',
            },
            {
              Header: 'leadLengthUpdate',
              accessor: 'leadLengthUpdate',
            },
            {
              Header: 'eCNsWorkpackageRecieved',
              accessor: 'eCNsWorkpackageRecieved',
            },
            {
              Header: 'processingTvmCompletedStatus',
              accessor: 'processingTvmCompletedStatus',
            },
            {
              Header: 'sBomUploadStatus',
              accessor: 'sBomUploadStatus',
            },
            {
              Header: 'checkedBy',
              accessor: 'checkedBy',
            },
            {
              Header: 'designMigrationStatus',
              accessor: 'designMigrationStatus',
            },
            {
              Header: 'comments',
              accessor: 'comments',
            },
           
            {
              Header: 'actions',
              accessor: 'id',
              disableResizing: true,
              sortable: false,
              filterable: false,
              width: 175,
              Cell: ({ original }) => ( 
          
                <div className="button-group">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                  
                    window.location.href = `/ProductionDesign/Update/${original.id}`;
                  }}
                >
                  Update
                </button>
                <button className="btn btn-danger" type='button'
                    onClick={() => deleteDesign(original.id)}
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
          defaultPageSize={12}
          showPaginationBottom
          className="-striped -highlight"
          data={jsonData}
          filterable
        />
      </ComponentCard>
    </div>
  );
};

export default ListOfProductionDesign;


