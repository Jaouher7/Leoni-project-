import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Input, Row, Col, Card, CardBody, Button } from 'reactstrap';

const TaskListing = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const username = sessionStorage.getItem("username");
  const userRoles = sessionStorage.getItem("roles");

  const filteredTasks = userRoles === 'user'
    ? tasks.filter(task => task.username === username)
    : tasks;

    const searchFilteredTasks = filteredTasks.filter(task =>
      String(task.designId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

  const countTask = () => searchFilteredTasks.length;
  const countTaskTerminated = () => searchFilteredTasks.filter(task => task.state === 'Completed').length;
  const countTaskPending = () => searchFilteredTasks.filter(task =>
    ['Waiting validation', 'On hold', 'Backlog'].includes(task.state)
  ).length;
  const countTaskInProgress = () => searchFilteredTasks.filter(task => task.state === 'In progress').length;

  const deleteTask = async (id) => {
    //eslint-disable-next-line
    const userConfirmed = window.confirm(`Are you sure you want to delete this task ${id} `);
  
    if (!userConfirmed) {
      return; 
    }
  
    try {
      const response = await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 204) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  return (
    <Row>
      <Col lg="3">
        <Card color="primary" className="text-white text-center cursor-pointer">
          <CardBody>
            <h2>{countTask()}</h2>
            <h5>TOTAL TASK</h5>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3">
        <Card color="warning" className="text-white text-center cursor-pointer">
          <CardBody>
            <h2>{countTaskPending()}</h2>
            <h5>Pending task</h5>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3">
        <Card color="success" className="text-white text-center cursor-pointer">
          <CardBody>
            <h2>{countTaskInProgress()}</h2>
            <h5>In Progress task</h5>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3">
        <Card color="danger" className="text-white text-center cursor-pointer">
          <CardBody>
            <h2>{countTaskTerminated()}</h2>
            <h5>Completed task</h5>
          </CardBody>
        </Card>
      </Col>

      <div className="col-lg-3 mb-4">
        <Input
          type="text"
          placeholder="Search by ID Design or Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {sessionStorage.getItem('roles') === 'admin' && (
        <div className="col-lg-3 mb-4">
          <Link to="/Task/AddTask2" className="btn btn-primary">Add new task</Link>
        </div>
      )}
      <Table className="align-middle">
        <thead>
          <tr>
            <th>N° Task</th>
            <th>ID Design</th>
            <th>ID User</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchFilteredTasks
            .sort((a, b) => {
              // Prioritize tasks
              if (a.state === 'Completed' && b.state !== 'Completed') return 1;
              if (a.state !== 'Completed' && b.state === 'Completed') return -1;
              if (a.priority === 'High Priority' && b.priority !== 'High Priority') return -1;
              if (a.priority !== 'High Priority' && b.priority === 'High Priority') return 1;
              return 0;
            })
            .map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.designId}</td>
                <td>{task.username}</td>
                <td>{task.priority}</td>
                <td>{task.state}</td>
                <td>
                  {(sessionStorage.getItem('roles') === 'user' && task.state !=="Completed") && (
                    <Button
                      className="btn btn-primary"
                      type="button"
                      color="orange"
                      onClick={() => { window.location.href = `/ProductionDesign/Update/${task.designId}` }}
                    >
                      Take Design
                    </Button>
                  )}  {(sessionStorage.getItem('roles') === 'moderator' && task.state !=="Completed" && sessionStorage.getItem('username') === task.username) && (
                    <Button
                      className="btn btn-primary"
                      type="button"
                      color="orange"
                      onClick={() => { window.location.href = `/ProductionDesign/Update/${task.designId}` }}
                    >
                      Take Design
                    </Button>
                  )}
                  {(sessionStorage.getItem('roles') === 'moderator' && task.state !=="Completed" && sessionStorage.getItem('username') !== task.username)&& (
                    <Button
                      className="btn btn-primary"
                      type="button"
                      color="success"
                      onClick={() => { window.location.href = `/ProductionDesign/Update/${task.designId}` }}
                    >
                      Check Design
                    </Button>
                  )}
                  {sessionStorage.getItem('roles') === 'admin' && (
                    <>
                      <Button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => { deleteTask(task.id) }}
                      >
                        Delete Task
                      </Button>
                      <Button
                        className="btn btn-warning"
                        type="button"
                        onClick={() => { window.location.href = `/Task/UpdateTask/${task.id}` }}
                      >
                        Update Task
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Row>
  );
};

export default TaskListing;
