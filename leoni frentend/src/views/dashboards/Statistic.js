import { Row, Col } from 'reactstrap';
import useAuth from './auth';

import ApexCharts from '../charts/DesignStat';
import RevenueCards from '../../components/dashboard/minimalDashboard/RevenueCards';
import SalesOverview from '../../components/dashboard/minimalDashboard/SalesOverview';

const Statistic = () => { 
  useAuth();
  return (
    <>
      
      <Row>
        <Col lg="12">
          <RevenueCards/>
        </Col>
       
       <Col lg="12">
       <SalesOverview/>
        </Col>
        <Col lg="12">
          <ApexCharts/>
        </Col>
       </Row>
      
    </>
  );
};

export default Statistic;
