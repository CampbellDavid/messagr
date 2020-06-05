import React from 'react'
import axios from 'axios'

class Register extends React.Component {
	state = {
		data: null,
		emailValid: false,
		formValid: false,
		passwordValid: false,
		formErrors: { email: '', password: '' },
	}

	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		const data = { ...this.state.data, [name]: value }
		this.setState({ data }, () => {
			this.validateField(name, value)
		})
	}

	validateField(fieldName, value) {
		const fieldValidationErrors = this.state.formErrors
		let emailValid = this.state.emailValid
		let passwordValid = this.state.passwordValid

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
				fieldValidationErrors.email = emailValid ? '' : ' is invalid'
				break
			case 'password':
				passwordValid = value.length >= 1
				fieldValidationErrors.password = passwordValid ? '' : ' is too short'
				break
			default:
				break
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				emailValid: emailValid,
				passwordValid: passwordValid,
			},
			this.validateForm
		)
	}

	validateForm() {
		this.setState({
			formValid: this.state.emailValid && this.state.passwordValid,
		})
	}

	errorClass(error) {
		return error.length === 0 ? '' : 'has-error'
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/api/register', this.state.data)
			this.props.history.push('/login')
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<section className='bg-color mt-5'>
				<div className='pt-5'>
					<h1 className='font text-center text-light'>Register</h1>
				</div>
				<div className='d-flex justify-content-center'>
					<form onSubmit={this.handleSubmit}>
						<div>
							<input
								className='form-field p-2 m-2 font rounded'
								onChange={this.handleChange}
								placeholder='username'
								name='username'
								id='username'
								required
							/>
						</div>

						<div>
							<input
								className='form-field p-2 m-2 font rounded'
								onChange={this.handleChange}
								type='email'
								placeholder='email'
								name='email'
								id='email'
								required
							/>
						</div>

						<div>
							<input
								className='form-field p-2 m-2 font rounded'
								onChange={this.handleChange}
								placeholder='First Name'
								name='first_name'
								id='first_name'
								required
							/>
						</div>

						<div>
							<input
								className='form-field p-2 m-2 font rounded'
								onChange={this.handleChange}
								placeholder='Last Name'
								name='last_name'
								id='last_name'
								required
							/>
						</div>

						<div>
							<input
								className='form-field p-2 m-2 font rounded'
								onChange={this.handleChange}
								type='password'
								placeholder='password'
								name='password'
								id='password'
								required
							/>
						</div>

						<div>
							<input
								className='form-field p-2 m-2 font rounded'
								onChange={this.handleChange}
								type='password'
								placeholder='confirm password'
								name='password_confirmation'
								id='password_confirmation'
								required
							/>
						</div>

						<div className='text-center'>
							<button
								className='m-2 font btn btn-light'
								type='submit'
								disabled={!this.state.formValid}
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</section>
		)
	}
}

export default Register

//TODO: Import form errors file
