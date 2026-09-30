import { Product } from "@/lib/mockData";

export interface InquiryLine { product: Product; quantity: number; size?: string; color?: string; }

export function buildInquiryMessage(lines: InquiryLine[]): string {
  const rows = lines.map(({ product, quantity, size, color }) => {
    const variants = [size ? `talle ${size}` : null, color ? `color ${color}` : null].filter(Boolean);
    const detail = variants.length ? ` · ${variants.join(" · ")}` : " · talle/color a consultar";
    return `• ${quantity} × ${product.nombre}${detail} — $${(product.precio * quantity).toLocaleString("es-AR")} ARS`;
  });
  const total = lines.reduce((sum, line) => sum + line.product.precio * line.quantity, 0);
  return `Hola, quisiera consultar disponibilidad de estas prendas:\n\n${rows.join("\n")}\n\nTotal de referencia: $${total.toLocaleString("es-AR")} ARS\n\nLos precios son ilustrativos. Esta consulta no reserva stock ni confirma una compra.`;
}
