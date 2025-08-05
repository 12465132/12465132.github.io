import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const climateEvents = pgTable("climate_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  year: integer("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(), // historical, disaster, policy
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const climateParameters = pgTable("climate_parameters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  year: integer("year").notNull(),
  scenario: varchar("scenario", { length: 20 }).notNull(), // optimistic, realistic, pessimistic
  seaLevel: real("sea_level").notNull(), // in cm
  temperature: real("temperature").notNull(), // in celsius
  wildfires: real("wildfires").notNull(), // percentage
  pollution: real("pollution").notNull(), // percentage
  iceLoss: real("ice_loss").notNull(), // percentage
  drought: real("drought").notNull(), // percentage
});

export const insertClimateEventSchema = createInsertSchema(climateEvents).omit({
  id: true,
  createdAt: true,
});

export const insertClimateParametersSchema = createInsertSchema(climateParameters).omit({
  id: true,
});

export type ClimateEvent = typeof climateEvents.$inferSelect;
export type InsertClimateEvent = z.infer<typeof insertClimateEventSchema>;
export type ClimateParameters = typeof climateParameters.$inferSelect;
export type InsertClimateParameters = z.infer<typeof insertClimateParametersSchema>;

export type TimelineScenario = "optimistic" | "realistic" | "pessimistic";
export type EventType = "historical" | "disaster" | "policy";
