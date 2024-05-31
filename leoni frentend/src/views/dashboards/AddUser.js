import React, { useState } from 'react';
import axios from 'axios';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import useAuth from './auth';

import ComponentCard from '../../components/ComponentCard';

const AddUser = () => {
  useAuth();  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
 //const [image, setImage] = useState(null); // Ajout de l'état pour l'image
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword ) { 
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      //formData.append('image',image);
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setError('User added successfully');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
         //setImage(null); // Réinitialise l'état de l'image après l'envoi
      }
      console.log(response.status.data);
    } catch (err) {
      console.error(err);
      setError('Failed to add user. Please try again later.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Col md="6">
        <ComponentCard title="Add new user">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Username</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-person"></i>
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-envelope"></i>
                </InputGroupText>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>Roles</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-person"></i>
                </InputGroupText>
                <Input type="select" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="0">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="user">User</option>
                </Input>
              </InputGroup>
            </FormGroup>
            {/* <FormGroup>
              <Label>Photo</Label>
               <Input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])} 
              /> 
  </FormGroup> */}
            <FormGroup> 
              <Label>Password</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-lock"></i>
                </InputGroupText>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-lock"></i>
                </InputGroupText>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            {error && <div className="text-danger">{error}</div>}
            <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
              <Button type="submit" className="btn btn-success mr-2">
                Add user
              </Button>
              <Button type="reset" className="btn btn-dark">
                Cancel
              </Button>
            </div>
          </Form>
        </ComponentCard>
      </Col>
    </div>
  );
};

export default AddUser;
