import { Router } from "express";
import { githubController } from "./controller.js";

export const gitRouter = Router();

gitRouter.get("/", githubController.getRepo);
gitRouter.get("/all", githubController.getAllRepos);
gitRouter.get("/login", githubController.login);
gitRouter.get("/languages", githubController.getRepoLanguages);
gitRouter.get("/readme", githubController.getReadme);
gitRouter.put("/readme", githubController.updateReadme);
