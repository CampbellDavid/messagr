import React from 'react'
import { withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav } from 'react-bootstrap'

class NavBar extends React.Component {
	state = {
		loggedIn: false,
		navOpen: false,
	}

	toggleNavbar = () => {
		this.setState({
			loggedIn: !this.state.loggedIn,
			navOpen: !this.state.navOpen,
		})
	}

	handleLogout = () => {
		Auth.logout()
		this.props.history.push('/')
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.setState({ loggedIn: false })
		}
	}

	render() {
		const userId = Auth.getPayload().sub

		return (
			<Navbar
				bg='light'
				expand='lg'
				className='navbar-light fixed-top font'
				id='mainNav'
			>
				<Nav className='mr-auto'>
					<Nav.Link className='nav-link nav-link-format text-dark' href='/'>
						<FontAwesomeIcon icon={faHome} />
					</Nav.Link>
				</Nav>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						{Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href={`/users/${userId}/contacts`}
							>
								Contacts
							</Nav.Link>
						)}
						{Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href='/messages'
							>
								Messages
							</Nav.Link>
						)}
						{!Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href='/login'
							>
								Login
							</Nav.Link>
						)}
						{!Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href='/register'
							>
								Register
							</Nav.Link>
						)}
						{Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href={`/users/${userId}`}
							>
								My account
							</Nav.Link>
						)}

						{Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href='/'
								onClick={this.handleLogout}
							>
								Logout
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default withRouter(NavBar)
