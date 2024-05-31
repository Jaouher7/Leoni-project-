import React from 'react';
import {
  
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody
} from 'reactstrap';
import Maintenance from './Maintenance.png';

const Maintanance = () => {
  return (
    <div style={{ backgroundImage: `url(${Maintenance})`, backgroundSize:'cover', backgroundRepeat: 'no-repeat', backgroundPosition: '', height: '100vh', width: '100vw' }}>
      <div className="loginBox">
        <Container fluid className="h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col lg="12" className="loginContainer">
              <Card>
                <CardBody className="p-4 m-1 text-center">
                  <div className="mt-3 mb-2">
                    <i className="bi bi-exclamation-triangle-fill text-warning display-5"></i>
                  </div>
                  <CardTitle tag="h4">Your page is under maintenance</CardTitle>
                  <h5 className="mb-0 text-muted font-medium">Something wrong is going on with this page.</h5>
                  <h5 className="text-muted font-medium mb-4">Please check back again later.</h5>
                  <div className="d-flex align-items-center justify-content-center gap-2"></div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
    </div>
  );
};

export default Maintanance;
