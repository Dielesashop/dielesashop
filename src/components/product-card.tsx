"use client";

import { useState } from "react";
import styled from "styled-components";
import type { Product } from "@/lib/products";
import { precioNeto } from "@/lib/products";

interface Props {
  product: Product;
  onAdd: (clave: string) => void;
}

/* ─── Estilos ─── */
const StyledWrapper = styled.div`
  .card {
    width: 100%;
    background: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
  }

  .wrapper {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .card-image {
    width: 100%;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2em;
    font-weight: 900;
    font-family: monospace;
    color: #1a1a1a;
    transition: all 0.3s;
    text-align: center;
    padding: 0 8px;
    overflow: hidden;
    line-height: 1.2;
    cursor: pointer;
    border-radius: 8px;
  }

  .card-image:hover {
    opacity: 0.85;
  }

  .zoom-hint {
    font-size: 0.55em;
    color: #888;
    font-family: sans-serif;
    font-weight: 400;
    margin-top: 4px;
    display: block;
    letter-spacing: 0.04em;
  }

  .content {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .product-key {
    font-size: 0.68em;
    text-transform: uppercase;
    font-weight: 700;
    color: #ff6d1f;
    font-family: monospace;
  }

  .title {
    font-size: 0.9em;
    text-transform: uppercase;
    font-weight: 500;
    color: #4d4d4d;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-top: 20px;
  }

  .price {
    font-size: 1.1em;
    font-weight: 700;
    color: #1a1a1a;
  }

  .stock-badge {
    font-size: 0.68em;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
    margin-left: auto;
  }

  .in-stock {
    background-color: #dcfce7;
    color: #15803d;
  }

  .out-stock {
    background-color: #fee2e2;
    color: #ff6d1f;
  }

  .card-btn {
    margin-top: 4px;
    width: 100%;
    height: 40px;
    background-color: rgb(24, 24, 24);
    border: none;
    border-radius: 40px;
    color: white;
    transition: all 0.5s;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.78em;
    letter-spacing: 0.03em;
  }

  .card-btn:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }

  .card:hover .card-image {
    height: 90px;
    font-size: 1.6em;
  }

  .card:hover .card-btn:not(:disabled) {
    margin-top: 0;
  }

  .card-btn:not(:disabled):hover {
    background-color: #ff6d1f;
    color: rgb(255, 255, 255);
  }

  .card:hover {
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .tag {
    position: absolute;
    background-color: #ff6d1f;
    color: rgb(0, 0, 0);
    left: 12px;
    top: 12px;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.72em;
    font-weight: 600;
  }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    backdrop-filter: blur(4px);
  }

  .modal-box {
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    max-width: 520px;
    width: 100%;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  }

  .modal-close {
    position: absolute;
    top: 12px;
    right: 14px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #555;
    line-height: 1;
  }

  .modal-close:hover {
    color: #ff6d1f;
  }

  .modal-title {
    font-size: 0.78em;
    font-weight: 700;
    color: #ff6d1f;
    font-family: monospace;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .modal-desc {
    font-size: 0.88em;
    color: #333;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 16px;
    line-height: 1.3;
  }

  .modal-main-img {
    width: 100%;
    height: 220px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5em;
    font-weight: 900;
    font-family: monospace;
    margin-bottom: 12px;
    transition: background 0.3s;
  }

  .modal-thumbs {
    display: flex;
    gap: 10px;
  }

  .modal-thumb {
    flex: 1;
    height: 80px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4em;
    font-weight: 900;
    font-family: monospace;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border 0.2s, opacity 0.2s;
    opacity: 0.7;
  }

  .modal-thumb:hover {
    opacity: 1;
  }

  .modal-thumb.active {
    border: 2px solid #ff6d1f;
    opacity: 1;
  }
`;

/* Paleta de 3 "vistas" del producto */
const VIEWS = [
  { bg: "#e8f4fd", color: "#1a5276", label: "Vista frontal" },
  { bg: "#fef9e7", color: "#7d6608", label: "Vista lateral" },
  { bg: "#f9ebea", color: "#922b21", label: "Vista trasera" },
];

export function ProductCard({ product, onAdd }: Props) {
  const inStock = (product.existencia ?? 0) > 0;
  const initials = product.clave.split("-")[0] ?? "???";
  const [modalOpen, setModalOpen] = useState(false);
  const [activeView, setActiveView] = useState(0);

  return (
    <StyledWrapper>
      <div className="card">
        <div className="wrapper">
          {/* Imagen / iniciales — clic abre modal */}
          <div
            className="card-image"
            style={{ background: "#e8e8e8" }}
            onClick={() => setModalOpen(true)}
            title="Ver detalles"
          >
            {initials}
          </div>

          {/* Contenido */}
          <div className="content" style={{ width: "100%" }}>
            <p className="product-key">{product.clave}</p>
            <p className="title">{product.descripcion ?? "Sin descripción"}</p>

            <div className="price-row" style={{ width: "100%" }}>
              <span className="price">
                $
                {precioNeto(product.precio ?? 0).toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                className={`stock-badge ${inStock ? "in-stock" : "out-stock"}`}
              >
                {inStock ? `${product.existencia} en stock` : "Agotado"}
              </span>
            </div>
          </div>

          {/* Botón */}
          <button
            className="card-btn"
            onClick={() => inStock && onAdd(product.clave)}
            disabled={!inStock}
          >
            {inStock ? "AGREGAR AL CARRITO" : "AGOTADO"}
          </button>
        </div>

        {/* Badge disponible */}
        {/* {inStock && <p className="tag">Disponible</p>} */}
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <p className="modal-title">{product.clave}</p>
            <p className="modal-desc">
              {product.descripcion ?? "Sin descripción"}
            </p>

            {/* Imagen principal */}
            <div
              className="modal-main-img"
              style={{
                background: VIEWS[activeView]!.bg,
                color: VIEWS[activeView]!.color,
              }}
            >
              {initials}
            </div>

            {/* Miniaturas */}
            <div className="modal-thumbs">
              {VIEWS.map((v, i) => (
                <div
                  key={i}
                  className={`modal-thumb ${activeView === i ? "active" : ""}`}
                  style={{ background: v.bg, color: v.color }}
                  onClick={() => setActiveView(i)}
                  title={v.label}
                >
                  {initials}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
}
