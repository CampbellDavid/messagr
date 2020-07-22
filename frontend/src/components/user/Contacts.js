import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { headers } from './../../lib/headers'

class Contacts extends React.Component {
	state = {
		user: null,
		contact_email: {},
		errors: null,
	}

	async componentDidMount() {
		const userId = Auth.getPayload().sub
		try {
			const res = await axios.get(`/api/users/${userId}`)
			console.log(res.data)
			this.setState({ user: res.data })
			console.log(this.state.data)
		} catch (err) {
			console.log(err)
		}
	}

	handleChange = (e) => {
		const contact_email = {
			...this.state.contact_email,
			[e.target.name]: e.target.value,
		}
		const user = { ...this.state.user, [e.target.name]: e.target.value }
		const errors = { ...this.state.errors, [e.target.name]: '' }
		this.setState({ user, contact_email, errors })
	}

	addContact = async (e) => {
		e.preventDefault()
		console.log(this.state.contact_email)
		const userId = Auth.getPayload().sub
		try {
			await axios.post(`api/users/${userId}`, this.state.contact_email, headers)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		console.log(this.state.user)
		console.log(this.state.contact_email)
		if (!this.state.user) return null
		return (
			<section className='mt-5 bg-color font'>
				<h1 className='pt-5 text-center text-light'>Contacts</h1>
				<div>
					{this.state.user.contact_email.length === 0 ? (
						<p className='font text-light'>No contacts</p>
					) : (
						this.state.user.contact_email.map((contact, i) => (
							<p key={i} className='font text-light'>
								{contact.first_name} {contact.last_name}
							</p>
						))
					)}
				</div>
				<div>
					<form onSubmit={this.addContact}>
						<input
							className='form-field p-2 m-2 font rounded'
							onChange={this.handleChange}
							placeholder='Email'
							name='email'
							id='email'
							required
						/>
						<button className='font btn btn-light'>Add contact</button>
					</form>
				</div>
			</section>
		)
	}
}

export default Contacts
