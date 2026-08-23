import {
  pgTable,
  text,
  varchar,
  numeric,
  integer,
  bigint,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

// ─── productos ────────────────────────────────────────────────────────────────
export const productos = pgTable("productos", {
  clave:         text("clave").primaryKey(),
  descripcion:   text("descripcion"),
  existencia:    numeric("existencia"),
  precio:        numeric("precio"),
  actualizadoEn: timestamp("actualizado_en"),
});

// ─── clientes ─────────────────────────────────────────────────────────────────
export const clientes = pgTable("clientes", {
  id:           bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  nombre:       varchar("nombre"),
  domicilio:    varchar("domicilio"),
  codigoPostal: numeric("codigo_postal"),
  colonia:      varchar("colonia"),
  telefono:     numeric("telefono"),
  correo:       varchar("correo"),
  userId:       uuid("user_id").notNull(),   // → auth.users.id (Supabase)
  rol:          text("rol"),
});

// ─── pedidos ──────────────────────────────────────────────────────────────────
export const pedidos = pgTable("pedidos", {
  id:        bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userId:    uuid("user_id").notNull(),      // → auth.users.id (Supabase)
  total:     numeric("total").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  estado:    text("estado").notNull().default("pendiente"),
});

// ─── pedido_items ─────────────────────────────────────────────────────────────
export const pedidoItems = pgTable("pedido_items", {
  id:            bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  pedidoId:      bigint("pedido_id", { mode: "number" }).notNull(), // → pedidos.id
  productoClave: text("producto_clave").notNull(),                  // → productos.clave
  descripcion:   text("descripcion"),
  cantidad:      integer("cantidad").notNull(),
  precioUnitario: numeric("precio_unitario").notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type Producto    = typeof productos.$inferSelect;
export type NewProducto = typeof productos.$inferInsert;

export type Cliente     = typeof clientes.$inferSelect;
export type NewCliente  = typeof clientes.$inferInsert;

export type Pedido      = typeof pedidos.$inferSelect;
export type NewPedido   = typeof pedidos.$inferInsert;

export type PedidoItem    = typeof pedidoItems.$inferSelect;
export type NewPedidoItem = typeof pedidoItems.$inferInsert;
