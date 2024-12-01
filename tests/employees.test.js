const {
    getAllElements,
    getElementById,
    insertElement,
    updateElement,
    deleteElementById,
    getManagerByService,
    connection,
    closeConnection,
} = require("../src/data/database.js");

let newEmployeeId;

beforeAll(async () => {
    await connection.query("DELETE FROM employees WHERE email='didier.super@yahoo.com'");
    const [resultset] = await connection.query(
        "INSERT INTO employees (first_name, last_name, email, salary, service_id) VALUES (?, ?, ?, ?, ?)",
        ["didier", "super", "didier.super@yahoo.com", 35000, 1]
    );
    newEmployeeId = resultset.insertId;
});

afterAll(async () => {
    await connection.query("DELETE FROM employees WHERE email='didier.super@yahoo.com'");
    await closeConnection();
});

test("getAllElements doit me retourner un tableau de plusieurs employer", async () => {
    const employeeList = await getAllElements('employees');
    expect(employeeList.length).toBeGreaterThan(0)
});

test("getElementById doit me retourner tous les elements d'un employer en fonction de son ID", async () => {
    const didierDetails = {
        first_name: "didier",
        last_name: "super",
        email: "didier.super@yahoo.com",
    };
    const employeeId = await getElementById("employees", newEmployeeId);
    expect(employeeId.length).toEqual(1);
    expect(employeeId[0]).toEqual(expect.objectContaining(didierDetails));
});

test("InsertElement doit inserer un employer dans la base de donne", async () => {
    const newEmployeeData = {
        first_name: "jean",
        last_name: "dupond",
        email: "jean.dupond@yahoo.com",
        salary: 50000,
    }
    const insertId = await insertElement('employees', newEmployeeData);
    expect(insertId).toBeGreaterThan(0);
    await deleteElementById("employees", insertId);
});

test("updateElement doit retourner le nombres de lignes mis a jours", async () => {
    const didierDetails = {
        first_name: "okcool",
        last_name: "super",
        email: "didier.super@yahoo.com",
    };
    const updateEmployee = await updateElement('employees', newEmployeeId, didierDetails);
    expect(updateEmployee).toBeGreaterThanOrEqual(0);
});

test("deleteElementById doit quand a lui retourner le nombres de lignes supprimee", async () => {
    const employeeInformation = {
        first_name: "test",
        last_name: "employee",
        email: "test.employee@example.com",
        salary: 20000,
    };
    const insertId = await insertElement("employees", employeeInformation);
    expect(insertId).toBeGreaterThan(0);

    const deletedRows = await deleteElementById("employees", insertId);
    expect(deletedRows).toBeGreaterThan(0);
});

test("getManagerByService doit me renvoyer le nom du manager en fonction de l'id du service donné", async () => {
    const serviceId = 1;
    const managerDetails = await getManagerByService(serviceId);

    expect(managerDetails).toBeDefined();
    expect(managerDetails.length).toEqual(1);
});