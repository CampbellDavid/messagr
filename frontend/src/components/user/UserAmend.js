import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'
import { headers } from './../../lib/headers'

class UserAmend extends React.Component {
	state = {
		user: null,
		data: {},
		errors: null,
	}

	async componentDidMount() {
		const userId = Auth.getPayload().sub
		try {
			const res = await axios.get(`/api/user/${userId}`)
			this.setState({ user: res.data })
			console.log(this.state)
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = (e) => {
		const data = { ...this.state.data, [e.target.name]: e.target.value }
		const user = { ...this.state.user, [e.target.name]: e.target.value }
		const errors = { ...this.state.errors, [e.target.name]: '' }
		this.setState({ user, data, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const userId = Auth.getPayload().sub
		try {
			await axios.put(`/api/user/${userId}`, this.state.data, headers)
			this.props.history.push(`api/user/${userId}`)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		console.log('rendering')
		if (!this.state.user) return null

		return (
			<body className='has-navbar-fixed-top'>
				{Auth.isAuthenticated() && (
					<UserForm
						user={this.state.user}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						errors={this.state.errors}
					/>
				)}
			</body>
		)
	}
}

export default UserAmend
