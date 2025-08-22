import React from 'react';
import FacturaForm from '../components/facturacion/FacturaForm';

export default function FacturaPage() {
  return (
    <main className="main-content">
      <h2>Generar Factura</h2>
      <FacturaForm />
    </main>
  );
}