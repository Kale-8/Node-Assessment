import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Express } from "express";

// Load YAML Swagger file
const swaggerPath = path.join(__dirname, "../../swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);

// Setup Swagger middleware
export const setupSwagger = (app: Express): void => {
  // Serve docs at /api-docs
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};