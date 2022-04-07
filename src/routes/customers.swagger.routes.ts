/**
 * @swagger
 * /customers:
 *   get:
 *     tags:
 *       - customers
 *     summary: Customer search
 *     description: Return all customers from the database
 *     operationId: Customers.list
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *       - name: select
 *         in: path
 *         description: Selects which fields to return from the Customer object. Default returns all fields.
 *         required: false
 *         schema:
 *           type: string
 *       - name: sort
 *         in: path
 *         description: Sort search based on entered fields. Default sorts by ObjectID.
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: path
 *         description: Select the page of the paging process. Default is 1.
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: path
 *         description: Informs the limit of records in each pagination. Default is 50.
 *         required: false
 *         schema:
 *           type: integer
 *       - name: pagination
 *         in: path
 *         description: Enables or disables paging process. Default is true.
 *         required: false
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     tags:
 *       - customers
 *     summary: Register a customer
 *     description: Registers a customer in the database
 *     operationId: Customers.create
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     requestBody:
 *       description: Client object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCustomer'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     tags:
 *       - customers
 *     summary: Search for a customer
 *     description: Returns a customer from the database based on ID
 *     operationId: Customers.findByID
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *       - name: id
 *         in: path
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     tags:
 *       - customers
 *     summary: Updates a customer
 *     description: Updates a customer from database based on ID
 *     operationId: Customers.putByID
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *       - name: id
 *         in: path
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Client object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCustomer'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

/**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     tags:
 *       - customers
 *     summary: Partially updates a customer
 *     description: Partially updates a customer from database based on ID
 *     operationId: Customers.patchByID
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *       - name: id
 *         in: path
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Customer Object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCustomer'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     tags:
 *       - customers
 *     summary: Excludes a customer
 *     description: Deletes a customer form the database based on ID
 *     operationId: Customers.deleteByID
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *       - name: id
 *         in: path
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

/**
 * @swagger
 * /customers/{id}/restore:
 *   post:
 *     tags:
 *       - customers
 *     summary: Restore a customer
 *     description: Restore a customer from the database based on ID
 *     operationId: Customers.restoreByID
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *       - name: id
 *         in: path
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */

/**
 * @swagger
 * /customers/upload/textfile:
 *   post:
 *     tags:
 *       - customers
 *     summary: Import customers from a text file
 *     description: Import clients from a text file to the system database
 *     operationId: Customers.uploadTextFile
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               textFile:
 *                 type: file
 *             required:
 *               - textFile
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResultImportFile'
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     userIdParam:
 *       in: header
 *       name: user_id
 *       description: User ID authorized to perform API operations
 *       required: true
 *       schema:
 *         type: string
 * 
 *   schemas:
 *     NewCustomer:
 *       type: object
 *       required:
 *         - subscription
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         subscription:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         company:
 *           type: string
 *         postalCode:
 *           type: string
 *         address:
 *           type: string
 *         addressNumber:
 *           type: string
 *         addressDistrict:
 *           type: string
 *         city:
 *           type: string
 *         country:
 *           type: string
 *         birthDate:
 *           type: string
 *         noteAbout:
 *           type: string
 *
 *     Customer:
 *       allOf:
 *       - $ref: '#/components/schemas/NewCustomer'
 *       - type: object
 *         required:
 *           - _id
 *           - userId
 *           - deleted
 *           - createdAt
 *           - updatedAt
 *         properties:
 *           _id:
 *             type: string
 *           userId:
 *             type: string
 *           deleted:
 *             type: boolean
 *           deletedAt:
 *             type: string
 *             format: date-time
 *           createdAt:
 *             type: string
 *             format: date-time
 *           updatedAt:
 *             type: string
 *             format: date-time
 *
 *     Pagination:
 *       type: object
 *       properties:
 *         docs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Customer'
 *         totalDocs:
 *           type: integer
 *         limit:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         page:
 *           type: integer
 *         pagingCounter:
 *           type: integer
 *         hasPrevPage:
 *           type: boolean
 *         hasNextPage:
 *           type: boolean
 *         prevPage:
 *           type:
 *             - integer
 *             - null
 *         nextPage:
 *           type:
 *             - integer
 *             - null
 *     ResultImportFile:
 *       type: object
 *       properties:
 *         docs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Customer'
 *         totalDocs:
 *           type: integer
 */