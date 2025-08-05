import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Climate events API
  app.get("/api/climate-events", async (req, res) => {
    try {
      const events = await storage.getClimateEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch climate events" });
    }
  });

  app.get("/api/climate-events/:year", async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      const events = await storage.getClimateEventsByYear(year);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch climate events" });
    }
  });

  // Climate parameters API
  app.get("/api/climate-parameters/:year/:scenario", async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      const scenario = req.params.scenario;
      const parameters = await storage.getClimateParameters(year, scenario);
      res.json(parameters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch climate parameters" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
