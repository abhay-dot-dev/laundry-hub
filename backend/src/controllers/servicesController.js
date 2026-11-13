import services from "../data/services.js";

export const getServices = (req, res) => {
   res.status(200).json({message: "Services fetched succesfully!", services: services});
}