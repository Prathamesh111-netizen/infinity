import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import DashboardPage from "./pages/DashboardPage";
import Homepage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Your WalletConnect Cloud project ID
const projectId = "12297335f8584d3383596fb6a9909b6a";

// 2. Create wagmiConfig
const metadata = {
  name: "Infinity",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // ...wagmiOptions // Optional - Override createConfig parameters
  auth: {
    email: true, // default to true
    socials: [
      "google",
      "x",
      "github",
      "discord",
      "apple",
      "facebook",
      "farcaster",
    ],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
});
export { config };
// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

const rootRoute = createRootRoute({
  component: () => (
      <Outlet />
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, dashboardRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <WagmiProvider config={config}> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    {/* </WagmiProvider> */}
  </StrictMode>
);
