const {
    getAllElements,
    getElementById,
    insertElement,
    updateElement,
    deleteElementById,
    connection,
    closeConnection,
} = require("../src/data/database.js");

let newServiceId;

beforeAll(async () => {
    await connection.query("DELETE FROM services WHERE name='developer'");
    const [resultset] = await connection.query(
        "INSERT INTO services (name, office_number) VALUES (?, ?)",
        ["developer", "106"]
    );
    newServiceId = resultset.insertId;
});

afterAll(async () => {
    await connection.query("DELETE FROM services WHERE name='developer'");
    await closeConnection();
});

test("getAllElements doit me retourner un tableau de plusieurs managers", async () => {
    const manageList = await getAllElements('services');
    expect(manageList.length).toBeGreaterThan(0)
});

test("getElementById doit me renvoyer le service_id et le employee_id en fonction de son ID", async () => {
    const serviceDetails = {
        name: "developer",
        office_number: "106",
    };
    const serviceId = await getElementById("services", newServiceId);
    expect(serviceId.length).toEqual(1);
    expect(serviceId[0]).toEqual(expect.objectContaining(serviceDetails));
});

test("InsertElement doit inserer un manager dans la base de donne", async () => {
    const newService = {
        name: "developer",
        office_number: "106",
    };
    const insertId = await insertElement('services', newService);
    expect(insertId).toBeGreaterThan(0);
    await deleteElementById("services",insertId);
});

test("updateElement doit retourner le nombres de lignes mis a jours", async () => {
    const updateServiceData = {
        name: "developer",
        office_number: "106",
    };
    const updateService = await updateElement('services', newServiceId, updateServiceData);
    expect(updateService).toBeGreaterThanOrEqual(0);
});

test("deleteElementById doit quand a lui retourner le nombres de lignes supprimee", async () => {
    const serviceData = {
        name: "developer",
        office_number: "106",
    };
    const insertId = await insertElement("services", serviceData);
    expect(insertId).toBeGreaterThan(0);

    const deletedRows = await deleteElementById("services", insertId);
    expect(deletedRows).toBeGreaterThan(0);
});