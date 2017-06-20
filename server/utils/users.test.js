const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Tyler',
			room: 'Not supposed to talk about it'
		}, {
			id: '2',
			name: 'Marla',
			room: 'Cancer support'
		}, {
			id: '3',
			name: 'Bill',
			room: 'Not supposed to talk about it'
		}];
	});

	it('should add new user', () => {
		var users = new Users();

		var user = {
			id: '123',
			name: 'Aditya',
			room: 'Some room'
		};

		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		var userId = '1';
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		var userId = '99';
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		var userId = '1';
		var user = users.getUser(userId);

		expect(user.id).toEqual(userId);
	});

	it('should not find user', () => {
		var userId = '4';
		var user = users.getUser(userId);

		expect(user).toNotExist();
	});

	it('should return names for room - Not supposed to talk about it', () => {
		var userList = users.getUserList('Not supposed to talk about it');

		expect(userList).toEqual(['Tyler', 'Bill']);
	});

	it('should return names for room - Cancer Support', () => {
		var userList = users.getUserList('Cancer support');

		expect(userList).toEqual(['Marla']);
	});
})