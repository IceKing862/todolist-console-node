const Tarea = require('./tarea');
require('colors');

class Tareas {

  get listadoArr () {
    const listado = [];

    Object.keys(this._listado).forEach( key => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTareas(id = '') {

    if (this._listado[id]) {
      delete this._listado[id];
    }

  }

  cargarTareasFromArray( tareas = [] ) {
    tareas.forEach( tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  createTarea( desc = '' ) {

    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompletado() {
    console.log();

    this.listadoArr.forEach( (tarea, index) => {
      const idx = `${index + 1}`.green;
      const {desc, completadoEn} = tarea;
      const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;

      console.log(`${idx}. ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas( completadas = true ) {

    console.log();

    this.listadoArr.filter(tarea => {
      if (completadas) {
        return tarea.completadoEn !== null;
      } else {
        return tarea.completadoEn === null;
      }
    }).forEach( (tarea, index) => {
      const idx = `${index + 1}`.green;
      const {desc, completadoEn} = tarea;
      const estado = (completadoEn) ? completadoEn : 'Pendiente'.red;

      console.log(`${idx}. ${desc} :: ${estado}`);
    }) 
  }

  toggleCompletadas( ids = []) {
    ids.forEach(id => {

      const tarea = this._listado[id];
      if(!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea => {

      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}

module.exports = Tareas;