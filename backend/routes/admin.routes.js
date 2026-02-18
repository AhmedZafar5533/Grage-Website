import { Router } from "express";
import { addVehicle, deleteVehicle, editVehicle, getAllVehiclesAdmin, getVehicleById,} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { uploadPic } from "../middlewares/uploadImage.middleware.js";
const router = Router()

router.route('/addVehicle').post(verifyJWT, isAdmin, uploadPic.array("images", 5), addVehicle)
router.get("/all",verifyJWT, isAdmin, getAllVehiclesAdmin);
router.get("/user/all", getAllVehiclesAdmin);
router.get("/getVehicle/:id",verifyJWT, isAdmin, getVehicleById);
router.get("/getVehicleUser/:id", getVehicleById);
router.route('/editVehicle/:id').put(verifyJWT, isAdmin, uploadPic.array("images", 5), editVehicle)
router.delete("/deleteVehicle/:id",verifyJWT, isAdmin, deleteVehicle);
export default router;