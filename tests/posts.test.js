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
let newPostId;
let authorId = 100;
beforeAll(async () => {
    await connection.query("DELETE FROM posts WHERE title='testTitre'");
    const [resultset] = await connection.query(
        "INSERT INTO posts (author_id, title, description, content, date) VALUES (?, ?, ?, ?, ?)",
        [authorId,"testTitre", "super", "didier.super@yahoo.com", "1960-01-01"]
    );
    newPostId = resultset.insertId;
});

afterAll(async () => {
    await connection.query("DELETE FROM posts WHERE title='testTitre'");
    await closeConnection();
});

test("getAllElements doit retourner une liste de posts quand il est appeler", async () => {
    const postsList = await getAllElements("posts");
    expect(postsList.length).toBeGreaterThan(0);
});

test("getElementById doit retourner les details d'un auteur quand il est appeler avec le bonne id", async () => {
    const postsDetails = {
        author_id: authorId,
        title: "testTitre",
        description: "super",
        content: "didier.super@yahoo.com",
    };
    const postResult = await getElementById("posts", newPostId);
    expect(postResult.length).toEqual(1);
    expect(postResult[0]).toEqual(expect.objectContaining(postsDetails));
});

test("InsertElement doit effectuer une insersion d'auteur et retourner son ID", async () => {
    const newAuthorData = {
        author_id: authorId,
        title: "jean",
        description: "dupont",
        content: "jean.dupont@example.com",
        date: "1980-05-20",
    };
    const insertId = await insertElement("posts", newAuthorData);
    expect(insertId).toBeGreaterThan(0);
    await deleteElementById("posts", insertId);
});

test("updateElementById doit modifier l'auteur avec le bon ID et retourner le nombre de ligne modifie", async () => {
    const updateData = { title: "updated post", description: "waza", content: "je le met a jour" };
    const affectedRows = await updateElementById("posts", newPostId, updateData);
    expect(affectedRows).toBe(1);
});

test("deleteElementById doit supprimer un auteur avec le bon id et retourner le nombre de ligne affecter", async () => {
    const newPostData = {
        author_id:authorId,
        title: "test",
        description: "author",
        content: "test.author@example.com",
        date: "1990-10-15",
    };
    const insertId = await insertElement("posts", newPostData);
    expect(insertId).toBeGreaterThan(0);

    const deletedRows = await deleteElementById("posts", insertId);
    expect(deletedRows).toBe(1);
});

test("searchElementsByName doit retourner une liste d'auteur rechercher par nom", async () => {
    const searchValue = "updated post";
    const results = await searchElementsByName("posts", searchValue, ["title", "description"]);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title || results[0].description ).toBe("updated post");
});