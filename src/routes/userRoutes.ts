import express from 'express'
const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).send()
})
// router.post("/")
// router.put("/:id")
// router.delete("/:id")

export default router;
