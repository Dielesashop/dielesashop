import styled from "styled-components";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  onAdd: (clave: string) => void;
}

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
    color: #6366f1;
    font-family: monospace;
  }

  .title {
    font-size: 0.78em;
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
    margin-top: 4px;
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
    color: #b91c1c;
  }

  .card-btn {
    margin-top: 4px;
    width: 100%;
    height: 40px;
    background-color: rgb(24, 24, 24);
    border: none;
    border-radius: 40px;
    color: white;
    transition: all 0.3s;
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
    background-color: greenyellow;
    color: rgb(35, 35, 35);
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
`;

export function ProductCard({ product, onAdd }: Props) {
  const inStock = (product.existencia ?? 0) > 0;
  const initials = product.clave.split("-")[0] ?? "???";

  return (
    <StyledWrapper>
      <div className="card">
        {/* Imagen / iniciales */}
        <div className="wrapper">
          <div className="card-image">{initials}</div>

          {/* Contenido */}
          <div className="content" style={{ width: "100%" }}>
            <p className="product-key">{product.clave}</p>
            <p className="title">{product.descripcion ?? "Sin descripción"}</p>

            <div className="price-row" style={{ width: "100%" }}>
              <span className="price">
                $
                {(product.precio ?? 0).toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className={`stock-badge ${inStock ? "in-stock" : "out-stock"}`}>
                {inStock ? `${product.existencia} en stock` : "Agotado"}
              </span>
            </div>

            {product.actualizado_en && (
              <p
                style={{
                  fontSize: "0.65em",
                  color: "#adadad",
                  marginTop: "2px",
                }}
              >
                Actualizado:{" "}
                {new Date(product.actualizado_en).toLocaleDateString("es-MX")}
              </p>
            )}
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

        {/* Badge de stock como tag */}
        {inStock && <p className="tag">Disponible</p>}
      </div>
    </StyledWrapper>
  );
}
