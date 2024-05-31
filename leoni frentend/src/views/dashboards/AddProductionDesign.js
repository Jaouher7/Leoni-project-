import {React,useState,useEffect} from 'react';
import axios from 'axios';
import { Col,Form,FormGroup,Label,Input,Button, InputGroup,InputGroupText} from 'reactstrap';
import useAuth from './auth';

import ComponentCard from '../../components/ComponentCard';





const AddProductionDesign = () => {
  useAuth();
  const [id] = useState(null);
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
  const [geteCNsWorkpackageRecieved, setGeteCNsWorkpackageRecieved] = useState('');
  const [processingTvmCompletedStatus, setProcessingTvmCompletedStatus] = useState('');
  const [getsBomUploadStatus, setGetsBomUploadStatus] = useState('');
  const [checkedBy, setCheckedBy] = useState('');
  const [designMigrationStatus, setDesignMigrationStatus] = useState('');
  const [comments, setComments] = useState('');
  const [plant, setPlant] = useState('');
  const [account, setAccount] = useState('');
  const [message, setmessage] = useState('');
  const [startdate, setStartDate] = useState('');
  const [usersWithUserRole, setUsersWithUserRole] = useState([]);

const handleSubmit = async (e) => {
 
  e.preventDefault();
  const requestData = {
    id,
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
    startdate,
    drcCompletedStatus,
    leadLengthUpdate,
    geteCNsWorkpackageRecieved,
    processingTvmCompletedStatus,
    getsBomUploadStatus,
    checkedBy,
    designMigrationStatus,
    comments,
    plant,
    account
  };
    
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:8080/api/designs/insert',requestData,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        
      },
    });
  
    if(response.status === 201) {
      setmessage('production design added successfully');
      
      setProjectName('');
      setDescription('');
      setUsedSystemBeforeMigration('');
      setDesignNbr('');
      setCountOfLeads('');
      setTargetDesignTimeAssigned('');
      setPlannedStartDate('');
      setDesignImportResponsible('');
      setComponentLoadedToLpDb('');
      setProductDesignCompleted('');
      setDesignIndex('');
      setDrcCompletedStatus('');
      setLeadLengthUpdate('');
      setGeteCNsWorkpackageRecieved('');
      setProcessingTvmCompletedStatus('');
      setGetsBomUploadStatus('');
      setCheckedBy('');
      setDesignMigrationStatus('');
      setComments('');
      setPlant('');
      setAccount('');
      setStartDate('');
      const id1 = response.data.id; 
      window.location.href = `/Task/AddTask/${id1}`;
      
      
    }
    
  } catch (Error) {
    
    console.error(Error);
    // Handle the error
  }
};


const getUsersWithUserRole = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/auth/users');
    const users = response.data;
    const filteredUsers = users.filter(user => 
      user.roles.includes('user') || user.roles.includes('moderator')
    ); // Renommez la variable ici
    setUsersWithUserRole(filteredUsers);
    console.log("Users with 'user' role:", filteredUsers); // Utilisez la variable renommée ici
    
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
}

useEffect(() => {
  getUsersWithUserRole();
}, []);





return (
  <div>
    <Col md="12">
      
      <ComponentCard title="Add Production Design">
        
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
      <Label for="designImportResponsible">Design Import Responsible</Label>
      <Input
        type="select"
        defaultValue=""
        id="designImportResponsible"
        name="designImportResponsible"
        value={designImportResponsible}
        onChange={(e) => setDesignImportResponsible(e.target.value)}
      >
        <option value="">Select Design Import Responsible</option>
        {usersWithUserRole.map(user => (
          <option key={user.id} value={user.username}>{user.username} - {user.roles}</option>
        ))}
      </Input>
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
                  value={startdate}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setStartDate(e.target.value)}}}
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
                  <option value=""></option>
                  <option value="Ok">OK</option>
                  <option value="NOK">NOK</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                <Label>Gete CNs Workpackage Recieved</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="geteCNsWorkpackageRecieved"
                  name="geteCNsWorkpackageRecieved"
                  value={geteCNsWorkpackageRecieved}
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
                <option value=""></option>
                <option value="Ok">OK</option>
                  <option value="NOK">NOK</option>
                  </Input>
                  </InputGroup>
              </FormGroup>

              <FormGroup>
                <Label>Gets Bom Upload Status</Label>
              <InputGroup>
                <InputGroupText>
                  <i>OK/NOK</i>
                </InputGroupText>
               
                <Input
                  type="select"
                  
                  id="getsBomUploadStatus"
                  name="getsBomUploadStatus"
                  value={getsBomUploadStatus}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'user'){setGetsBomUploadStatus(e.target.value)}}}
                >
                <option value=""></option>
                <option value="Ok">OK</option>
                  <option value="NOK">NOK</option>
                  </Input>
                  </InputGroup>
              </FormGroup>

              <FormGroup>
                <Label>Checked By</Label>
                <Input
                  type="text"
                  defaultValue=""
                  id="checkedBy"
                  name="checkedBy"
                 value={checkedBy}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'moderator'){setCheckedBy(e.target.value)}}}
                />
              </FormGroup>
              <FormGroup>
                <Label>Design Migration Status</Label>
                <Input
                  type="select"
                  
                  id="designMigrationStatus"
                  name="designMigrationStatus"
                  value={designMigrationStatus}
                  onChange={(e) => {if ((sessionStorage.getItem('roles')) === 'moderator'||(sessionStorage.getItem('roles')) === 'admin'){setDesignMigrationStatus(e.target.value)}}}
                required>
                  <option value=""></option>
                  <option value="Backlog">Backlog</option>
                 
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
            {message && <div className="text-danger">{message}</div>}

              <Button className="btn" color="success" type="submit">
                Add
              </Button>
              
            </div>
          </ComponentCard>
        </Form>
        
      </ComponentCard>
    </Col>
  </div>
);
};
export default  AddProductionDesign;

