const express = require('express');
const employeesRoutes = require('./routes/employees');
const managesRoutes = require('./routes/manages');
const servicesRoutes = require('./routes/services');
const procedureRoutes = require('./routes/executeStoredProcedure');

const app = express();

app.use(express.json());

app.use('/employee', employeesRoutes);
app.use('/manager', managesRoutes);
app.use('/service', servicesRoutes);
app.use('/procedure', procedureRoutes);

module.exports = app;