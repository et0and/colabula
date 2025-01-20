![Colabula splash screen](/public/og.png)

# Colabula

Colabula is an open-source platform designed specifically for New Zealand's art education community. It enables art educators from schools to share, review, and collaborate on student portfolio work at every stage of development.

## Features

- Progress tracking: monitor and share both in-progress and completed student work. Supports all popular image formats up to 50MiB per file
- Shared feedback: enables constructive dialogue between art educators nationwide with threaded conversations
- Indicative grading: submit grades tied to the NCEA grading system (N0 to E8), and see the average grade given to a posted work/portfolio from other teachers
- Metadata tagging: Organise portfolios by subject matter, style, and medium, with the ability to auto-tag using Llama 3.2 Vision 11B

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Better-Auth
- Shadcn UI
- Prisma (with Postgres on Supabase)
- Cloudflare R2
- Openrouter for handling requests to Llama Vision endpoint
- Sentry for error tracking and monitoring
- Posthog for session replays and product analytics
- Better Stack for status page
- Redis (via Upstash) for caching and rate limiting school name lookups
- Resend and react-email for email sending
- Vercel for deployment

In the future we would like to add greater integrations with the NCEA and NZQA curriculum, implement one-click imports from popular cloud storage services such as Google Drive, as well as provide a desktop app that can be used offline.

## Get started

### Hosted version (colabula.com)

If your school has been whitelisted for access, you can use the hosted version of Colabula at [colabula.com](https://colabula.com/sign-up).

If your school is not part of the pilot, you can request early access by emailing [pilot@colabula.com](mailto:pilot@colabula.com).

### Self-hosting

We use Vercel for deployment. To get started, clone the repository and follow the instructions in the [Vercel deployment guide](https://vercel.com/docs/concepts/deployments/overview). You will need to set up a Postgres database and configure the environment variables in the Vercel project settings.

We recommend using a Postgres database hosted on Supabase. You can create a free account and follow the instructions in the [Supabase deployment guide](https://supabase.com/docs/guides/hosting/vercel). Otherwise any Postgres database will work. Better Auth requires your own database to run since it is a fully self-hosted authentication provider, but if this is too much work this could be swapped out for a hosted solution such as [Clerk](https://clerk.com) or [Stack Auth](https://stack-auth.com).

You will also need to set up an OpenRouter API key and an Upstash Redis instance. You can create an account and follow the instructions in the [OpenRouter deployment guide](https://openrouter.ai/docs/quickstart) and [Upstash deployment guide](https://upstash.com/docs/redis/quickstart).

Any S3 compatible object storage service will work for storage on your Colabula instance. We recommend using Cloudflare R2, as it is fully compatible with the S3 API and is very cheap. You can create an account and follow the instructions in the [Cloudflare R2 deployment guide](https://developers.cloudflare.com/r2/get-started/). Otherwise, we recommend using something like AWS S3 or [Wasabi](https://wasabi.com/).

Resend can be swapped out for any email service that supports sending emails via SMTP. You can create an account and follow the instructions in the [Resend deployment guide](https://resend.com/docs/getting-started). [Amazon SES](https://aws.amazon.com/ses/) or [Plunk](https://www.useplunk.com/) are both good alternatives.

If you do self-host your own instance, remember that you will need to provide access to the source code (if you make changes) as according to the license below. You will also need to determine your own usage terms and privacy policy.

## License

Colabula is licensed under the GNU Affero General Public License v3.0. See the [LICENSE file](/LICENSE) for details.

This means:

- You can freely use, modify, and distribute this software
- If you modify and use this software in a network service, you must make your modified version available to users
- Any derivative works must also be licensed under AGPL-3.0
