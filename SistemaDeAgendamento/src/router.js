import { Router } from 'express'; // Chamando o router.js

const router = new Router(); // Instanciando o Router

router.get ('/', (req, res) => {
    return res.json({message: 'Okay'})
})

export default router;