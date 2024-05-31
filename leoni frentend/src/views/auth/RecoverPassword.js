import React from 'react';
import {
  Button,
  Label,
  FormGroup,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import AuthLogo from '../../layouts/logo/AuthLogo';
import logo from './logo.jpg';
import backgroundImage from './challenges-tn-Leoni-Tunisie.jpg';

const RecoverPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    uname: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    uname: Yup.string().required('Username is required'),
  });
  return (
    <div className="loginBox" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <div align="center">
          <img src={logo} alt="Logo" className="logo" align="center"/>
        </div>
        <br></br>
            {/* <AuthLogo/> */}
            <Card>
              <CardBody className="p-4 m-1">
                <div className="text-center">
                  <CardTitle tag="h4" className="mt-2">
                    Recover Password
                  </CardTitle>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    navigate('/');
                  }}
                  render={({ errors, touched }) => (
                    <Form className="mt-3">
                      <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Field
                          name="name"
                          type="text"
                          className={`form-control${
                            errors.uname && touched.uname ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      </FormGroup>
                       <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="info" block className="me-2">
                          Reset
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecoverPassword;