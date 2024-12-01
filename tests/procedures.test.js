const {
    executeStoredProcedure,
    closeConnection,
} = require("../src/data/database.js");

test("executeStoredProcedure doit retourner au moins un certain nombre de résultats", async () => {
    let ProcedureName = "GetEmployeeCountByService";
    const executeProcedure = await executeStoredProcedure(ProcedureName);
    expect(executeProcedure[0].length).toBeGreaterThanOrEqual(1);

    await closeConnection();
});
