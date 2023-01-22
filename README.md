# Formula One API and Dashboard
 ## Features
* JSON Validation in Controllers
* XML Validation on some methods controllers (little time)
* REST-ful API with all functional CRUD operations (view in Postman)
* JSON Schemas and XSD Schemas to preview
* Beautiful, responsive API Consumer (mostly functional)
* Labor of perpetual love since friday 16:00
* Exciting Dataset

---
## Setup
### Pre-Requisites
1. XAMPP or MAMP local SQL Server 
2. Node.js installed
3. Postman Installed


### API
1. Create a new Database `'formula1'` and Import the `formula1.sql` file found in */dataset* folder
2. Run `npm install` for the dev modules
3. Run `node app.js`
### Consumer
4. Go to `localhost:4001/`
### Postman
1. Import the Postman Collection found in */postman* folder.
2. Enter the collection and use the preset calls.
3. To test the POST and PUT methods, use the *x-www-form-urlencoded* body format

---
Hope you will enjoy it :)

---
# Particulars and Brief
* All CRUD Endpoints work in Postman
* Consumer uses AJAX for Form submissions, POST works, PUT does not update SQL data
* No XSD Validation on crud operations, Generated XML is inline with the XSD Schema
* All XML responses are generated in the controller from JSON by custom code for the purpose of the assignment 
