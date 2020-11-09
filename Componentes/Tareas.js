class Tareas {
    constructor(tareasNueva) {
        this.tareasNueva = tareasNueva;
    }

    render = () => {

        let component = document.createElement('div');

        component.className = 'tareaAgregada';

        let tareaAgregada = document.createElement('div');
        tareaAgregada.innerHTML = this.tareasNueva.DescripcionTarea;

        //boton de eliminar 
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.innerHTML = 'X';

        //boton next
        let nextBtn = document.createElement('button');
        nextBtn.className = 'nextBtn';
        nextBtn.innerHTML = '>';

        //boton previous
        let previousBtn = document.createElement('button');
        previousBtn.className = 'previousBtn';
        previousBtn.innerHTML = '<';

        component.appendChild(tareaAgregada);
        component.appendChild(deleteBtn);
        component.appendChild(nextBtn);
        component.appendChild(previousBtn);

        //elimino tarea
        deleteBtn.addEventListener('click', () => {
            let database = firebase.database();
            database.ref('Tareas/' + this.tareasNueva.id).set(null);
        });

        return component;

    }


}