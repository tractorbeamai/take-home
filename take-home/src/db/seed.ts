import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "./schema"

const sqlite = new Database("sqlite.db")
const db = drizzle(sqlite, { schema })

function seed() {
  console.log("Seeding database...")

  // Clear existing data
  db.delete(schema.notes).run()
  db.delete(schema.projects).run()

  // Seed projects
  db.insert(schema.projects)
    .values([
      {
        id: "00000000-0000-0000-0000-000000000001",
        name: "Website Redesign",
        description:
          "Complete overhaul of the company website with new branding, improved UX, and mobile-first design.",
        status: "active",
        priority: "high",
      },
      {
        id: "00000000-0000-0000-0000-000000000002",
        name: "API Integration",
        description:
          "Build REST API integrations with third-party services including Stripe, SendGrid, and Twilio.",
        status: "active",
        priority: "medium",
      },
      {
        id: "00000000-0000-0000-0000-000000000003",
        name: "Mobile App",
        description:
          "React Native mobile application for iOS and Android with offline support and push notifications.",
        status: "planning",
        priority: "low",
      },
    ])
    .run()

  // Seed notes
  db.insert(schema.notes)
    .values([
      {
        id: "00000000-0000-0000-0000-000000000010",
        projectId: "00000000-0000-0000-0000-000000000001",
        title: "Design system kickoff",
        content:
          "Met with the design team to establish the new component library. Using Figma for handoff. Need to finalize color palette by next week.",
      },
      {
        id: "00000000-0000-0000-0000-000000000011",
        projectId: "00000000-0000-0000-0000-000000000001",
        title: "Performance audit",
        content:
          "Ran Lighthouse on the current site. Core Web Vitals need improvement — LCP is 4.2s, should be under 2.5s. Bundle size is 1.8MB uncompressed.",
      },
      {
        id: "00000000-0000-0000-0000-000000000012",
        projectId: "00000000-0000-0000-0000-000000000002",
        title: "Stripe webhook setup",
        content:
          "Configured Stripe webhooks for payment events. Need to handle checkout.session.completed and invoice.payment_failed events.",
      },
      {
        id: "00000000-0000-0000-0000-000000000013",
        projectId: "00000000-0000-0000-0000-000000000002",
        title: "Rate limiting strategy",
        content:
          "Implementing token bucket rate limiting for the API. 100 requests per minute per API key for standard tier, 1000 for premium.",
      },
      {
        id: "00000000-0000-0000-0000-000000000014",
        projectId: "00000000-0000-0000-0000-000000000003",
        title: "Offline sync architecture",
        content:
          "Evaluating WatermelonDB vs custom SQLite solution for offline data sync. WatermelonDB has better conflict resolution but adds 200KB to bundle.",
      },
    ])
    .run()

  console.log("Seeding complete!")
  console.log("  - 3 projects")
  console.log("  - 5 notes")
}

seed()
