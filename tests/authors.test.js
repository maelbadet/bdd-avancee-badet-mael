const {
    getAllElements,
    getElementById,
    insertElement,
    updateElementById,
    deleteElementById,
    searchElementsByName,
    closeConnection,
    connection,
} = require("../src/data/database.js");

let newDidierId;

beforeAll(async () => {
    await connection.query("DELETE FROM authors WHERE email='didier.super@yahoo.com'");
    const [resultset] = await connection.query(
        "INSERT INTO authors (first_name, last_name, email, birthdate) VALUES (?, ?, ?, ?)",
        ["didier", "super", "didier.super@yahoo.com", "1960-01-01"]
    );
    newDidierId = resultset.insertId;
});

afterAll(async () => {
    await connection.query("DELETE FROM authors WHERE email='didier.super@yahoo.com'");
    await closeConnection();
});

test("getAllElements doit retourner une liste d'auteur quand il est appeler", async () => {
    const authorsList = await getAllElements("authors");
    expect(authorsList.length).toBeGreaterThan(0);
});

test("getElementById doit retourner les details d'un auteur quand il est appeler avec le bonne id", async () => {
    const didierDetails = {
        first_name: "didier",
        last_name: "super",
        email: "didier.super@yahoo.com",
    };
    const didierResult = await getElementById("authors", newDidierId);
    expect(didierResult.length).toEqual(1);
    expect(didierResult[0]).toEqual(expect.objectContaining(didierDetails));
});

test("InsertElement doit effectuer une insersion d'auteur et retourner son ID", async () => {
    const newAuthorData = {
        first_name: "jean",
        last_name: "dupont",
        email: "jean.dupont@example.com",
        birthdate: "1980-05-20",
    };
    const insertId = await insertElement("authors", newAuthorData);
    expect(insertId).toBeGreaterThan(0);
    console.log('nouvel id creer : '+ insertId);
    await deleteElementById("authors", insertId);
});

test("updateElementById doit modifier l'auteur avec le bon ID et retourner le nombre de ligne modifie", async () => {
    const updateData = { first_name: "didier", last_name: "super", email: "didier.super@updated.com" };
    const affectedRows = await updateElementById("authors", newDidierId, updateData);
    expect(affectedRows).toBe(1);
});

test("deleteElementById doit supprimer un auteur avec le bon id et retourner le nombre de ligne affecter", async () => {
    const newAuthorData = {
        first_name: "test",
        last_name: "author",
        email: "test.author@example.com",
        birthdate: "1990-10-15",
    };
    const insertId = await insertElement("authors", newAuthorData);
    expect(insertId).toBeGreaterThan(0);

    const deletedRows = await deleteElementById("authors", insertId);
    expect(deletedRows).toBe(1);
});

test("searchElementsByName doit retourner une liste d'auteur rechercher par nom", async () => {
    const searchValue = "didier";
    const results = await searchElementsByName("authors", searchValue, ["first_name", "last_name"]);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].first_name).toBe("didier");
});
