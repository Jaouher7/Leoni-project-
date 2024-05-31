import { useState } from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import backgroundImage from './challenges-tn-Leoni-Tunisie.jpg';
import './erreur.css';

const LoginFormik = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initialValues = {
    username: '',
    password: '',

  };

  const handleResponse = (response) => {
    if (response.status === 200) {
      const { roles } = response.data;
  
      // Stockage des données dans sessionStorage et localStorage
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('email', response.data.email);
      localStorage.setItem('token', response.data.token);
      sessionStorage.setItem('image', response.data.image);
      sessionStorage.setItem('roles', roles);
      sessionStorage.setItem('id', response.data.id);
  
      // Stockage du token dans un cookie
      Cookies.set('token', response.data.token);
      localStorage.setItem('token', response.data.token);
      // Redirection en fonction du rôle de l'utilisateur
      switch (sessionStorage.getItem('roles')) {
        case 'admin':
          navigate('/dashboards/Statistic_Of_designer');
          break;
        case 'moderator':
        case 'user':
          navigate('/task/list');
          break;
        default:
          

          // Gérer les cas où le rôle n'est ni admin, ni moderator, ni user
          break;
      }
    } else if (response.status === 401) {
      setError('Invalid email or password');
    }
  };
  

  const onSubmit = async (fields) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', fields);
      handleResponse(response);
    } catch (e) {
      if (e.response.data.status === 401) {
        setError('Invalid email or password');
      }
    }
  };
  return (
    <div className="loginBox" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <div align="center">
              <img src={logo} alt="Logo" className="logo" align="center" />
            </div>
            <br></br>
            <Card>
              <CardBody className="p-4 m-1">
                <h5 className="mb-0">Login</h5>
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >

                  {({ errors, touched }) => (
                    <Form>

                      <FormGroup>
                        <Label >username</Label>
                        <br></br>
                        <Field
                          name="username"
                          type="text"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                        required/>
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                        required/>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        
                        <Link className="ms-auto text-decoration-none" to="/auth/recoverpwd">
                          <small></small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Login
                        </Button>
                      </FormGroup>
                      <CSSTransition
        in={!!error}
        timeout={3}
        classNames="error"
        unmountOnExit
      >
                      {error && <div className="text-danger">{error}</div>}
                      </CSSTransition>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormik;
