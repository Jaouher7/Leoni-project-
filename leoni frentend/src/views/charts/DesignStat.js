import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import axios from 'axios';
import ComponentCard from '../../components/ComponentCard';

const Apexcharts = () => {
  const [profilePictures, setProfilePictures] = useState({});
  const [chartData, setChartData] = useState({
    chart1: {
      options: {
        chart: {
          type: 'bar',
          height: 280,
        },
        xaxis: {
          categories: [],
        },
      },
      series: [{
        name: 'Count',
        data: [],
      }],
    },
    chart2: {
      options: {
        chart: {
          type: 'bar',
          height: 280,
        },
        xaxis: {
          categories: [],
          labels: {},
        },
      },
      series: [{
        name: 'Count',
        data: [],
      }],
    },
  });

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/auth/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(({ data }) => {
      setUserList(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/designs/show', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => {
      const counts = {};
      const counts1 = {};
      const tempProfilePictures = {};

      data.forEach(obj => {
        counts[obj.account] = (counts[obj.account] || 0) + 1;
        counts1[obj.designImportResponsible] = (counts1[obj.designImportResponsible] || 0) + 1;

        const user = userList.find(user1 => user1.username.toLowerCase() === obj.designImportResponsible.toLowerCase());
        
        if (user) {
          tempProfilePictures[obj.designImportResponsible] = user.imageData;
        }
      });

      const categories = Object.keys(counts);
      const categories1 = Object.keys(counts1);
      const countData = categories.map(category => counts[category]);
      const countData1 = categories1.map(category1 => counts1[category1]);
      
      // const profilePicturesArray = categories1.map(category1 => {
      //   const user1 = tempProfilePictures[category1];
      //   if (user1 && user1.imageData) {
      //     return user1.imageData;
      //   }
      //   return null; 
      // });
      
      setProfilePictures(tempProfilePictures);

      setChartData(prevChartData => ({
        ...prevChartData,
        chart1: {
          ...prevChartData.chart1,
          options: {
            ...prevChartData.chart1.options,
            xaxis: {
              categories,
            },
          },
          series: [{
            name: 'Designs',
            data: countData,
          }],
        },
        chart2: {
          ...prevChartData.chart2,
          options: {
            ...prevChartData.chart2.options,
            xaxis: {
              categories: categories1,
              labels: {
                formatter: (value) => {
                  // const index = categories1.indexOf(value);
                  const profilePicture1 = profilePictures[value];
                  return profilePicture1 ? `<img src="data:image/jpeg;base64,${profilePicture1}" alt="${value}" style="width:30px; height:30px; border-radius:50%;" /> ${value}` : `<img src="default_profile_image.png" alt="${value}" style="width:30px; height:30px; border-radius:50%;" /> ${value}`;
                }
              },
            },
          },
          series: [{
            name: 'Designs',
            data: countData1,
          }],
        },
      }));
    })
    .catch(error => {
      console.error('Error fetching design data:', error);
    });
  }, [userList]);

  return (
    <div>
      <Row>
        <Col md="12">
          <ComponentCard key="progress-companies" title="Progress of designs according to companies">
            <Chart options={chartData.chart1.options} series={chartData.chart1.series} type="bar" height="280" />
          </ComponentCard>
        </Col>
        <Col md="12">
          <ComponentCard key="progress-designers" title="Progress of designer according to design">
            <Chart options={chartData.chart2.options} series={chartData.chart2.series} type="bar" height="280" />
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
}

export default Apexcharts;
