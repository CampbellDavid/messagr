import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { headers } from '../../lib/headers'

class MessageIndex extends React.Component {
	state = {
		messages: null,
		user: null,
		content: {},
		errors: null,
	}

	async componentDidMount() {
		const userId = Auth.getPayload().sub
		try {
			const res = await axios.get('/api/media_messages/')

			await axios
				.all([
					axios.get('/api/media_messages/'),
					axios.get(`/api/users/${userId}`),
				])
				.then(
					axios.spread((messages, user) => {
						this.setState({
							messages: messages.data,
							user: user.data,
						})
					})
				)
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = (e) => {
		const content = { ...this.state.content, [e.target.name]: e.target.value }
		const user = { ...this.state.user, [e.target.name]: e.target.value }
		const errors = { ...this.state.errors, [e.target.name]: '' }
		this.setState({ user, content, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const userId = Auth.getPayload().sub
		try {
			await axios.post('api/media_messages/', this.state.content, headers)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		const owner = Auth.getPayload().sub
		if (!this.state.messages) return null
		if (!this.state.user) return null
		console.log('user', this.state.user.contacts)

		return (
			<section className='mt-5 bg-color font'>
				<div className='row'>
					<div
						className='p-4 col-4 bg-dark'
						style={{ overflowX: 'hidden', height: '100vh' }}
					>
						<p>
							{this.state.user.contacts.length === 0 ? (
								<p className='text-light'>No contacts</p>
							) : (
								this.state.user.contacts.map((contact) => (
									<p>
										{contact.first_name} {contact.last_name}
									</p>
								))
							)}
						</p>
					</div>
					<div className='p-4 col-8'>
						<div style={{ height: '75%' }}>
							{this.state.messages.owner === owner
								? this.state.messages.map((message, i) => (
										<p className='owner-msg' key={i}>
											{message.content}
										</p>
								  ))
								: this.state.messages.map((message, i) => (
										<p className='recipient-msg' key={i}>
											{message.content}
										</p>
								  ))}
						</div>

						<div style={{ height: '25%' }}>
							<form onSubmit={this.handleSubmit} className='d-flex'>
								<textarea
									className='form-field rounded p-2 mb-2 col-11'
									rows='3'
									style={{ resize: 'none' }}
									onChange={this.handleChange}
									placeholder='Text here...'
									name='content'
									id='content'
									disabled={this.state.user.contacts.length < 1 ? true : false}
								/>
								<div>
									<button
										className='font btn btn-light ml-2'
										style={{ height: '92%' }}
										type='submit'
										disabled={
											this.state.user.contacts.length < 1 ? true : false
										}
									>
										Send
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default MessageIndex
