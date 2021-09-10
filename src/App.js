import React from 'react';
import './App.css';

const defaultUsers = [
	{
		id: 1,
		userName: 'Siri',
		email: 'siri@gmail.com',
		phoneNumber: '9988776655',
		city: 'Hyd',
		gender: 'female'
	},
	{
		id: 2,
		userName: 'Ramya',
		email: 'ramya@gmail.com',
		phoneNumber: '9876543210',
		city: 'Pune',
		gender: 'female'
	}
];

const defaultUser = {
	userName: '',
	email: '',
	phoneNumber: '',
	gender: '',
	city: ''
};
export default function App() {
	const [ userList, setUserList ] = React.useState(defaultUsers);
	const [ usersToDisplay, setUsersToDisplay ] = React.useState([ ...defaultUsers ]);
	const [ searchParam, setSearchParam ] = React.useState('');
	const [ userDetailsForForm, setUSerDetailsForForm ] = React.useState({ ...defaultUser, id: 3 });

	const handleOnChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUSerDetailsForForm({ ...userDetailsForForm, [name]: value });
	};
	const handleSubmitClick = (e) => {
		//preventing default actions
		e.preventDefault();
		//validations
		if (!userDetailsForForm.userName) {
			return alert('User name is mandatory!');
		}
		if (!userDetailsForForm.email) {
			return alert('Email is mandatory!');
		}
		if (!userDetailsForForm.phoneNumber) {
			return alert('Phone number is mandatory!');
		}
		if (!userDetailsForForm.city) {
			return alert('City is mandatory!');
		}
		if (!userDetailsForForm.gender) {
			return alert('Gender is mandatory!');
		}
		// updating user list
		const updatedUserList = [ ...userList, userDetailsForForm ];
		// upating two lists
		setUserList(updatedUserList);
		setUsersToDisplay(updatedUserList.filter((user) => user.userName.includes(searchParam)));

		// resetting user form
		// creating new user
		let newUser = {};
		// adding id
		newUser.id = updatedUserList.length + 1;

		newUser.userName = '';

		setUSerDetailsForForm(newUser);
	};

	const handleOnSearch = (e) => {
		// get search parameter
		const searchParam = e.target.value;
		// add it to the state
		setSearchParam(searchParam);
		// checking length of search param
		if (searchParam.length) {
			let filteredData = userList.filter((user) =>
				user.userName.toLowerCase().includes(searchParam.toLowerCase())
			);
			setUsersToDisplay(filteredData);
		} else {
			setUsersToDisplay([ ...userList ]);
		}
	};
	return (
		<div className="container">
			<form className="form-box">
				<h2 className="signup-title">Sign Up</h2>

				<input
					value={userDetailsForForm.userName}
					onChange={handleOnChange}
					name="userName"
					type="text"
					className="input-field form-item"
					placeholder="User name"
				/>
				<input
					value={userDetailsForForm.email}
					onChange={handleOnChange}
					name="email"
					type="email"
					className="input-field form-item"
					placeholder="Email"
				/>
				<input
					value={userDetailsForForm.phoneNumber}
					onChange={handleOnChange}
					name="phoneNumber"
					type="text"
					className="input-field form-item"
					placeholder="Phone"
				/>

				<input
					value={userDetailsForForm.city}
					onChange={handleOnChange}
					name="city"
					type="text"
					className="input-field form-item"
					placeholder="City"
				/>

				<div className="gender form-item">
					<label className="gender-label">
						Gender
						<label>
							<input
								onChange={handleOnChange}
								type="radio"
								name="gender"
								value="male"
								checked={userDetailsForForm.gender === 'male'}
							/>
							Male
						</label>
						<label>
							<input
								onChange={handleOnChange}
								type="radio"
								name="gender"
								value="female"
								checked={userDetailsForForm.gender === 'female'}
							/>
							Female
						</label>
					</label>
				</div>
				<div>
					<button onClick={handleSubmitClick} className="singup-btn form-item">
						SignUp
					</button>
				</div>
			</form>
			<div className="user-list">
				<div className="user-list-header">
					<h2>User List</h2>
					<div>
						<input
							className="input-field user-list-search"
							type="search"
							placeholder="Search..."
							value={searchParam}
							onChange={handleOnSearch}
						/>
					</div>
				</div>
				<div className="table-container">
					{usersToDisplay.length ? (
						<table className="user-table">
							<thead>
								<tr>
									<th>S No</th>
									<th>User name</th>
									<th>Email id</th>
									<th>Phone</th>
									<th>Gender</th>
									<th>City</th>
								</tr>
							</thead>
							<tbody>
								{usersToDisplay.map((user, index) => (
									<tr key={index}>
										<td>{user.id}</td>
										<td>{user.userName}</td>
										<td>{user.email}</td>
										<td>{user.phoneNumber}</td>
										<td>{user.gender}</td>
										<td>{user.city}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<label>No data to display, please add a user to see the data!</label>
					)}
				</div>
			</div>
		</div>
	);
}
