const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const express = require('express');
const sql = require('mssql');
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

// Configurar la conexión a la base de datos
const config = {
  user: 'sa',
  password: '123',
  server: 'laptopCami\\SQLEXPRESS',
  database: 'ProductionDataMart',
};

const config2 = {
  server: "LAPTOPCAMI\\SQLEXPRESS",
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "123"
    }
  },
  options: {
    port: 1433,
    database: "ProductionDataMart",
    trustServerCertificate: true
  }
}

// Endpoint para obtener los productos en el almacén con sus cantidades en los últimos 10 años
app.get('/api/productos-cantidad', async (req, res) => {
  try {
    await sql.connect(config2);
    const result = await sql.query(`
    select p.name, pri.quantity
    from productInventory as prI, product as p
    where p.productid = prI.productid;
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener datos:', err);
    res.status(500).send('Error interno del servidor');
  }
});

// Endpoint para obtener los productos con sus respectivos ratings
app.get('/api/productos-ratings', async (req, res) => {
  try {
    await sql.connect(config2);
    const result = await sql.query(`
    select p.name, pr.rating
    from ProductReview as pr , product as p
    where p.productid = pr.productid;
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener datos:', err);
    res.status(500).send('Error interno del servidor');
  }
});

// Endpoint para obtener los productos más vendidos por locación
app.get('/api/productos-mas-vendidos', async (req, res) => {
  try {
    await sql.connect(config2);
    const result = await sql.query(`
    select DISTINCT l.name as "localizacion", prI.Quantity
    from Location as l , product as p,productInventory as prI
    where pri.locationid = l.locationid
    and p.productid = prI.productid;
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener datos:', err);
    res.status(500).send('Error interno del servidor');
  }
});

// Endpoint para obtener los productos ordenados por StandardCost de mayor a menor
app.get('/api/productos-costos', async (req, res) => {
  try {
    await sql.connect(config2);
    const result = await sql.query(`
    SELECT p.ProductID, p.Name, p.StandardCost
    FROM Product p
    ORDER BY StandardCost DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener datos:', err);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


const connection = new Connection(config2);

connection.connect();

connection.on('connect', (err)=>{
    if(err){
        console.log("error al conectarse a la base de datos");
        throw err;
    }
});
