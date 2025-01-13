# Colabula

Colabula is an open-source platform designed specifically for New Zealand's art education community. It enables art educators from schools to share, review, and collaborate on student portfolio work at every stage of development.

## Features

- Progress tracking: monitor and share both in-progress and completed student work. Supports all popular image formats up to 50MiB per file
- Shared feedback: enables constructive dialogue between art educators nationwide with threaded conversations
- Indicative grading: submit grades tied to the NCEA grading system (N0 to E8), and see the average grade given to a posted work/portfolio from other teachers
- Metadata tagging: Organise portfolios by subject matter, style, and medium, with the ability to auto-tag using Llama 3.2 Vision 90B

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Better-Auth
- Shadcn UI
- Prisma (with Postgres on Supabase)
- Cloudflare R2
- Openrouter for handling requests to Llama Vision endpoint

## License

Colabula is licensed under the GNU Affero General Public License v3.0. See the [LICENSE file](/LICENSE) for details.

This means:

- You can freely use, modify, and distribute this software
- If you modify and use this software in a network service, you must make your modified version available to users
- Any derivative works must also be licensed under AGPL-3.0
