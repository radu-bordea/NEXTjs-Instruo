// prisma/seed.ts
// Saves the built-in form templates into the database.
// Run with: npx prisma db seed
// Safe to run many times: it updates the template if it already exists.

import "dotenv/config"; // load .env (this runs outside Next.js)
import { PrismaClient, type Prisma } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { ssmTrainingTemplate } from "../lib/templates/ssm-training";

// Own client here, NOT lib/db.ts: that file imports "server-only",
// which only works inside Next.js, not in a plain script.
const db = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

// All built-in templates. Later: PSI, collective training sheet...
const templates = [ssmTrainingTemplate];

async function main() {
  for (const template of templates) {
    // Prisma's Json type is strict; our fields are plain data, so we tell TypeScript it's fine.
    const fields = template.fields as unknown as Prisma.InputJsonValue;

    // Is this exact template + version already saved as a built-in (orgId null)?
    const existing = await db.formTemplate.findFirst({
      where: { slug: template.slug, version: template.version, orgId: null },
    });

    if (existing) {
      await db.formTemplate.update({
        where: { id: existing.id },
        data: { name: template.name, fields },
      });
      console.log(`Updated: ${template.slug} v${template.version}`);
    } else {
      await db.formTemplate.create({
        data: {
          orgId: null, // built-in: visible to every organization
          slug: template.slug,
          name: template.name,
          version: template.version,
          fields,
        },
      });
      console.log(`Created: ${template.slug} v${template.version}`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1); // tell the terminal it failed
  })
  .finally(() => db.$disconnect()); // close the connection so the script can exit