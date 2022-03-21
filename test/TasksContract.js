const TasksContract = artifacts.require("TasksContract")

contract("TasksContract", () => {
    
    before(async ()=> {
        this.tasksContract = await TasksContract.deployed();

    })

    it('Migrate deployed successfully', async () => {
        const address = this.tasksContract.address
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    it('Get Tasks List', async () => {
        const counter = await this.tasksContract.taskCounter()
        const task = await this.tasksContract.tasks(counter)

        assert.equal(task.id.toNumber(), counter);
        assert.equal(task.title, "Mi Primer Tarea Ejemplo");
        assert.equal(task.description, "Tengo que hacer algo ejemplo");
        assert.equal(task.done, false);
        assert.equal(counter, 1);

    })

    it("Task Created Successfully", async ()=> {
        const result = await this.tasksContract.createTask("Some Task", "Description two");
        const idCreated = await this.tasksContract.taskCounter()
        const taskEvent = result.logs[0].args
        assert.equal(idCreated, 2);
        assert.equal(taskEvent.id.toNumber(), idCreated);
        assert.equal(taskEvent.title, "Some Task");
        assert.equal(taskEvent.description, "Description two");
        assert.equal(taskEvent.done, false);
    })

    it("Task Toggle done", async ()=> {
        const result = await this.tasksContract.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tasksContract.tasks(1);
        assert.equal(task.done, true)
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
    })
})