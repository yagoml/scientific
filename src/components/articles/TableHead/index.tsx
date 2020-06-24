import React from 'react'

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th className="col-med">Autores</th>
        <th className="col-small">Tipo</th>
        <th>Título</th>
        <th>Descrição</th>
        <th style={{ width: '160px' }}>Documento (URL)</th>
        <th className="col-small">Favorito</th>
      </tr>
    </thead>
  )
}

export default TableHead
