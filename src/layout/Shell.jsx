import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRIMARY } from "@/constants/theme";

export default function Shell({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div
        className="fixed inset-x-0 top-0 -z-10 h-48 opacity-10"
        style={{
          background: `linear-gradient(90deg, ${PRIMARY}, transparent)`,
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
