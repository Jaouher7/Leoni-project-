import React, { useState } from 'react';
import axios from 'axios';
import {  Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';

const EditDataCleansing = () => {
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [donnee] = useState('');
  const [status, setStatus] = useState(true);
  const [date, setDate] = useState('');
  const [file, setFile] = useState('');
  const [remark] = useState('');

 

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`/api/data-cleansing/${reference}`);
//       const data = response.data; // Assuming your API returns data in a certain format
//       setReference(data.reference);
//       setDescription(data.description);
//       setCompany(data.company);
//       setDonnee(data.donnee);
//       setStatus(data.status);
//       setDate(data.date);
//       setFile(data.file);
//       setRemark(data.remark);
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };
//   useEffect(() => {
//     fetchData(); // Fetch data when component mounts
//   }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/data-cleansing/${reference}`, {
        description,
        company,
        donnee,
        status,
        date,
        file,
        remark
      });
      console.log(response.data);
      // Do something with the response
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  return (
    <div>
      <Col md="12">
        <ComponentCard title="Edit data cleansing">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                Reference <span className="help"> </span>
              </Label>
              <select
  style={{
    width: '100%',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#495057',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
  }}
  value={reference}
  onChange={(e) => setReference(e.target.value)}
>
  
  <option value="548FRFR82">548FRFR82</option>
</select>
            </FormGroup>
            <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              rows="5"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="example-email">
              Company <span className="help"> e.g. &quot;Audi&quot;</span>
            </Label>
            <Input
              type="text"
              id="company"
              name="company"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label for="backdrop">Status</Label>
            <Input
              type="select"
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="true">validé</option>
              <option value="false">non validé</option>
            </Input>
          </FormGroup>
          
          <FormGroup>
            <Label>date</Label>
            <Input type="date" name="dateadd" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="exampleFile">File .csv </Label>
            <Input type="file" placeholder="" value={file} onChange={(e) => setFile(e.target.value)} />
          </FormGroup>
        
            <Button className="btn" color="primary" type="submit">
              Update
            </Button>
          </Form>
        </ComponentCard>
      </Col>
    </div>
  );
};

export default EditDataCleansing;
