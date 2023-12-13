import  { Router ,Request,Response} from "express"
import Signin from "../controllers/Auth/signin"
import Search from "../controllers/Search/serachItems"
import UsersController from "../controllers/Users"
import HousesController from "../controllers/Houses"
import CategoriesController from "../controllers/Categories"
import UploadController from "../controllers/Upload"
const router = Router()

//Routes Users
router.get("/users", UsersController.getAllUsers)
router.get("/users/:slug",UsersController.getOneUser)
router.post("/user-create", UsersController.createUser)
router.put("/user-update",UsersController.updateUser)
router.delete("/user-delete",UsersController.deleteUser)

//Routes House
router.get("/houses", HousesController.getAllHouses)
router.get("/houses/:slug", HousesController.getOneHouse)
router.post("/create-house", HousesController.createHouse)
router.put("/update-house", HousesController.updateHouse)
router.put("/delete-house", HousesController.deleteHouse)

//Routes Category
router.get("/categories", CategoriesController.getAllCategories)
router.get("/category/:slug",CategoriesController.getOneCategory)
router.post("/create-category",CategoriesController.createCategory)
router.put("/update-category",CategoriesController.updateCategory)
router.delete("/delete-category",CategoriesController.deleteCategory)


 //Route Auth
 router.post("/signin",Signin)

//Route Search
router.get("/search", Search)

//Routes upload
router.post("/perfil",UploadController.perfilProfile )
router.post("/files-imovel",UploadController.imageImoveis )

export default router;