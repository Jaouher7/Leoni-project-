import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    InputGroup,
    InputGroupText,
    Button,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import useAuth from './auth';

import ComponentCard from '../../components/ComponentCard';


const AddTask = () => {
    useAuth();
    const { id1 } = useParams();
    const [designId, setDesignid] = useState(id1);
    const [username, setusername] = useState('');

    const [priority, setPriority] = useState('');
    const [state, setStatus] = useState('');

    const [errorMsg, setError] = useState(''); // Renamed error to errorMsg

    const onsubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }
        
            const response = await axios.post(
                'http://localhost:8080/api/tasks',
                {
                    designId,
                    username,
                    priority,
                    state,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
        
            if (response.status === 201) {
                setError('Task added successfully');
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (err) { // Renamed error to err
            console.error('Error occurred while making request:', err);
        }
    };
        
    const getDesignById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/designs/show/${designId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          
        });
        console.log("response :",response.data);
        const username1 = response.data.designImportResponsible;
        console.log("username :",response.data.designImportResponsible);
        const state1 = response.data.designMigrationStatus;
        console.log("statue :",response.data.designMigrationStatus);
        setusername(username1);
        setStatus(state1);
        
      } catch (err) { // Renamed error to err
        // Handle the error here
      }
    };

    useEffect(() => {
      getDesignById();
    }, []);

    return (
        <div>
            <Col md="12">
                <ComponentCard title="Add new task">
                    <Form onSubmit={onsubmit}>
                        <FormGroup>
                            <Label>
                                N° <span className="help">Design Id</span>
                            </Label>
                            <Input
                                type="text"
                                name="designId"
                                defaultValue=""
                                value={designId}
                                onChange={(e) => setDesignid(e.target.value)}
                            disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="example-email">
                                User Name <span className="help"></span>
                            </Label>
                            <Input
                                type="text"
                                id="userId"
                                name="userid"
                                value={username}
                                placeholder=""
                                onChange={(e) => setusername(e.target.value)}
                            disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Priority</Label>
                            <InputGroup>
                                <InputGroupText>
                                    <i className="bi bi-person"></i>
                                </InputGroupText>
                                <Input
                                    type="select"
                                    name="priority"
                                    id="priority"
                                    onChange={(e) => setPriority(e.target.value)}
                                required>
                                    <option value="">Priority </option>
                                    <option value="High Priority">High Priority</option>
                                    <option value="Medium Priority">Medium Priority</option>
                                    <option value="Low Priority">Low Priority</option>
                                </Input>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label>State</Label>
                            <InputGroupText>
                                <Input
                                    type="text"
                                    name="state"
                                    value={state}
                                    
                                    id="state"
                                    onChange={(e) => setStatus(e.target.value)}
                               disabled >   
                                  
                                </Input>
                            </InputGroupText>
                        </FormGroup>
                        <FormGroup>
                            <div className="button-group">
                                <Button className="btn" color="success" type="submit">
                                    Add Task
                                </Button>
                                {errorMsg && <div className="text-danger">{errorMsg}</div>}
                            </div>
                        </FormGroup>
                    </Form>
                </ComponentCard>
            </Col>
        </div>
    );
};

export default AddTask;