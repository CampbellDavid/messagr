import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { headers } from './../../lib/headers'

class Contacts extends React.Component {
	state = {
		user: null,
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

	render() {
		console.log(this.state.user)
		if (!this.state.user) return null
		return (
			<section className='mt-5 bg-color font'>
				<h1 className='pt-5 text-center text-light'>Contacts</h1>
				<div>
					{this.state.user.contacts.length === 0 ? (
						<p className='font text-light'>No contacts</p>
					) : (
						this.state.user.contacts.map((contact, i) => (
							<p key={i} className='font text-light'>
								{contact.first_name} {contact.last_name}
							</p>
						))
					)}
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
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
