const {Router} = require("express")

const router = Router()
const ModelOrder = require("../orderModel.js");
const ModelFood = require("../foodModel.js");
const ModelOrderDetail = require("../orderDetailModel.js");
const ModelClient = require("../clientModel.js");
const ModelMenu = require("../menuModel.js");

router.get("/", (req,res) => {
    res.send("Conexión con el puerto", 3000, "exitosa");
});

//GETS

/**
 * @swagger
 * /foods:
 *  get:
 *    summary: Get a list of all foods
 *    description: Retrieves a list of foods from the database.
 *    responses:
 *      200:
 *        description: A successful response with an array of foods.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    description: The name of the food.
 *                  price:
 *                    type: number
 *                    description: The price of the food.
 *                  available:
 *                    type: boolean
 *                    description: Availability of the food.
 *      500:
 *        description: Server error
 */
router.get('/foods', async (req, res) => {
    try {
        const users = await ModelFood.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/orders', async (req,res) => {
    try {
        const orders = await ModelOrder.find();
        res.json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/orderDetails', async (req,res) => {
    try {
        const orderdetails = await ModelOrderDetail.find();
        res.json(orderdetails);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/menus', async (req,res) => {
    try {
        const menus = await ModelMenu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/clients', async (req,res) => {
    try {
        const clients = await ModelClient.find();
        res.json(clients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//POST

router.post("/foods", async(req,res) => {
    const body = req.body;

    const respuesta = await ModelFood.create(body); 

    res.send(respuesta);
});

module.exports=router;


router.post("/orders", async(req,res) => {
    const body = req.body;

    const respuesta = await ModelOrder.create(body); 

    res.send(respuesta);
});

module.exports=router;


router.post("/orderdetails", async(req,res) => {
    const body = req.body;

    const respuesta = await ModelOrderDetail.create(body); 

    res.send(respuesta);
});

module.exports=router;


router.post("/clients", async(req,res) => {
    const body = req.body;

    const respuesta = await ModelClient.create(body); 

    res.send(respuesta);
});

module.exports=router;


router.post("/menus", async(req,res) => {
    const body = req.body;

    const respuesta = await ModelMenu.create(body); 

    res.send(respuesta);
});

module.exports=router;

//PUT

router.put('/foods/:id', async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelFood.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
});

router.put('/clients/:id', async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelClient.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
});

router.put('/clients/:clientId/add-favorite/:menuId', async (req, res) => {
    const { clientId, menuId } = req.params;

    try {
        const client = await ModelClient.findById(clientId);
        if (!client) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        const menu = await ModelMenu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ error: "Menú no encontrado" });
        }

        if (client.favoriteMenus.includes(menuId)) {
            return res.status(400).json({ error: "El menú ya está en favoritos del cliente" });
        }
    
        client.favoriteMenus.push(menuId);
        await client.save();

        res.send(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar menú a favoritos" });
    }
});

router.put('/menus/:id', async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelMenu.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
});

router.put('/menus/:id/comments', async (req, res) => {
    const { username, comment } = req.body;
    const id = req.params.id;

    try {
        const menu = await ModelMenu.findByIdAndUpdate(id, {
            $push: { comments: { username, comment } }
        }, { new: true });

        if (!menu) {
            return res.status(404).send({ error: "Menú no encontrado" });
        }

        res.send(menu);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al añadir comentario al menú" });
    }
});


router.put('/menus/:id/scores', async (req, res) => {
    const { score } = req.body; 
    const id = req.params.id;

    try {
        const menu = await ModelMenu.findByIdAndUpdate(id, {
            $push: { scores: { score } }
        }, { new: true });

        if (!menu) {
            return res.status(404).send({ error: "Menú no encontrado" });
        }

        res.send(menu);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al añadir calificación al menú" });
    }
});

router.put('/orders/:id', async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelOrder.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
});

router.put('/orderdetails/:id', async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelOrderDetail.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
});

//DELETE

router.delete('/menus/:id', async (req, res) => {
    const id = req.params.id;

    const respuesta = await ModelMenu.findByIdAndDelete({_id: id});

    res.send(respuesta);
  });
  
router.delete('/foods/:id', async (req, res) => {
    const id = req.params.id;

    const respuesta = await ModelFood.findByIdAndDelete({_id: id});

    res.send(respuesta);
  });

  router.delete('/clients/:id', async (req, res) => {
    const id = req.params.id;

    const respuesta = await ModelClient.findByIdAndDelete({_id: id});

    res.send(respuesta);
  });

  router.delete('/orders/:id', async (req, res) => {
    const id = req.params.id;

    const respuesta = await ModelOrder.findByIdAndDelete({_id: id});

    res.send(respuesta);
  });

  router.delete('/orderdetails/:id', async (req, res) => {
    const id = req.params.id;

    const respuesta = await ModelOrderDetail.findByIdAndDelete({_id: id});

    res.send(respuesta);
  });

