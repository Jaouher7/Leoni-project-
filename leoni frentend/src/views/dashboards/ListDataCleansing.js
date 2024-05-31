import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import './ReactBootstrapTable.scss';
import ComponentCard from '../../components/ComponentCard';


//This is for the Delete row
function onAfterDeleteRow(rowKeys) {
  // eslint-disable-next-line no-alert
  alert(`The rowkey you dropped: ${rowKeys}`);
} 

//This is for the Search item
function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
  }
}

const options = {
  afterDeleteRow: onAfterDeleteRow, // A hook for after dropping rows.
  afterSearch, // define an after search hook
};

const selectRowProp = {
  mode: 'checkbox',
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};

const ListDataCleansing = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Row>
        <Col md="12">
          <ComponentCard title="List Of Data Cleansing">
          
            <BootstrapTable
              striped
              hover
              condensed
              search
              data={data}
              deleteRow
              selectRow={selectRowProp}
              pagination
              updateRow
              
              options={options}
              cellEdit={cellEditProp}
              tableHeaderClass="mb-0"
            >
             
              <TableHeaderColumn width="100" dataField="reference" isKey>
                Reference
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="description">
                Description
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="company">
                Company
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="Status">
                Status
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default ListDataCleansing;