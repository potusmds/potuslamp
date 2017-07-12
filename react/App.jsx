import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col  } from 'reactstrap';

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
	render() {
		return (
			<Form>
				<FormGroup>
					<Label for="SSID">Nombre de la Red</Label>
		     		<Input type="text" name="SSID" id="SSID" />
		     	</FormGroup>
		     	<FormGroup>
          			<Label for="password">Password</Label>
		     		<Input type="password" name="password" id="password" placeholder="password" />
        		</FormGroup>
        		<Button>Actualizar y resetear</Button>
			</Form>
		);
	}
}

export default App;