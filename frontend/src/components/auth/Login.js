import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Login extends React.Component {
	state = {
		data: {
			email: '',
			password: '',
		},
		error: '',
	}

	handleChange = ({ target: { name, value } }) => {
		const data = { ...this.state.data, [name]: value }
		this.setState({ data, error: '' })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post('/api/login', this.state.data)
			Auth.setToken(res.data.token)
			this.props.history.push('/messages')
		} catch (error) {
			this.setState({ error: 'Incorrect Credentials' })
		}
	}

	render() {
		return (
			<section className='bg-color mt-5'>
				<div className='pt-5'>
					<h1 className='font text-center text-light'>Login</h1>
				</div>
				<div className='d-flex justify-content-center'>
					<form onSubmit={this.handleSubmit}>
						<div>
							<input
								className='form-field p-2 m-2 font rounded'
								placeholder='email'
								name='email'
								id='email'
								onChange={this.handleChange}
								required
							/>
						</div>
						<div>
							<input
								className='form-field p-2 m-2 font rounded'
								type='password'
								placeholder='password'
								name='password'
								id='password'
								onChange={this.handleChange}
								required
							/>
						</div>

						<div className='text-center'>
							<button className='m-2 font btn btn-light' type='submit'>
								Login
							</button>
						</div>

						<div>
							<p className='font text-light text-center'>{this.state.error}</p>
						</div>
					</form>
				</div>
			</section>
		)
	}
}

export default Login
