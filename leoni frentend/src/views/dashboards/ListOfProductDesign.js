import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-v6';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import 'react-table-v6/react-table.css';
import ComponentCard from '../../components/ComponentCard';





const ListOfProductDesign = () => {
  const [modal, setModal] = useState(false);
  const [obj, setObj] = useState({});
  const [jsonData, setJsonData] = useState([]);

  
  const fetchData = async () => {
    try {
      const response = await axios.get('your_api_endpoint');
      setJsonData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = event.target.id.value;
    const name = event.target.name.value;
    const designation = event.target.designation.value;
    const location = event.target.location.value;
    const age = event.target.age.value;
    const newObj = JSON.parse(JSON.stringify(jsonData));
    newObj[id] = [name, designation, location, age];
    setJsonData(newObj);
    setModal(!modal);
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
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}>modify</ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={obj.id} />
            <FormGroup>
              <Label for="name">reference</Label>
              <Input type="text" name="name" id="name" defaultValue={obj.name} />
            </FormGroup>
            <FormGroup>
              <Label for="designation">Designation</Label>
              <Input
                type="text"
                name="designation"
                id="designation"
                defaultValue={obj.designation}
              />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input type="text" name="location" id="location" defaultValue={obj.location} />
            </FormGroup>
            <FormGroup>
              <Label for="age">Age</Label>
              <Input type="text" name="age" id="age" defaultValue={obj.age} />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button color="secondary" className="ml-1" onClick={toggle.bind(null)}>
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      <ComponentCard title="LIST OF PRODUCT DESIGN  ">
        <ReactTable
          columns={[
            {
              Header: 'reference',
              accessor: 'name',
            },
            {
              Header: 'Description',
              accessor: 'description',
            },
            {
              Header: 'assigned to',
              accessor: 'company',
            },
            {
              Header: 'status',
              accessor: 'Status',
            },
            {
              Header: 'Actions',
              accessor: 'actions',
              sortable: true,
              filterable: false,
            },
          ]}
          defaultPageSize={10}
          showPaginationBottom
          className="-striped -highlight"
          data={data2}
          filterable
        />
      </ComponentCard>
    </div>
  );
};

export default ListOfProductDesign;


