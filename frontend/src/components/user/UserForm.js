import React from 'react'

const UserForm = ({ user, handleChange, handleSubmit }) => {
	return (
		<section className='form main-body'>
			<h1 className='main-heading'>User Settings</h1>

			<form onSubmit={handleSubmit}>
				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						placeholder='Email'
						name='email'
						id='email'
						value={user.email}
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						placeholder='First Name'
						name='first_name'
						id='first_name'
						value={user.first_name}
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						placeholder='Last Name'
						name='last_name'
						id='last_name'
						value={user.last_name}
					/>
				</div>

				<div className='main-form-group'>
					<textarea
						className='main-user-form-field'
						rows='5'
						cols='30'
						onChange={handleChange}
						placeholder='Bio'
						name='bio'
						id='bio'
						value={user.bio}
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						placeholder='Sex'
						name='sex'
						id='sex'
						value={user.sex}
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						placeholder='Profile Image'
						name='profile_image'
						id='profile_image'
						value={user.profile_image}
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						type='password'
						placeholder='New Password'
						name='password'
						id='password'
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						type='password'
						placeholder='Confirm New Password'
						name='password_confirmation'
						id='password_confirmation'
					/>
				</div>

				<div className='button-div'>
					<hr className='divider' />
					<button className='button is-rounded' type='submit'>
						Submit
					</button>
					<hr className='divider-small' />
				</div>
			</form>
		</section>
	)
}

export default UserForm
