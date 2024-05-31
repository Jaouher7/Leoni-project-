import React, { useEffect, useState, useRef } from 'react';
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

const AddTask2 = () => {
    useAuth();
    const [designId, setDesignid] = useState(''); 
    const [username, setUsername] = useState('');
    const [priority, setPriority] = useState('');
    const [state, setStatus] = useState('');
    const [erreur, setErreur] = useState('');
    const [userlist, setUserlist] = useState([]);
    const [designtest, setDesigntest] = useState([]);

    const designIdRef = useRef(null);

    const onsubmit = async (e) => {
        e.preventDefault();
        
        // Convertissez la valeur de designId en entier
        const enteredDesignId = parseInt(designId, 10);
    
        console.log("entreddesign", enteredDesignId);
        console.log("designid", designId);
        const isDesignExists = designtest.some(design => design.id === enteredDesignId);
        console.log("isDesignExists", isDesignExists);
        if (!isDesignExists) {
            setErreur('Design ID does not exist');
            return;
        }
    
        try {
            const response = await axios.post(
                'http://localhost:8080/api/tasks',
                {
                    designId: enteredDesignId, // Assurez-vous d'envoyer l'ID de conception converti
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
            if (response.status === 201) {
                setErreur('Task added successfully');
            }
           
        } catch (err) {
            setErreur('Task already exists');
            console.log(err)
        }
    };
    
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const filteredList = response.data.filter(user => user.roles.includes('user') || user.roles.includes('moderator'));
            setUserlist(filteredList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getDesign = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/designs/show`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setDesigntest(response.data);
            console.log('response :', response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDesign();
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
                                ref={designIdRef}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="example-email">
                                User Name <span className="help"></span>
                            </Label>
                            <Input
                                type="select"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            >
                                <option value="">Select User</option>
                                {userlist.map((user) => (
                                    <option key={user.id} value={user.username}>{user.username}</option>
                                ))}
                            </Input>
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
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    required
                                >
                                    <option value="">Priority</option>
                                    <option value="High Priority">High Priority</option>
                                    <option value="Medium Priority">Medium Priority</option>
                                    <option value="Low Priority">Low Priority</option>
                                </Input>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label>State</Label>
                            <Input
                                type="select"
                                name="state"
                                value={state}
                                id="state"
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="">Select State</option>
                                <option value="Backlog">Backlog</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <div className="button-group">
                                <Button className="btn" color="success" type="submit">
                                    Add Task
                                </Button>
                                {erreur && <div className="text-danger">{erreur}</div>}
                            </div>
                        </FormGroup>
                    </Form>
                </ComponentCard>
            </Col>
        </div>
    );
};

export default AddTask2;
