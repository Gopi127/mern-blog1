const express = require("express");
const planController = require("../../controllers/plan/planController");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const planRoutes = express.Router();

//---------create a plan

planRoutes.post("/create", isAuthenticated, planController.createPlan);

//-----List-all-plan-------------

planRoutes.get("/", planController.lists);

//-------Update-plan-----------

planRoutes.put("/:planId", isAuthenticated, planController.update);

//-----------Get a plan---------

planRoutes.get("/:planId", planController.getPlan);

//---------Delete plan------------

planRoutes.delete("/:planId", isAuthenticated, planController.delete);

module.exports = planRoutes;
