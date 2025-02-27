"use client";
import { useState } from "react";

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);
  const [showFactura, setShowFactura] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para eliminar un producto con confirmación
  const onDeleteProduct = (product) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este artículo?");
    if (confirmar) {
      const results = allProducts.filter((item) => item.id !== product.id);
      setTotal(total - product.price * product.quantity);
      setCountProducts(countProducts - product.quantity);
      setAllProducts(results);
    }
  };

  // Función para vaciar el carrito con confirmación
  const onCleanCart = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres vaciar el carrito?");
    if (confirmar) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  // Función para generar una factura
  const generarFactura = () => {
    if (allProducts.length === 0) {
      alert("El carrito está vacío. Agrega productos para generar una factura.");
      return;
    }
    setShowFactura(true); // Mostrar el modal de la factura
  };

  // Función para cerrar el modal de la factura
  const cerrarFactura = () => {
    setShowFactura(false);
  };

  return (
    <header>
      <h1>Digital Nexus</h1>
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <img
            src="data:image/png;base64,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"
            alt="carrito"
            className="icon-cart"
          />
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>
        <div className={`container-cart-products ${active ? "" : "hidden-cart"}`}>
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <img
                        src={product.urlImage} // Muestra la imagen del producto
                        alt={product.title}
                        className="imagen-producto-carrito"
                      />
                      <span className="cantidad-producto-carrito">
                        {product.quantity}
                      </span>
                      <p className="titulo-producto-carrito">{product.title}</p>
                      <span className="precio-producto-carrito">
                        ${product.price}
                      </span>
                    </div>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqxCBDv9HL-ufmBUdOy6gJjHEIHurLpDrDTg&s"
                      alt="cerrar"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>
              <button className="btn-clear-all" onClick={onCleanCart}>
                Vaciar Carrito
              </button>
              <button className="btn-generar-factura" onClick={generarFactura}>
                Generar Factura
              </button>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>

      {/* Modal de la factura */}
      {showFactura && (
        <div className="modal-factura">
          <div className="modal-contenido">
            <h2>Factura de Compra</h2>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.quantity}</td>
                    <td>${product.price}</td>
                    <td>${product.price * product.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total</td>
                  <td>${total}</td>
                </tr>
              </tfoot>
            </table>
            <button onClick={cerrarFactura}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
};