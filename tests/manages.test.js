const {
    getAllElements,
    getElementById,
    insertElement,
    updateElement,
    deleteElementById,
    connection,
    closeConnection,
} = require("../src/data/database.js");

let newManageId;

beforeAll(async () => {
    await connection.query("DELETE FROM manages WHERE employee_id=2");
    const [resultset] = await connection.query(
        "INSERT INTO manages (service_id, employee_id, start_date) VALUES (?, ?, ?)",
        [1, 2, "1960-01-01 23:53:02"]
    );
    newManageId = resultset.insertId;
});

afterAll(async () => {
    await connection.query("DELETE FROM manages WHERE employee_id=2");
    await closeConnection();
});

test("getAllElements doit me retourner un tableau de plusieurs managers", async () => {
    const manageList = await getAllElements('manages');
    expect(manageList.length).toBeGreaterThan(0)
});

test("getElementById doit me renvoyer le service_id et le employee_id en fonction de son ID", async () => {
    const managerDetails = {
        service_id: 1,
        employee_id: 2,
    };
    const managerId = await getElementById("manages", newManageId);
    expect(managerId.length).toEqual(1);
    expect(managerId[0]).toEqual(expect.objectContaining(managerDetails));
});

test("InsertElement doit inserer un manager dans la base de donne", async () => {
    const newManagerData = {
        service_id: 1,
        employee_id: 5,
        start_date: '2020-05-24',
    }
    const insertId = await insertElement('manages', newManagerData);
    expect(insertId).toBeGreaterThan(0);
    await deleteElementById("manages",insertId);
});

test("updateElement doit retourner le nombres de lignes mis a jours", async () => {
    const updateManagerData = {
        service_id: 1,
        employee_id: 5,
        start_date: '2024-12-01'
    }
    const updateManager = await updateElement('manages', newManageId, updateManagerData);
    expect(updateManager).toBeGreaterThanOrEqual(0);
});

test("deleteElementById doit quand a lui retourner le nombres de lignes supprimee", async () => {
    const managesInformation = {
        service_id: 1,
        employee_id: 5,
        start_date: '2024-12-01'
    }
    const insertId = await insertElement("manages", managesInformation);
    expect(insertId).toBeGreaterThan(0);

    const deletedRows = await deleteElementById("manages", insertId);
    expect(deletedRows).toBeGreaterThan(0);
});