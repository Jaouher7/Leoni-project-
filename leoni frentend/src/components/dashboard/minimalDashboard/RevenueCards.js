import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
import * as Icon from 'react-feather';
import { useEffect,useState } from 'react';
import axios from 'axios';




const RevenueCards = () => {

  
  //////nbr employer//////

  const [data, setJsonData] = useState([]);
  const [data1, setJsonData1] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/users');
      setJsonData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const countDataLines = () => {
    return data.length;
  };
  //////////////////////////////////

  

  const fetchData1 = async () => {
    try {
       const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:8080/api/designs/show', {  headers: {
        'Authorization': `Bearer ${token}`,
      },}
        
      );
      setJsonData1(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(document.cookie('token'));
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData1();
  }, []);
  const countDataLines1 = () => {
    return data1.length;
  };
  const countProjectTerminated = () => {
    let sum = 0; // Create a local variable to hold the count
    for (let i = 0; i < data1.length; i++) {
      if (data1[i].designMigrationStatus === 'Completed') {
        sum += 1; // Increment the count
      }
    }
     // Update the sum state using the setter function
    return sum; // Return the count
  };
  const countNewProject = () => {
    let sum1 = 0; // Créer une variable locale pour stocker le décompte
    const currentDate = new Date(); // Obtenez la date actuelle une fois pour toutes les comparaisons
    for (let i = 0; i < data1.length; i++) {
        if (new Date(data1[i].plannedStartDate) > currentDate) { // Convertir plannedStartDate en objet Date
            sum1 += 1; 
        }
    }
    return sum1; // Retourner le nombre de nouveaux projets
};

     
  
  
  const revenues = [
    {
      id: 1,
      icon: Icon.Users,
      title: 'Designers',
      earn: countDataLines(),
      color: 'primary',
    },
    {
      id: 2,
      icon: Icon.Edit,
      title: 'New Projects',
      earn: countNewProject(),
      color: 'cyan',
    },
    {
      id: 3,
      icon: Icon.FileText,
      title: 'Project terminated',
      earn: countProjectTerminated(),
      color: 'purple',
    },
    {
      id: 4,
      icon: Icon.ShoppingBag,
      title: 'All Projects',
      earn: countDataLines1(),
      color: 'warning',
    },
  ];
  return (
    <Card>
      <Row>
        {revenues.map((item) => (
          <Col lg="3" md="6" className="border-end" key={item.id}>
            <CardBody>
              <div className="d-flex align-items-center">
                <div>
                  <item.icon className="text-dark" />
                  <p className="mb-3 mt-2 font-weight-bold fs-6 text-muted">
                    {item.title}
                  </p>
                </div>

                <div className="ms-auto">
                  <h2 className={`text-${item.color}`}>{item.earn}</h2>
                </div>
              </div>

              <Progress value={item.earn} color={item.color} />
            </CardBody>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RevenueCards;
