import {React,useState} from 'react';
import axios from 'axios';
import { Row,Col,Form,FormGroup,Label,Input,FormText,Button} from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';



const AddDataCleansing = () => {
const [reference, setReference] = useState('');
const [description, setDescription] = useState('');
const [company, setCompany] = useState('');
const [donnee, setDonnee] = useState('');
const [status, setStatus] = useState(true);
const [date, setDate] = useState('');
const [file, setFile] = useState('');
const [remark, setRemark] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/api/data-cleansing', {
      reference,
      description,
      company,
      donnee,
      status,
      date,
      file,
      remark
    });
    console.log(response.data);
    // Do something with the response
  } catch (error) {
    console.error(error);
    // Handle the error
  }
};

return (
  <div>
    <Col md="12">
      <ComponentCard title="Add data cleansing">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              Reference <span className="help"> </span>
            </Label>
            <Input
              type="text"
              placeholder="VE654VDFV454D8FV..."
              id="referance"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              rows="5"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="example-email">
              Company <span className="help"> e.g. &quot;Audi&quot;</span>
            </Label>
            <Input
              type="text"
              id="company"
              name="company"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>donnée</Label>
            <Input
              type=""
              defaultValue=""
              id="donnee"
              name="donnee"
              value={donnee}
              onChange={(e) => setDonnee(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="backdrop">Status</Label>
            <Input
              type="select"
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="true">validé</option>
              <option value="false">non validé</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col md="4">
                <FormGroup check>
                  <Input type="checkbox" id="check1" />
                  <Label check>Check this custom checkbox</Label>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" id="check2" />
                  <Label check>Check this custom checkbox</Label>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" id="check3" />
                  <Label check>Check this custom checkbox</Label>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <FormGroup check>
                    <Input type="radio" name="radio1" />
                    <Label check>Toggle this custom radio</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="radio" name="radio1" />
                    <Label check>Toggle this custom radio</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="radio" name="radio1" />
                    <Label check>Toggle this custom radio</Label>
                  </FormGroup>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label>date</Label>
            <Input type="date" name="dateadd" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="exampleFile">File .csv </Label>
            <Input type="file" placeholder="" value={file} onChange={(e) => setFile(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="helptext">Remark</Label>
            <Input
              type="text"
              name="help"
              id="helptext"
              placeholder="Remark Text Here"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
            <FormText color="muted">
              A block of help text that breaks onto a new line and may extend beyond one line.
            </FormText>
          </FormGroup>
          <ComponentCard title="">
            <div className="button-group">
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
export default AddDataCleansing ;

