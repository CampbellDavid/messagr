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
						<h2 className='font'>No contacts</h2>
					) : (
						this.state.user.contacts.map((contact, i) => (
							<h2 key={i} className='font'>
								{contact.first_name}
							</h2>
						))
					)}
				</div>
			</section>
		)
	}
}

export default Contacts
