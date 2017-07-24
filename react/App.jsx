import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col  } from 'reactstrap';
import axios from 'axios';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaRepeat from 'react-icons/lib/fa/repeat';
import FaDownload from 'react-icons/lib/fa/download';

class App extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.id);
	}
   	render() {
      	return (
         	<div>
            	<Header id={this.props.id}/>
            	<Content/>
         	</div>
      	);
   	}
}

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.reset = this.reset.bind(this);
		this.state = {
			isOpen: false
		};
	}
	
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	reset(){
		axios.get('/reset')
		.then(function(data){
			console.log(data);
		});
	}
	
	update(){
		axios.get('/update')
		.then(function(data){
			console.log(data);
		});
	}

   	render() {

		return (
			<div>
				<Navbar toggleable>
					<NavbarToggler right onClick={this.toggle} />
					<NavbarBrand href="/">Setup Potus Mood</NavbarBrand>
					<NavbarBrand href="/">ID: {this.props.id}</NavbarBrand>
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="javascript:void(0);" onClick={this.update} title="Actualizar Lampara">
									<FaDownload/>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="javascript:void(0);" onClick={this.reset} title="Resetear Lampara">
									<FaRefresh/>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="http://mdsdigital.com">
									MDS Digital
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="http://potusmood.com">
									PotusMood
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
   }
}

class Content extends React.Component {
   render() {
      return (
        <Container>
            <h1>Setup</h1>
            <Row>
				<Col xs="3"></Col>
				<Col xs="6" sm="4">
					<FormStyle/>
				</Col>
				<Col xs="3"></Col>
        	</Row>
        </Container>
      );
   }
}

class FormStyle extends React.Component {
	constructor(props) {
		super(props);
		this.changeSSID = this.changeSSID.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.sendForm = this.sendForm.bind(this);
		this.getSSID = this.getSSID.bind(this);

		this.state = {
			ssids: [],
			ssid: '',
			pw: '',
			ssidsLoad: []
		};
	}

	getSSID(){

		axios.get('/ssid')
		.then(res => {
			const ssids = res.data.map((obj) => obj);
			this.setState({ ssids: ssids });
			this.setState({ ssidsLoad : this.state.ssids.map((ssid) => <option value={ssid}>{ssid}</option>) });
		});
	}
	
	componentDidMount() {
    	this.getSSID();
  	}

	render() {
		

		return (
			<Form onSubmit={this.sendForm}>
				<FormGroup>
					<Label for="SSID">Wireless Name</Label>
					<Row>
						<Col xs="10">
				     		<Input type="select" name="SSID" id="SSID" value={this.state.ssid} onChange={this.changeSSID}>
								<option value=""></option>
				     			{this.state.ssidsLoad}
				     		</Input>
				     	</Col>
				     	<Col xs="2">
				     		<Button color="secondary" onClick={this.getSSID} title="reload redes">
				     			<FaRepeat/>
				     		</Button>
				     	</Col>
			     	</Row>
		     	</FormGroup>
		     	<FormGroup>
          			<Label for="password">Password</Label>
		     		<Input type="password" name="password" id="password" placeholder="password" onChange={this.changePassword} value={this.state.pw} />
        		</FormGroup>
        		<Button type="submit">Update and Reset</Button>
			</Form>
		);
	}

	sendForm(event){
		event.preventDefault();

		axios({
			method: 'post',
			url: '/ssid',
			data: {
				ssid: this.state.ssid,
				pw: this.state.pw
			},
			responseType: 'json'
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	changeSSID(event){
		this.setState({ ssid: event.target.value });
	}

	changePassword(event){
		this.setState({ pw: event.target.value });
	}
}

export default App;