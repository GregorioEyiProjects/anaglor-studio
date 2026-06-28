return (
  <div>
    <table>
      <thead>
        <tr>
          <th>hora</th>
          {DIAS_SEMANA.map((dia) => (
            <th key={dia}>{dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {DIAS_SEMANA.map((fila, index) => (
          <tr key={index}>
            <td>{fila.hora}</td>
            {DIAS_SEMANA.map((dia) => {
              const clasesEnDia = fila.dias[dia] ?? [];

              return (
                <td key={dia}>
                  {clasesEnDia.length === 0 ? (
                    <span> - </span>
                  ) : (
                    <div>
                      {clasesEnDia.map((clase, index) => (
                        <span key={index}>{clase.nombre}</span>
                      ))}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
