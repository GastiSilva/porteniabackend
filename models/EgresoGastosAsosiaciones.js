import Egresos from './Egresos.js';
import Gastos from './Gastos.js';
import TipoGastos from './TipoGastos.js';

// Egresos → tiene muchos Gastos
Egresos.hasMany(Gastos, {
  foreignKey: 'Id_Egresos',
  sourceKey: 'Id_Egresos'
});

// Gastos → pertenece a Egresos
Gastos.belongsTo(Egresos, {
  foreignKey: 'Id_Egresos',
  targetKey: 'Id_Egresos'
});

// Gastos → pertenece a TipoGastos
Gastos.belongsTo(TipoGastos, {
  foreignKey: 'Id_TipoGastos',
  targetKey: 'Id_TipoGastos'
});

TipoGastos.hasMany(Gastos, {
  foreignKey: 'Id_TipoGastos',
  sourceKey: 'Id_TipoGastos'
});

export { Egresos, Gastos, TipoGastos };