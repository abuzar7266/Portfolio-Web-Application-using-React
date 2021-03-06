
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import Post from '../../components/jsx/Cards';
import { Card } from "react-bootstrap";
import '../css/home.css';
import '../css/styles.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProject } from "../../redux/ActionCreators";
import { fetchProjects } from "../../redux/ActionCreators";
import AddProject from "../../components/jsx/addProjectComponent";
import { Button,Modal} from 'react-bootstrap';
import {Form,InputGroup,FormControl} from 'react-bootstrap';
import { CloseButton } from 'react-bootstrap';
import { DropdownButton,Dropdown } from "react-bootstrap";
import { responsive } from "../../components/jsx/CardSlider";
import Carousel from "react-multi-carousel";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import NavBar from '../../components/jsx/NavBar';
import { addUser,fetchUser } from '../../redux/ActionCreators';
const mapStateToProps = state => {
    return {
      projects:state.projects,
      user:state.user
    }
}

const mapDispatchToProps = (dispatch) => 
({
    addProject: (Pid,Title, Image, Text , Type , Duration) => dispatch(addProject(Pid,Title, Image, Text , Type , Duration))
    ,fetchProjects: () => { dispatch(fetchProjects())},
    addUser: (_id,firstname,lastname,username)=>dispatch(addUser(_id,firstname,lastname,username))
    ,fetchUser:()=>{dispatch(fetchUser())}
});

class Home extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state={
            HideForm:false,
            dropDown:"Select Type",
            files:[]
        }
    }
    handelDropDown = (e) => {
        this.setState({ dropDown: e })
    }
    handleAddProjectForm() {
            this.setState({ HideForm: !this.state.HideForm })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            Type:this.Type,
            title:this.title,
            Text:this.Text,
            TimeTaken:this.TimeTaken,
            imageFile:this.imageFile,
            files:this.files
        }
        const config = {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.post('/project',config)
        .then((res)=>{
            console.log(res.data);
        });
        this.props.fetchProjects();
    }
    componentWillMount = async () =>
    {
            this.props.fetchProjects();
            this.props.fetchUser();
    }
    componentDidUpdate = async () =>
    {
        setTimeout( ()=>{
            this.props.fetchProjects();
            this.props.fetchUser();
            },10000);
    }
    render()
    {
        var files = this.props.projects.projects
        console.log(files);
        const user = {
        _id:this.props.user.user.data._id,
        username:this.props.user.user.data.username
    };
    return (<>
    <div className="Main-style">
    { !(localStorage.getItem('token')) ? <NavBar reload = {this.componentWillMount} status="login"/>:  <NavBar reload = {this.componentWillMount} status="logout"/>}
    <div className="Main-Outer">
    <div className="container-fluid Main-Inner" style={{padding:"250px 0px 250px 0px"}}>
        <div className="container" >
            <div className="row">
                <div className="col-12 align-self-center">
                <p><h1>Hello, World.</h1>I am <strong> Abuzar </strong><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula elementum nisl vel sollicitudin. Quisque pellentesque odio ac eros efficitur, vitae luctus arcu vulputate. Mauris eleifend finibus odio eu porttitor. In scelerisque congue mattis. Vestibulum varius magna quis felis commodo molestie. Integer tincidunt pharetra efficitur. Curabitur quis orci vehicula, gravida massa sed, porttitor nisi. Aliquam venenatis diam lorem, eget porta ligula ultricies sit amet. Nunc non eros lectus. Phasellus sit amet felis a nulla sollicitudin lacinia non ac lectus. In eleifend neque eget commodo tempus. Maecenas ut urna sollicitudin eros posuere tristique. In hac habitasse platea dictumst. Vestibulum in iaculis ligula. Nulla vel euismod sem.</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    {/*Add Project Modal Form*/}
    <div className="container-fluid" style={{alignContent:"center"}}>
    <Modal className="Form-Modal" show={this.state.HideForm} style={{maxWidth:"380px",textAlign:"center"}}>
                    <Card style={{boxShadow:"5px 5px 10px black",maxWidth:"400px"}}>
                       <Card.Header style={{backgroundColor:"#161C27",height:"45px",color:"white"}}>
                       <div className="row">
                       <div class="col-10">
                                Post a New Project
                       </div>
                       <div class="col-1">
                       <span style={{color:"grey",backgroundColor:"transparent",textDecoration:"none",cursor:"pointer",marginLeft:"15px"}} onClick={() => this.handleAddProjectForm()}><i class="far fa-times-circle"></i></span>
                        </div>
                       </div>
                       </Card.Header>
                       <Card.Body style={{backgroundColor:"#1C2331",color:"white"}}>
                           <Card.Text>
                           <form onSubmit={this.handleSubmit}>
                        <div class="form-group row" style={{marginBottom:"10px"}}>
                            <div class="col-10">
                                <Form.Control type="text" name="title" placeholder="Project Title" />
                            </div>
                            <div class="col-1">
                                <input
                                    type="file"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    name="imageFile"
                                    hidden/>
                                    <label className="custom-file-label btn" style={{border:"1px solid black",color:"white"}} htmlFor="inputGroupFile01">
                                    <i class="fa fa-image" aria-hidden="true"></i>
                                </label>
                            </div>
                        </div>
                        <div class="form-group row" style={{marginBottom:"10px"}}>
                            <div class="col-7">
                                <label class="sr-only" for="exampleInputEmail3">Total Time Taken</label>
                                <Form.Control type="text" name="TimeTaken" placeholder="Total Time Taken" />
                            </div>
                            <div class="col-2">
                            <DropdownButton id="dropdown-basic-button" name="Type" variant="secondary" title={this.state.dropDown} onSelect={this.handelDropDown}>
                            <Dropdown.Item eventKey="Web">Development Project</Dropdown.Item>
                            <Dropdown.Item eventKey="Data">Data-Science Project</Dropdown.Item>
                            <Dropdown.Item eventKey="Ideate">Ideation and Theories</Dropdown.Item>
                            <Dropdown.Item eventKey="Post">Post on Website</Dropdown.Item>
                            </DropdownButton>
                            </div>
                        </div>
                        <div class="form-group row" style={{marginBottom:"10px"}}>
                            <div class="col-8">
                                <input
                                    type="file"
                                    id="attachImages"
                                    aria-describedby="attachImagesAddon01"
                                    name="files"
                                    multiple/>
                            </div>
                        </div>
                        <div class="form-group row" style={{marginBottom:"10px"}}>
                            <div class="col-12">
                                    <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="5"
                                    name="Text"
                                    placeholder="Write something..."
                                    />
                            </div>
                        </div>
                        <div class="form-row">
                            <button type="button" class="btn btn-secondary btn-sm ml-auto" style={{margin:"10px",boxShadow:"1px 1px 10px black"}} onClick={() => {this.handleAddProjectForm();this.handelDropDown("Select Type")}}> Cancel </button>
                            <button type="submit" class="btn btn-primary btn-sm ml-1" style={{margin:"10px",boxShadow:"1px 1px 10px black"}}> Save </button>
                        </div>
                    </form>
                          </Card.Text>
                       </Card.Body>
                   </Card>
    </Modal>
    </div>
    {/*--------------------------------------------------------------*/}
    <div className="container-fluid" style={{backgroundColor:"transparent"}} style={{textAlign:"center",alignItems:"center"}}>
    <div className="row" style={{backgroundImage:"linear-gradient(to right,#0F2027,#203A43,#2C5364)"}}>
            <div className="col-6 align-self-center" style={{fontSize:"50px",paddingTop:"30px",paddingBottom:"30px"}}>
            <Link to="./" onClick={this.componentWillMount}><i style={{fontSize:"30px"}} class="fa fa-refresh" aria-hidden="true"></i></Link>
            </div>
            { (localStorage.getItem('token')) && <div className="col-6" style={{paddingTop:"30px",paddingBottom:"30px"}}>
            { user._id && <Button variant="outline-primary" style={{borderRadius:"20%",padding:"30px",fontSize:"20px",color:"white",boxShadow:"5px 5px 20px black"}} onClick={() => this.handleAddProjectForm()}> <i style={{opacity:"90%"}} class="fas fa-file-upload"></i> Upload Post</Button>}
            </div> }
    </div>
    <div className="row" style={{backgroundColor:"black",color:"white",textAlign:"center"}}>
        <div className="col-auto align-self-center" style={{color:"white",textAlign:"center"}}>
            <h1 style={{marginBottom:"30px",color:"white",textAlign:"center"}}> <i class="fa fa-certificate" aria-hidden="true"></i> Latest Featured Posts </h1>
        </div>
    </div>
    
    <Carousel responsive={responsive}>
        {
            files.map((data,idx)=>
            {
                if((localStorage.getItem('token'))){
                    return(<div className="offset-1">
                    <Post Access="public" CardData={data}/>
                    </div>
                    );
                }
                else{
                    return(<div className="offset-1">
                    <Post Access="private" CardData={data}/>
                    </div>
                    );
                }
            })   
        }
    </Carousel>
    <div className="row" style={{backgroundColor:"black",color:"white",textAlign:"center"}}>
        <div className="col-auto align-self-center" style={{color:"white",textAlign:"center"}}>
            <h1 style={{marginBottom:"30px",color:"white",textAlign:"center"}}> <i class="fa fa-certificate" aria-hidden="true"></i> Web-Development Projects</h1>
        </div>
    </div>
    <Carousel responsive={responsive}>
        {
            files.map((data,idx)=>
            {
                if((localStorage.getItem('token'))){
                    return(<div className="offset-1">
                    <Post Access="public" CardData={data}/>
                    </div>
                    );
                }
                else{
                    return(<div className="offset-1">
                    <Post Access="private" CardData={data}/>
                    </div>
                    );
                }
            })   
        }
    </Carousel>
    <div className="row" style={{backgroundColor:"black",color:"white",textAlign:"center"}}>
        <div className="col-auto align-self-center" style={{color:"white",textAlign:"center"}}>
            <h1 style={{marginBottom:"30px",color:"white",textAlign:"center"}}> <i class="fa fa-certificate" aria-hidden="true"></i> Data Science Projects</h1>
        </div>
    </div>
    <Carousel responsive={responsive}>
        {
            files.map((data,idx)=>
            {
                if((localStorage.getItem('token'))){
                    return(<div className="offset-1">
                    <Post Access="public" CardData={data}/>
                    </div>
                    );
                }
                else{
                    return(<div className="offset-1">
                    <Post Access="private" CardData={data}/>
                    </div>
                    );
                }
            })   
        }
    </Carousel>
    <div className="row" style={{backgroundColor:"black",color:"white",textAlign:"center"}}>
        <div className="col-auto align-self-center" style={{color:"white",textAlign:"center"}}>
            <h1 style={{marginBottom:"30px",color:"white",textAlign:"center"}}> <i class="fa fa-certificate" aria-hidden="true"></i> Ideation Block</h1>
        </div>
    </div>
    <Carousel responsive={responsive}>
        {
            files.map((data,idx)=>
            {
                if((localStorage.getItem('token'))){
                    return(<div className="offset-1">
                    <Post Access="public" CardData={data}/>
                    </div>
                    );
                }
                else{
                    return(<div className="offset-1">
                    <Post Access="private" CardData={data}/>
                    </div>
                    );
                }
            })   
        }
    </Carousel>
    <div className="row" style={{backgroundColor:"grey"}}>
            <br />
    </div>
    </div>
    </div>
    </>);
    }
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));