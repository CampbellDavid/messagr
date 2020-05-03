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
			const res = await axios.get(`/api/user/${userId}`)
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
			<section>
				<div className='title-div'>
					<h1>Profile</h1>
				</div>
				{/* <div className='profile-div'></div> */}
			</section>
		)
	}
}

export default Profile

// condense all pages into single page with multiple elements
