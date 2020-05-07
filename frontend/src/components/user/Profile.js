import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { headers } from './../../lib/headers'

class Profile extends React.Component {
	state = {
		user: null,
	}

	async componentDidMount() {
		const userId = Auth.getPayload().sub
		console.log('userId =', userId)
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
				<h1 className='pt-5 text-center text-light'>My Account</h1>
			</section>
		)
	}
}

export default Profile
