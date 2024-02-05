# 101.school

101.school is an innovative platform designed to leverage AI technology, specifically GPT-4, to generate comprehensive and engaging course content based on user inputs. This project aims to revolutionize the way educational content is created, making it faster and more accessible to a wide audience.

## Features

- AI-generated course outlines and content
- User account management for accessing certain features
- Email notifications for course updates
- Publicly accessible generated courses
- Interactive AI chat for inquiries on course units

## Technologies Used

- Next.js for the frontend and backend framework
- TypeScript for type-safe code
- OpenAI's GPT-4 for generating course content
- PostgreSQL for database management
- Vite for frontend tooling
- Tailwind CSS for styling

## Getting Started

To run this project locally, you need to have Node.js (version 18) installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/maccman/101-school.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables by copying the `.env.example` file to `.env.local` and filling in your details.

4. Start the development server:

```bash
pnpm run dev
```

## Environment Variables

| Environment Variable      | Description                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_HANKO_API_URL | The URL for the Hanko API, obtainable from your [Hanko account dashboard](https://www.hanko.io/).  |
| DATABASE_URL              | Your PostgreSQL database connection string. We recommend [Neon](https://neon.tech/).               |
| OPENAI_API_KEY            | The API key for OpenAI, available from the [OpenAI API dashboard](https://openai.com/).            |
| RESEND_API_KEY            | API key for the Resend service, available from the [Resend service dashboard](https://resend.io/). |
| APP_HOST                  | The hostname of your application, typically defined by your hosting service.                       |
| VERCEL_URL                | Automatically provided by [Vercel](https://vercel.com/) when deploying, no action needed.          |
| STRIPE_SECRET_KEY         | Your Stripe secret key, available from the [Stripe dashboard](https://stripe.com/).                |
| STRIPE_PRICE_ID           | The price ID for your Stripe product, available from the [Stripe dashboard](https://stripe.com/).  |
| STRIPE_WEBHOOK_SECRET     | The webhook secret for Stripe, available from the [Stripe dashboard](https://stripe.com/).         |

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or find any bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to OpenAI for providing the GPT-4 API.
