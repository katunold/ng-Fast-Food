export const error_response = {
	error: {
		message: 'Please check your network connection'
	}
};

export const success_response = {
	message: 'Order updated successfully'
};

export const registrationData = {
	user_name: 'arnold',
	email: 'arnold@mail.com',
	contact: '0706180670',
	user_type: 'client',
	password: '1qaz2wsx',
};

export const loginData = {
	user_name: 'arnold',
	password: '1qaz2wsx',
};

export const authResponse = {
	auth_token: 'tdfjyettdkueiyrqlhdwjuya4egyuhjdveghafd52',
	logged_in_as: 'client',
	message: 'Successfully logged in',
	status: 'Success',
};

export const currentUser = {
	auth_token: 'tdfjyettdkueiyrqlhdwjuya4egyuhjdveghafd52',
	logged_in_as: 'admin',
	message: 'Successfully logged in',
	status: 'Success'
};

export const menuData = {
	data: [
		{item_id: 7, item_name: 'plain chips', item_status: 'available', price: 2500},
		{item_id: 9, item_name: 'roasted pork', item_status: 'available', price: 4500},
		{item_id: 10, item_name: 'chicken wings', item_status: 'available', price: 15000},
		{item_id: 13, item_name: 'plain chappati', item_status: 'available', price: 500},
		{item_id: 14, item_name: 'chappati and beans', item_status: 'available', price: 1500},
		{item_id: 15, item_name: 'chappati and beef', item_status: 'available', price: 3000},
		{item_id: 17, item_name: 'red wine', item_status: 'available', price: 30000},
		{item_id: 18, item_name: 'chicken pizza large', item_status: 'available', price: 35000},
		{item_id: 19, item_name: 'roasted sausages', item_status: 'available', price: 1500},
		{item_id: 20, item_name: 'pair of drum sticks', item_status: 'available', price: 8000},
		{item_id: 22, item_name: 'roasted beef', item_status: 'available', price: 8000},
		{item_id: 24, item_name: 'katogo special', item_status: 'available', price: 2500},
	],
	status: 'success'
};

export const ordersData = {
	data: [
		{
			client: 'Arnold',
			client_contact: '0706180670',
			client_email: 'arnold.katum@andela.com',
			order_cost: 30000,
			order_date: 'Fri, 31 May 2019 16:47:01 GMT',
			order_id: 40,
			order_item: 'red wine',
			order_status: 'New',
			special_notes: '2 bottles please',
			user_id: 79
		},
		{
			client: 'Arnold',
			client_contact: '0706180670',
			client_email: 'arnold.katum@andela.com',
			order_cost: 3000,
			order_date: 'Sun, 24 Mar 2019 10:55:44 GMT',
			order_id: 21,
			order_item: 'chappati and beef',
			order_status: 'Cancelled',
			special_notes: 'No special notes attached',
			user_id: 79
		},
		{
			client: 'Kisitu',
			client_contact: '0706251684',
			client_email: 'kisitu@gmail.com',
			order_cost: 4500,
			order_date: 'Fri, 26 Oct 2018 16:09:32 GMT',
			order_id: 15,
			order_item: 'roasted pork',
			order_status: 'Completed',
			special_notes: 'Get me 3 sticks please',
			user_id: 27
		}
	],
	status: 'success'
};

export const ordersHistory = {
	data: [
		{
			client: 'Ochola',
			client_contact: '0706180673',
			client_email: 'ochola@gmail.com',
			order_cost: 15000,
			order_date: 'Thu, 23 May 2019 20:28:25 GMT',
			order_id: 37,
			order_item: 'chicken wings',
			order_status: 'Processing',
			special_notes: 'No special notes attached',
			user_id: 87
		},
		{
			client: 'Ochola',
			client_contact: '0706180673',
			client_email: 'ochola@gmail.com',
			order_cost: 4500,
			order_date: 'Fri, 24 May 2019 11:08:09 GMT',
			order_id: 38,
			order_item: 'roasted pork',
			order_status: 'Completed',
			special_notes: 'No special notes attached',
			user_id: 87
		},
		{
			client: 'Ochola',
			client_contact: '0706180673',
			client_email: 'ochola@gmail.com',
			order_cost: 4500,
			order_date: 'Thu, 23 May 2019 09:24:12 GMT',
			order_id: 32,
			order_item: 'roasted pork',
			order_status: 'New',
			special_notes: 'Kindly ensure that it is dry',
			user_id: 87
		},
		{
			client: 'Ochola',
			client_contact: '0706180673',
			client_email: 'ochola@gmail.com',
			order_cost: 2500,
			order_date: 'Thu, 23 May 2019 09:15:02 GMT',
			order_id: 31,
			order_item: 'plain chips',
			order_status: 'New',
			special_notes: 'Kindly add enough kachumbaali',
			user_id: 87
		}
	],
	status: 'success'
};

export const emptyMenuData = {
	data: [],
	status: 'success'
};

export const emptyOrdersData = {
	data: [],
	status: 'success'
};


