import React from 'react'
import './stylesheets/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// auth dir
import Login from './components/auth/Login'
import Register from './components/auth/Register'

// common dir
import ErrorPage from './components/common/ErrorPage'
import Home from './components/common/Home'
import NavBar from './components/common/NavBar'
import SecureRoute from './components/common/SecureRoute'

// media_messages dir
import MessageIndex from './components/media_messages/MessageIndex'

// user dir
import Contacts from './components/user/Contacts'
import Profile from './components/user/Profile'
import UserAmend from './components/user/UserAmend'

function App() {
	return (
		<main className='has-navbar-fixed-top'>
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path='/' component={Home} />

					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />

					<SecureRoute path='/messages' component={MessageIndex} />

					<SecureRoute path='/users/:id/contacts' component={Contacts} />
					<SecureRoute path='/users/:id/amend' component={UserAmend} />
					<SecureRoute path='/users/:id' component={Profile} />

					<Route path='/*' component={ErrorPage} />
				</Switch>
			</BrowserRouter>
		</main>
	)
}

export default App
