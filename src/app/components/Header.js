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
            src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
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