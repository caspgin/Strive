import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import * as taskController from '../../routes/v1/tasks/taskController.mjs';
import { client } from '../../db.mjs';

describe('task controller v1 api test3', () => {
	let req, res;

	beforeEach(() => {
		req = {
			body: {},
			params: {},
		};

		res = {
			status: sinon.stub().returnsThis(),
			end: sinon.stub(),
			json: sinon.stub(),
		};
	});

	afterEach(() => {
		sinon.restore();
	});
	describe('create Tasks', () => {
		it('should create a task and return 201', async () => {
			const fakeTask = { rows: [{ id: 1, name: 'test3 task' }] };
			req.body = { title: 'test3 Task' };
			sinon.stub(client, 'query').resolves(fakeTask);

			await taskController.create(req, res);

			expect(client.query.calledOnce).to.be.true;
			expect(client.query.firstCall.args[0]).to.equal(
				'INSERT INTO tasks (name) VALUES ($1) RETURNING *',
			);
			expect(client.query.firstCall.args[1]).to.deep.equal([
				'test3 Task',
			]);
			expect(res.status.calledWith(201)).to.be.true;
			expect(res.json.calledWith(fakeTask.rows[0])).to.be.true;
		});

		it('should return 500 status code and a message', async () => {
			req.body = { title: 'test3 Task' };
			sinon.stub(client, 'query').rejects(new Error('DB error'));

			await taskController.create(req, res);
			expect(res.status.calledWith(500)).to.be.true;
			expect(res.json.calledWith({ err: 'something went wrong' })).to.be
				.true;
		});
	});

	describe('Get Tasks by ID', () => {
		it('should return a task and code 200', async () => {
			const fakeTask = {
				rows: [{ id: 1, name: 'New task' }],
				rowCount: 1,
			};
			req.params = { id: 1 };
			sinon.stub(client, 'query').resolves(fakeTask);

			await taskController.getById(req, res);

			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith(fakeTask.rows[0])).to.be.true;
		});

		it('should return 400 status code and a message', async () => {
			req.params = { id: 1 };
			sinon.stub(client, 'query').resolves({ rows: [], rowCount: 0 });

			await taskController.getById(req, res);

			expect(res.status.calledWith(400)).to.be.true;
			expect(res.json.calledWith({ error: 'Not a valid id' })).to.be.true;
		});

		it('should return 500 status code and a message', async () => {
			req.body = { title: 'New Task' };
			sinon.stub(client, 'query').rejects(new Error('DB error'));

			await taskController.getById(req, res);

			expect(res.status.calledWith(500)).to.be.true;
			expect(res.json.calledWith({ err: 'something went wrong' })).to.be
				.true;
		});
	});

	describe('Get All Tasks ', () => {
		it('should return all tasks and code 200', async () => {
			const fakeTask = {
				rows: [
					{ id: 1, name: 'New task' },
					{ id: 2, name: 'test' },
				],
			};
			sinon.stub(client, 'query').resolves(fakeTask);

			await taskController.getAll(req, res);

			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith(fakeTask.rows)).to.be.true;
		});

		it('should return 500 status code and a message', async () => {
			sinon.stub(client, 'query').rejects(new Error('DB error'));

			await taskController.getAll(req, res);

			expect(res.status.calledWith(500)).to.be.true;
			expect(res.json.calledWith({ err: 'something went wrong' })).to.be
				.true;
		});
	});

	describe('Remove Task by id ', () => {
		it('should delete task and return code 204', async () => {
			req.params = { id: 1 };
			const fakeTask = { rowCount: 1, rows: [{ id: 1, title: 'test' }] };
			sinon.stub(client, 'query').resolves(fakeTask);

			await taskController.remove(req, res);

			expect(res.status.calledWith(204)).to.be.true;
			expect(res.json.calledWith({ deleted: fakeTask.rowCount })).to.be
				.true;
		});

		it('should return 400 and message for no id provided', async () => {
			req.params = {};

			await taskController.remove(req, res);

			expect(res.status.calledWith(400)).to.be.true;
			expect(res.json.calledWith({ err: 'invalid id or type.' })).to.be
				.true;
		});

		it('should return 400 and message invalid id type', async () => {
			req.params = { id: 'test' };

			await taskController.remove(req, res);

			expect(res.status.calledWith(400)).to.be.true;
			expect(res.json.calledWith({ err: 'invalid id or type.' })).to.be
				.true;
		});

		it('should return 400 and message for no id provided', async () => {
			req.params = { id: 5 };
			const fakeTask = { rowCount: 0 };
			sinon.stub(client, 'query').resolves(fakeTask);

			await taskController.remove(req, res);

			expect(res.status.calledWith(204)).to.be.true;
			expect(res.json.calledWith({ deleted: fakeTask.rowCount })).to.be
				.true;
		});
	});

	describe('Edit Task by id ', () => {
		it('should edit task and return code 204', async () => {
			req.params = { id: 1 };
			req.body = { title: 'Update test' };
			const fakeTask = {
				rowCount: 1,
				rows: [{ id: 1, title: 'Update test' }],
			};
			sinon.stub(client, 'query').resolves(fakeTask);

			await taskController.editbyId(req, res);

			expect(res.status.calledWith(204)).to.be.true;
			expect(res.json.calledWith(fakeTask.rows)).to.be.true;
		});

		it('should return 400 and message for no id provided', async () => {
			req.params = {};

			await taskController.editbyId(req, res);

			expect(res.status.calledWith(400)).to.be.true;
			expect(res.json.calledWith({ err: 'invalid id or invalid task.' }))
				.to.be.true;
		});

		it('should return 400 and message invalid task', async () => {
			req.params = { id: 1 };
			req.body = { title: '' };

			await taskController.editbyId(req, res);

			expect(res.status.calledWith(400)).to.be.true;
			expect(res.json.calledWith({ err: 'invalid id or invalid task.' }))
				.to.be.true;
		});

		it('should return 204 with message', async () => {
			req.params = { id: 5 };
			req.body = { title: 'test' };
			const fakeTask = { rowCount: 0 };
			sinon.stub(client, 'query').resolves(fakeTask);

			await taskController.editbyId(req, res);

			expect(res.status.calledWith(204)).to.be.true;
			expect(res.json.calledWith({ msg: '0 tasks updated' })).to.be.true;
		});
	});
});
