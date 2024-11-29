const express = require('express');
const employeesRoutes = require('./routes/employees');
const managesRoutes = require('./routes/manages');
const servicesRoutes = require('./routes/services');

const app = express();

app.use(express.json());

app.use('/employee', employeesRoutes);
app.use('/manager', managesRoutes);
app.use('/service', servicesRoutes);

module.exports = app;