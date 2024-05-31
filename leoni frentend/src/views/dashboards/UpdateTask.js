import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assurez-vous que vous avez la bonne importation pour useParams
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

const UpdateTask = () => {
    useAuth();
    const { id } = useParams();
    const [designId, setDesignid] = useState('');
    const [username, setusername] = useState('');
    const [priority, setPriority] = useState('');
    const [state, setStatus] = useState('');
    const [error, setError] = useState('');

    const onsubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/api/tasks/${id}`,
                {
                    designId,
                    username,
                    priority,
                    state,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                setError('Task Updated successfully');
            }
        } catch (err) {
            setError('Error adding task');
        }
    };


    const getTaskbyid = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          
        });
        console.log("response :",response.data);
        const username1 = response.data.username;
        const priority1 = response.data.priority;
        const state1 = response.data.state;
        const iddesign = response.data.designId;
        setusername(username1);
        setStatus(state1);
        setPriority(priority1);
        setDesignid(iddesign);
        
      } catch (err) {
        // Handle the error here
      }
    };
    useEffect(() => {
        getTaskbyid();
    }, []);




    return (
        <div>
            <Col md="12">
                <ComponentCard title="Update task">
                    
                    <Form onSubmit={onsubmit}>
                        <FormGroup><Label>
                         <span className="help">Task : {id}</span>
                         
                            </Label></FormGroup>
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
                                    Update Task
                                </Button>
                                {error && <div className="text-danger">{error}</div>}
                            </div>
                        </FormGroup>
                    </Form>
                </ComponentCard>
            </Col>
        </div>
    );
};

export default UpdateTask;
