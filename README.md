###


# shadcn
- npx shadcn@latest init
- npx shadcn@latest add sheet
- npx shadcn@latest add button input label
- npx shadcn@latest add alert-dialog

# theme
- npm install next-themes

# clerk
- npm install @clerk/nextjs @clerk/ui @clerk/localizations

# prisma
- npm install @prisma/client@7 @prisma/adapter-neon@7 dotenv
- npm install -D prisma@7 tsx
- npx prisma init
- npx prisma migrate dev --name init
- npx prisma generate
- npx prisma migrate dev --name init
- npx prisma migrate dev --name unique-cui-per-org

# libraries
- npm install server-only
- npm install zod


# others
- find app -path "*auth*"