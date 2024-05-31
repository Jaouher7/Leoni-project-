import {React,useState ,useEffect} from 'react';
import axios from 'axios';


import { Col,Form,FormGroup,Label,Input,Button,InputGroup,InputGroupText} from 'reactstrap';
import { useParams } from 'react-router-dom';
import useAuth from './auth';
import ComponentCard from '../../components/ComponentCard';

 const UpdateProductionDesign = () => {
    useAuth();
    const {id} = useParams();
    console.log('id design:', id);
    sessionStorage.setItem('iddesign', id);
    const [projectName, setProjectName] = useState('');
    const [designDescription, setDescription] = useState('');
    const [usedSystemBeforeMigration, setUsedSystemBeforeMigration] = useState('');
    const [designNbr, setDesignNbr] = useState('');
    const [countOfLeads, setCountOfLeads] = useState('');
    const [targetDesignTimeAssigned, setTargetDesignTimeAssigned] = useState('');
    const [plannedStartDate, setPlannedStartDate] = useState('');
    const [designImportResponsible, setDesignImportResponsible] = useState('');
    const [componentLoadedToLpDb, setComponentLoadedToLpDb] = useState('');
    const [productDesignCompleted, setProductDesignCompleted] = useState('');
    const [designIndex, setDesignIndex] = useState('');
    const [drcCompletedStatus, setDrcCompletedStatus] = useState('');
    const [leadLengthUpdate, setLeadLengthUpdate] = useState('');
    const [eCNsWorkpackageRecieved, setGeteCNsWorkpackageRecieved] = useState('');
    const [processingTvmCompletedStatus, setProcessingTvmCompletedStatus] = useState('');
    const [sBomUploadStatus, setGetsBomUploadStatus] = useState('');
    const [checkedBy, setCheckedBy] = useState('');
    const [designMigrationStatus, setDesignMigrationStatus] = useState('');
    const [comments, setComments] = useState('');
    const [plant, setPlant] = useState('');
    const [account, setAccount] = useState('');
    const [startDate, setStartdate] = useState('');
    const [message, setmessage] = useState('');
    const [tasks, setTasks] = useState([]);
    const [id1, setIdTask] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    console.log('id task apres set:', id1);
    const [isDisabled, setdisabled] = useState(false);
  // axios get tasks

  const options = [
    { value: "", label: "" },
    
  ];
  if ((sessionStorage.getItem('roles')=== 'user')||((sessionStorage.getItem('roles')=== 'moderator')&&(sessionStorage.getItem('username')=== designImportResponsible))) {
    options.push({ value: "Backlog", label: "Backlog" });
    options.push({ value: "On hold", label: "On hold" });
    options.push({ value: "In progress", label: "In progress" });
    options.push({ value: "Waiting validation", label: "Waiting validation" });
  }
  if ((sessionStorage.getItem('roles')=== 'moderator')&&(sessionStorage.getItem('username')!== designImportResponsible)){
    
    options.push({ value: "On hold", label: "On hold" });
    
    options.push({ value: "Waiting validation", label: "Waiting validation" });
    options.push({ value: "Completed", label: "Completed" });
  }
  if (sessionStorage.getItem('roles')=== 'admin') {
    options.push({ value: "Backlog", label: "Backlog" });
    options.push({ value: "On hold", label: "On hold" });
    options.push({ value: "In progress", label: "In progress" });
    options.push({ value: "Waiting validation", label: "Waiting validation" });
    options.push({ value: "Completed", label: "Completed" });
  }

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        
        }
      });

      setTasks(response.data);
      console.log('tasks:', response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
   
  useEffect(() => {
    const id2=sessionStorage.getItem('iddesign');
    console.log('id design apre get session:', id2);

    const id2Number = id2 !== null ? Number(id2) : null;
    const filteredTasks = id2Number !== null ? tasks.filter(task => task.designId === id2Number) : tasks;    
    console.log('filteredTasks:', filteredTasks);
    if (filteredTasks.length > 0) {
      setIdTask(filteredTasks[0].id);
      setTaskPriority(filteredTasks[0].priority);
      console.log('filteredTasks:', filteredTasks[0]);
      console.log('id task apres filtrage:', filteredTasks[0].id); // Corrected to use filteredTasks[0].id instead of id1
    }
  }, [tasks, id]);
  
  
  //function update task
  const updateTask = async () => {
    
    try {
      await axios.put(`http://localhost:8080/api/tasks/${id1}`, {
        username: designImportResponsible,
        designId: id,
        priority: taskPriority,
        state: designMigrationStatus
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json',
          
        }
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  




    useEffect(() => {
    const fetchData = async () => {
        try {
          fetchTasks();
            const response = await axios.get(`http://localhost:8080/api/designs/show/${id}`, { headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                'Access-Control-Allow-Origin': '*',
                'Accept': '*/*',
            },
            }
        );
            const data = await response.data;
            setProjectName(data.projectName);
            setDescription(data.designDescription);
            setUsedSystemBeforeMigration(data.usedSystemBeforeMigration);
            setDesignNbr(data.designNbr);
            setCountOfLeads(data.countOfLeads);
            setTargetDesignTimeAssigned(data.targetDesignTimeAssigned);
            setPlannedStartDate(data.plannedStartDate);
            setDesignImportResponsible(data.designImportResponsible);
            setComponentLoadedToLpDb(data.componentLoadedToLpDb);
            setProductDesignCompleted(data.productDesignCompleted);
            setDesignIndex(data.designIndex);
            setDrcCompletedStatus(data.drcCompletedStatus);
            setLeadLengthUpdate(data.leadLengthUpdate);
            setGeteCNsWorkpackageRecieved(data.eCNsWorkpackageRecieved);
            setProcessingTvmCompletedStatus(data.processingTvmCompletedStatus);
            setGetsBomUploadStatus(data.sBomUploadStatus);
            setCheckedBy(data.checkedBy);
            setDesignMigrationStatus(data.designMigrationStatus);
            setComments(data.comments);
            setPlant(data.plant);
            setAccount(data.account);
            setStartdate(data.startDate);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
        fetchData();


}, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  try {
   
    const response = await axios.put(`http://localhost:8080/api/designs/update/${id}`,{
    
        projectName,
        designDescription,
        usedSystemBeforeMigration,
        designNbr,
        countOfLeads,
        targetDesignTimeAssigned,
        plannedStartDate,
        designImportResponsible,
        componentLoadedToLpDb,
        productDesignCompleted,
        designIndex,
        startDate,
        drcCompletedStatus,
        leadLengthUpdate,
        eCNsWorkpackageRecieved,
        processingTvmCompletedStatus,
        sBomUploadStatus,
        checkedBy,
        designMigrationStatus,
        comments,
        plant,
        account
      }, { headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
        
        },
        }
    );

    if(response.status === 200) {
      setmessage('production design added successfully');
      updateTask();
      
      setmessage('updated successfully');
      
    }
    
  } catch (Error) {
    
    console.error(Error);
    // Handle the error
  }
 };




 return (
  <div>
    <Col md="12">
      <ComponentCard title="Update Production Design">
        
      <Form onSubmit={handleSubmit}>
        <FormGroup>
                <Label>Plant</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="plant"
                  name="plant"
                  value={plant}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){
                     setPlant(e.target.value);}
                     }
                     }
                     />
              </FormGroup>
              <FormGroup>
                <Label>Account</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="account"
                  name="account"
                  value={account}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){ setAccount(e.target.value)}}}
                />
              </FormGroup>
        <FormGroup>
            <Label>projectName</Label>
            <Input 
              type="text"
              rows="5"
              id="projectName"
              value={projectName}
              onChange={(e) => {
                if ((sessionStorage.getItem('roles')) === 'admin') {setProjectName(e.target.value);}}}
            />
          </FormGroup>
          <FormGroup>
            <Label>Design Description</Label>
            <Input
              type="text"
              rows="5"
              id="designDescription"
              value={designDescription}
              onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){ setDescription(e.target.value)}}}
            />
          </FormGroup>
          <FormGroup>
            <Label>usedSystemBeforeMigration</Label>
            <Input
              type="text"
              rows="5"
              id="usedSystemBeforeMigration"
              value={usedSystemBeforeMigration}
              onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){ setUsedSystemBeforeMigration(e.target.value)}}}
            />
          </FormGroup>
        <FormGroup>
                <Label>Design Nbr</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="designNbr"
                  name="designNbr"
                  value={designNbr}
                  onChange={(e) =>{ if ((sessionStorage.getItem('roles')) === 'admin'){setDesignNbr(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
                <Label>Count Of Leads</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="countOfLeads"
                  name="countOfLeads"
                  value={countOfLeads}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){setCountOfLeads(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
                <Label>Target Design Time Assigned [H]</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="targetDesignTimeAssigned"
                  name="targetDesignTimeAssigned"
                  value={targetDesignTimeAssigned}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){setTargetDesignTimeAssigned(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
                <Label>Planned Start Date</Label>
                <Input
                  type="date"
                  name="plannedStartDate"
                  value={plannedStartDate}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){setPlannedStartDate(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
                <Label>Design Import Responsible</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="designImportResponsible"
                  name="designImportResponsible"
                  value={designImportResponsible}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){setDesignImportResponsible(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
             
                <Label>Component Loaded To LpDb</Label>
                <InputGroup>
                <InputGroupText>
                  <i>YES/NO</i>
                </InputGroupText>
                <Input
                  type="select"
                  defaultValue=""
                  id="componentLoadedToLpDb"
                  name="componentLoadedToLpDb"
                  value={componentLoadedToLpDb}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){setComponentLoadedToLpDb(e.target.value)}}}
                >
                  <option value=""></option>
                <option value="YES" >YES</option>
                <option value="NO">NO</option>
                </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label>Product Design Completed</Label>
                <Input
                  type="date"
                  name="productDesignCompleted"
                  value={productDesignCompleted}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'admin'){setProductDesignCompleted(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
                <Label>Design Index</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="designIndex"
                  name="designIndex"
                  value={designIndex}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setDesignIndex(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startdate"
                  value={startDate}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setStartdate(e.target.value)}}}
                />
              </FormGroup>
              
              <FormGroup>
              <Label>DRC Completed Status</Label>
              <InputGroup>
                <InputGroupText>
                  <i>OK/NOK</i>
                </InputGroupText>
                <Input type="select"
                  defaultValue=""
                  id="drcCompletedStatus"
                  name="drcCompletedStatus"
                  value={drcCompletedStatus}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setDrcCompletedStatus(e.target.value)}}}>
                  <option value=""></option>
                  <option value="OK">OK</option>
                  <option value="NOK">NOK</option>
        
                </Input>
              </InputGroup>
            </FormGroup>
              <FormGroup>
                <Label>Lead Length Update</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="leadLengthUpdate"
                  name="leadLengthUpdate"
                  value={leadLengthUpdate}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setLeadLengthUpdate(e.target.value)}}}
                >
                  <option value="ok">OK</option>
                  <option value="NOK">NOK</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                <Label>Gete CNs Workpackage Recieved</Label>
                <Input
                  type="text"
                  
                  id="eCNsWorkpackageRecieved"
                  name="eCNsWorkpackageRecieved"
                  value={eCNsWorkpackageRecieved}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setGeteCNsWorkpackageRecieved(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
                <Label>Processing Tvm Completed Status</Label>
                <InputGroup>
                <InputGroupText>
                  <i>OK/NOK</i>
                </InputGroupText>
                <Input
                  type="select"
                  defaultValue=""
                  id="processingTvmCompletedStatus"
                  name="processingTvmCompletedStatus"
                  value={processingTvmCompletedStatus}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setProcessingTvmCompletedStatus(e.target.value)}}}
                >
                <option value="ok">OK</option>
                  <option value="NOK">NOK</option>
                  </Input>
                  </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label>sBom Upload Status</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="sBomUploadStatus"
                  name="sBomUploadStatus"
                  value={sBomUploadStatus}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setGetsBomUploadStatus(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
    <Label>Checked By</Label>
    <Input
        type="text"
        defaultValue=""
        id="checkedBy"
        name="checkedBy"
        value={checkedBy}
        onChange={() => {
            if (((sessionStorage.getItem('roles') === 'moderator')||(sessionStorage.getItem('roles') === 'admin'))&&((sessionStorage.getItem('username') !== designImportResponsible))){
                setCheckedBy(sessionStorage.getItem('username'));
                console.log('checkedBy: khedmt lcas eli 7echty biha')
            } else {
                setCheckedBy(checkedBy);
                setdisabled(true);
                console.log('khedmt lcas eli m7chtich biha ')
            }
        }}
    disabled={isDisabled}/>
  </FormGroup>
              <FormGroup>
                <Label>Design Migration Status</Label>
                <Input
                  type="select"
                  defaultValue=""
                  id="designMigrationStatus"
                  name="designMigrationStatus"
                  value={designMigrationStatus}
                  onChange={(e) => {setDesignMigrationStatus(e.target.value)}}
                >
                      {options.map((option) => (<option  value={option.value}>{option.label}</option>))}

                  </Input>
              </FormGroup>
              <FormGroup>
                <Label>Comments</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="comments"
                  name="comments"
                  value={comments}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setComments(e.target.value)}}}
                />
              </FormGroup>
             
            
      
          
          <ComponentCard title="">
            <div className="button-group">
           

              <Button className="btn" color="success" type="submit">
              Update Production Design
              </Button>
              
            </div>
            {message && <div className="text-danger">{message}</div>}
          </ComponentCard>
        </Form>
        
      </ComponentCard>
    </Col>
  </div>
);
}


export default UpdateProductionDesign  ;

