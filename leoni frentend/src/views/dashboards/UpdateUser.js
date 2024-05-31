import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import useAuth from './auth';
import ComponentCard from '../../components/ComponentCard';

const UpdateUser = () => {
  useAuth();
  const { id } = useParams();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/users/${id}`, {  headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
           'Accept': '*/*',
        }

        });
        const userData = response.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setRole(userData.role[0].name);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) { 
      setError('Passwords do not match');
      return;
    }

    try {
      
      const response = await axios.post(
        `http://localhost:8080/api/auth/update/${id}`,
        {
          username,
          email,
          password,
          roles : [{
            id: parseInt(role.split(',')[0], 10),
            name : role.split(',')[1]
        }],
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')} `,
           
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setError('User Updated successfully');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to Update user. Please try again later.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Col md="6">
        <ComponentCard title="Update user">
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
                <Input
                  type="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option  value="1,admin">Admin</option>
                  <option  value="2,moderator">Moderator</option>
                  <option  value="3,user">User</option>
                </Input>
              </InputGroup>
            </FormGroup>
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
                Update user
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

export default UpdateUser;
