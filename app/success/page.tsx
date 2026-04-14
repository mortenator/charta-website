import { MARKETPLACE_URL } from "@/lib/constants";

export default function SuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Payment Received!</h1>
        <p className="text-white/60 mb-8 max-w-md">
          Thank you for your purchase. We've received your payment and are processing
          your subscription. You'll receive an email shortly once your Plus
          plan is active.
        </p>
        <a
          href={MARKETPLACE_URL}
          className="glass-button-purple py-3 px-6 rounded-2xl text-sm font-medium transition-all hover:scale-[1.02]"
        >
          Go to Charta Add-on
        </a>
      </div>
    </main>
  );
}
