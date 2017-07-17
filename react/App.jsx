import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col  } from 'reactstrap';
import axios from 'axios';

class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

   	render() {
      return (
		<div>
			<Navbar color="faded" light toggleable>
				<NavbarToggler right onClick={this.toggle} />
				<NavbarBrand href="/">Setup Potus Mood</NavbarBrand>
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="http://mdsdigital.com">MDS Digital</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="http://potusmood.com">PotusMood</NavLink>
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
            <h1>Formulario</h1>
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

		this.state = {
			ssids: [],
			ssid: '',
			pw: ''
		};
	}

	getSSID(){

		axios.get('/ssid')
		.then(res => {
			const ssids = res.data.map((obj) => obj);
			this.setState({ ssids: ssids });
		});
	}
	
	componentDidMount() {
    	this.getSSID();
  	}

	render() {
		let ssids = this.state.ssids.map((ssid) => <option value={ssid}>{ssid}</option>);

		return (
			<Form onSubmit={this.sendForm}>
				<FormGroup>
					<Label for="SSID">Nombre de la Red</Label>
		     		<Input type="select" name="SSID" id="SSID" value={this.state.ssid} onChange={this.changeSSID}>
						<option value=""></option>
		     			{ssids}
		     		</Input>
		     	</FormGroup>
		     	<FormGroup>
          			<Label for="password">Password</Label>
		     		<Input type="password" name="password" id="password" placeholder="password" onChange={this.changePassword} value={this.state.pw} />
        		</FormGroup>
        		<Button type="submit">Actualizar y resetear</Button>
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