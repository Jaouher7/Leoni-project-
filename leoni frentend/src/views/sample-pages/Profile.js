import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import useAuth from '../dashboards/auth';
import user4 from './user4.jpg';

const Profile = () => {
  useAuth();
  const [activeTab, setActiveTab] = useState('1');
  const [image1, setImage] = useState('');
  const [res, setRes] = useState();
  const [imageData, setImageData] = useState('');
  const [jsonData, setJsonData] = useState([]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setJsonData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const username = sessionStorage.getItem('username');
  const filteredData = jsonData.filter(task => task.username === username);
  
  const countDesignTerminated = () => {
    let sum = 0;
    for (let i = 0; i < filteredData.length; i++) {
      if (filteredData[i].state === 'Completed') {
        sum += 1;
      }
    }
    return sum;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDataById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/users/${id}`);
      console.log(response.data);
      const base64Image = response.data.imageData;
      setImageData(base64Image);
      console.log(base64Image);
    } catch (error) {
      console.log('0');
    }
  };

  useEffect(() => {
    getDataById(sessionStorage.getItem('id'));
  }, []);

  const handleResponse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image1);
    try {
      const id = sessionStorage.getItem('id');
      console.log(`"votre image ici"${image1}`);
      const response = await axios.post(`http://localhost:8080/api/auth/update/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setRes("Image updated successfully");
        getDataById(id);
      } else {
        setRes("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Row>
        <Col xs="12" md="12" lg="4">
          <Card>
            <CardBody className="p-4">
              <div className="text-center mt-4">
                {imageData ? (
                  <img
                    src={`data:image/jpeg;base64,${imageData}`}
                    alt="user"
                    className="img-fluid rounded-circle"
                    width="150"
                  />
                ) : (
                  <img
                    src={user4}
                    alt="user"
                    className="img-fluid rounded-circle"
                    width="150"
                  />
                )}
                <CardTitle tag="h4" className="mt-2 mb-0">
                  {sessionStorage.getItem('username')}
                </CardTitle>
                <CardSubtitle className="text-muted">{sessionStorage.getItem('roles')} Account</CardSubtitle>
                <Row className="text-center justify-content-md-center mt-3"></Row>
              </div>
            </CardBody>
            <CardBody className="border-top p-4">
              <div>
                <CardSubtitle className="text-muted fs-5">Email address</CardSubtitle>
                <CardTitle tag="h4">{sessionStorage.getItem('email')}</CardTitle>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="12" lg="8">
          <Card>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === '1' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '2' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Setting
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div className="p-4">
                      <Row>
                        <Col md="3" xs="6" className="border-end">
                          <strong>User Name</strong>
                          <br />
                          <p className="text-muted">{sessionStorage.getItem('username')}</p>
                        </Col>
                        <Col md="3" xs="6" className="border-end">
                          <strong>Email</strong>
                          <br />
                          <p className="text-muted">{sessionStorage.getItem('email')}</p>
                        </Col>
                        <Col md="3" xs="6" className="border-end">
                          <strong>Role</strong>
                          <br />
                          <p className="text-muted">{sessionStorage.getItem('roles')}</p>
                        </Col>
                      </Row>
                      <h4 className="font-medium mt-4">Design advancement</h4>
                      <hr />
                      <h5 className="mt-4">
                        N ° Design <span className="float-end">{countDesignTerminated()}</span>
                      </h5>
                      <Progress value={countDesignTerminated()} />
                     
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <div className="p-4">
                      <Form onSubmit={handleResponse}>
                        <FormGroup>
                          <Label>User Name</Label>
                          <Input type="text" value={sessionStorage.getItem('username')} disabled />
                        </FormGroup>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input type="email" value={sessionStorage.getItem('email')} disabled />
                        </FormGroup>
                        <FormGroup>
                          <Label>Role</Label>
                          <Input type="role" value={sessionStorage.getItem('roles')} disabled />
                        </FormGroup>
                        <FormGroup>
                          <Label>Photo</Label>
                          <Input
                            type="file"
                            name="imageData"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Password</Label>
                          <Input type="password" placeholder="Password" disabled />
                        </FormGroup>
                        <div className="text-danger">{res}</div>
                        <Button color="primary" type="submit">
                          Update Profile
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Profile.propTypes = {
  original: PropTypes.shape({
    imageData: PropTypes.string,
  }),
};

export default Profile;
