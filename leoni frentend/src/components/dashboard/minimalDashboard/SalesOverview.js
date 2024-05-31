import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import "./horloge.css";

const SalesOverview = () => {
  const [tasks, setTasks] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      // Filter tasks with status "Completed"
      const completedTasks = tasks.filter(task => task.state === 'Completed');

      // Count tasks per user for completed tasks
      const taskCountByUser = completedTasks.reduce((acc, { username }) => {
        acc[username] = (acc[username] || 0) + 1;
        return acc;
      }, {});

      const taskCountArray = Object.entries(taskCountByUser);
      const sortedTaskCountArray = taskCountArray.sort((a, b) => b[1] - a[1]);
      const topFiveUsers = sortedTaskCountArray.slice(0, 5).map(([username, taskCount], index) => ({
        id: index + 1,
        username,
        taskCount
      }));

      setTopUsers(topFiveUsers);
    }
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <CardTitle tag="h4">Top 5 Designer</CardTitle>
          </div>
        </div>
      </CardBody>
      <CardBody className="bg-light d-flex align-items-center justify-content-between">
        <div>
        <h2 className="date-time">{currentDateTime}</h2>
          <br />
          <h5 className="fw-light mb-0 text-muted">Report for this Yearly</h5>
        </div>
        <div className="mt-4 mt-md-0"></div>
      </CardBody>
      <div className="table-responsive">
        <Table className="text-nowrap align-middle mb-0" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Designer</th>
              <th>N° of design</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map(({ id, username, taskCount }) => (
              <tr key={id} className="border-top">
                <td>
                  <h6 className="mb-0">{id}</h6>
                </td>
                <td>
                  <h6 className="mb-0">{username}</h6>
                </td>
                <td>{taskCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default SalesOverview;
