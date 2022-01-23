require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
  menu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas')

const main = async() => {
  
  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    opt = await menu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción: ');
        tareas.createTarea( desc );        
        break;
      case '2':
        tareas.listadoCompletado();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case '6':
        const id = await listadoTareasBorrar( tareas.listadoArr );
        if( id !== '0') {
          const ok = await confirmar("Estas seguro");
          if (ok) {
            tareas.borrarTareas(id);
            console.log('Tarea borrada');
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
    
  } while (opt !== '0');

}

main();