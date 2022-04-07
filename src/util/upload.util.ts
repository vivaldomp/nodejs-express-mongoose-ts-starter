import multer, { Multer } from "multer";

const storage = multer.memoryStorage()

const uploads: Multer = multer({ storage });

export default uploads ;