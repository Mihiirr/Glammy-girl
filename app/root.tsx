import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import Button from "./components/Button";
import styles from "./styles/app.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,500&family=Smooch&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,500&family=Smooch&family=The+Nautigal:wght@700&display=swap",
    },
  ];
}

export const meta: MetaFunction = () => {
  const description = `Welcome to Fashion World!`;
  return {
    charset: "utf-8",
    title: "Glammygirl",
    viewport: "width=device-width,initial-scale=1",
    keywords: "Fashion,World,Glammygirl,Shopping",
    "twitter:image": "https://remix-jokes.lol/social.png",
    "twitter:card": "summary_large_image",
    "twitter:creator": "mihir",
    "twitter:site": "glammygirl",
    "twitter:title": "Glammy Girl",
    "twitter:description": description,
  };
};

function Document({
  children,
  title = "Glammygirl",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Meta />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
        <p className="text-5xl mb-6">App Error!</p>
        <p className="text-xl mb-4">
          Oops Something went wrong, Please try again letter
        </p>
        <pre>{error.message}</pre>
        <Link
          to="/"
          className="h-10 w-36 mt-6 flex items-center justify-center text-lg border-2 border-gray-200 hover:bg-stone-100"
        >
          Home Page
        </Link>
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = <p>Please check the URL in the address bar and try again.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
        <p className="md:text-5xl text-3xl">
          {caught.status} {caught.statusText}!
        </p>
        <p className="md:mb-6 mb-3 text-sm md:text-lg">{message}</p>
        <Link to="/">
          <Button variant="secondary">Home Page</Button>
        </Link>
      </div>
    </Document>
  );
}
