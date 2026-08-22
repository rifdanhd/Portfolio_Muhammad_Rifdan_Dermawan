import { BlogPost } from "@/types";

export const blogPostsData: BlogPost[] = [
  {
    slug: "rebuilding-saung-angklung-udjo-platform",
    title: "Rebuilding a Cultural Institution's Platform: From Legacy WordPress to Laravel 12",
    excerpt:
      "A deep dive into migrating Saung Angklung Udjo's web platform to Laravel 12, implementing dynamic QRIS payments, and defending against real-world security threats.",
    date: "2026-01-15",
    readingTime: "6 min read",
    tags: ["Laravel", "Architecture", "Database", "Security", "Case Study"],
    author: {
      name: "Muhammad Rifdan Dermawan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      role: "Full Stack Engineer",
    },
    content: `
# Rebuilding a Cultural Institution's Platform: From Legacy WordPress to Laravel 12

When I stepped into the role of lead developer at Saung Angklung Udjo (SAU) in Bandung, Indonesia, the venue's web presence relied on a heavily customized legacy WordPress setup. While WordPress is fantastic for standard content sites, running a live venue that hosts thousands of international tourists daily created severe operational pain points:

1. **Slow Page Loads**: Heavy plugin overhead pushed mobile loading times past 4.8 seconds.
2. **Database Locks**: Simultaneous ticket booking requests during peak holiday sales caused MySQL locking issues.
3. **Security Vulnerabilities**: Legacy plugins exposed the domain to automated malicious subdomain injection attempts.

## The Architectural Transition

We made the strategic decision to rewrite the entire platform from scratch using **Laravel 12**, **Tailwind CSS**, and **MySQL**, backed by **Cloudflare CDN** and deployed on an optimized cPanel server.

### Key Innovations

- **Atomic Seating Locks**: We introduced temporary 15-minute transactional seat reservations using Laravel DB transactions (\`DB::transaction()\`) and Redis lock primitives.
- **Dynamic QRIS Payments**: Automated payment settlement via QRIS code generation, removing manual payment proof verification.
- **Automated WhatsApp Notifications**: Integrated direct WhatsApp messaging API queues to send instant digital e-ticket QR codes to visitors' phones.

\`\`\`php
// Example: Atomic Reservation Lock in Laravel
public function reserveTickets(ReservationRequest $request)
{
    return DB::transaction(function () use ($request) {
        $event = Event::where('id', $request->event_id)->lockForUpdate()->first();
        
        if ($event->available_seats < $request->quantity) {
            throw new InsufficientSeatsException('Selected seats are no longer available.');
        }

        $event->decrement('available_seats', $request->quantity);

        return Reservation::create([
            'user_id' => auth()->id(),
            'event_id' => $event->id,
            'quantity' => $request->quantity,
            'status' => 'pending_payment',
            'expires_at' => now()->addMinutes(15),
        ]);
    });
}
\`\`\`

## Incident Response & Security Hardening

In early 2026, we repelled a malicious subdomain injection attack targeting legacy DNS records. By auditing our Cloudflare WAF policies, enabling strict DNSSEC, and enforcing zero-trust SSL certificates, we restored domain authority and improved overall site performance by 400%.

## Results

- **99.95% Uptime** across peak holiday seasons.
- **Over 50,000 digital tickets** successfully processed.
- **PageSpeed score jump** from 32 to 99 on Desktop and 96 on Mobile.
    `,
  },
  {
    slug: "building-resilient-payment-webhooks",
    title: "Building Resilient Payment Webhooks: Lessons from Midtrans Integration",
    excerpt:
      "How to design idempotent, fault-tolerant payment webhook receivers in production web applications to prevent double-charging and lost ticket dispatches.",
    date: "2025-11-20",
    readingTime: "5 min read",
    tags: ["Payments", "Laravel", "Webhooks", "Backend"],
    author: {
      name: "Muhammad Rifdan Dermawan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      role: "Full Stack Engineer",
    },
    content: `
# Building Resilient Payment Webhooks: Lessons from Midtrans Integration

Payment gateways like Midtrans use HTTP Webhooks to asynchronously inform your application when an order status changes (e.g. \`settlement\`, \`expire\`, or \`cancel\`). Network timeouts, duplicate HTTP requests, or server restarts can cause Webhooks to arrive out of order or multiple times.

## 1. Idempotency is Non-Negotiable

Every incoming webhook notification MUST check if the order status has already reached a terminal state before processing business logic.

\`\`\`php
public function handleMidtransNotification(Request $request)
{
    $signatureKey = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . config('midtrans.server_key'));

    if ($signatureKey !== $request->signature_key) {
        return response()->json(['message' => 'Invalid signature'], 403);
    }

    $order = Order::where('order_id', $request->order_id)->firstOrFail();

    // Check idempotency flag
    if ($order->is_paid) {
        return response()->json(['message' => 'Order already processed'], 200);
    }

    if ($request->transaction_status === 'settlement') {
        $order->update(['is_paid' => true, 'paid_at' => now()]);
        dispatch(new SendETicketJob($order));
    }

    return response()->json(['status' => 'success']);
}
\`\`\`

## Key Takeaways

1. **Verify Signatures**: Never trust raw payload parameters without validating the cryptographic signature key.
2. **Return 200 OK Fast**: Offload heavy background tasks (like PDF rendering and email dispatches) to background queues.
3. **Log Everything**: Maintain a dedicated \`payment_logs\` table for audit trails and debugging network anomalies.
    `,
  },
  {
    slug: "nextjs-15-threejs-performance-guide",
    title: "Optimizing React Three Fiber & 3D WebGL in Next.js 15 App Router",
    excerpt:
      "Practical techniques to achieve 60 FPS 3D canvas rendering without impacting First Contentful Paint or bundle size.",
    date: "2026-02-04",
    readingTime: "7 min read",
    tags: ["Next.js", "Three.js", "WebGL", "Performance", "Frontend"],
    author: {
      name: "Muhammad Rifdan Dermawan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      role: "Full Stack Engineer",
    },
    content: `
# Optimizing React Three Fiber & 3D WebGL in Next.js 15 App Router

Integrating 3D interactive graphics into a Next.js application creates visually memorable portfolios and landing pages. However, WebGL shaders, heavy 3D geometry models, and canvas animation loops can degrade mobile CPU performance if executed naively.

## Modern Performance Strategies

### 1. Dynamic Imports for Canvas Components
Never import React Three Fiber (\`@react-three/fiber\`) directly into your SSR bundle. Use \`next/dynamic\` with \`ssr: false\` to lazy-load heavy WebGL modules only on the client.

\`\`\`tsx
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/three/hero-canvas'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-zinc-950 animate-pulse" />,
});
\`\`\`

### 2. Device Pixel Ratio Capping
High-density displays (like 3K/4K Retina screens) can destroy GPU frame rates if rendered at full 1:1 pixel ratios. Always cap canvas DPR between 1 and 2:

\`\`\`tsx
<Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
  {/* 3D Scene Components */}
</Canvas>
\`\`\`

### 3. Reduced Motion Support
Respect users who configure \`prefers-reduced-motion: reduce\` in their OS settings by pausing 3D camera drift and continuous rotations.
    `,
  },
];
