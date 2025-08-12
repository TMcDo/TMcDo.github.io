document.addEventListener('DOMContentLoaded', () => {
    const taskbar = document.getElementById('taskbar');
    const windowsContainer = document.getElementById('windows-container');

    taskbar.addEventListener('click', (event) => {
        if (event.target.classList.contains('taskbar-icon')) {
            const appName = event.target.dataset.app;
            createWindow(appName);
        }
    });

    function createWindow(appName) {
        const windowDiv = document.createElement('div');
        windowDiv.classList.add('window');
        windowDiv.innerHTML = `
            <div class="window-header">
                <span>${appName}</span>
                <div class="window-controls">
                    <button class="minimize">_</button>
                    <button class="maximize">[]</button>
                    <button class="close">X</button>
                </div>
            </div>
            <div class="window-content">
                Contenu de l'application ${appName}
            </div>
        `;

        windowsContainer.appendChild(windowDiv);

        // Gérer le déplacement de la fenêtre
        dragElement(windowDiv);

        // Gérer les boutons de contrôle
        const closeButton = windowDiv.querySelector('.close');
        closeButton.addEventListener('click', () => {
            windowDiv.remove();
        });

        // Ajouter d'autres gestionnaires d'événements pour minimize et maximize
    }

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = elmnt.querySelector('.window-header');
        if (header) {
            // Si l'en-tête est présent, c'est l'endroit où vous déplacez l'élément :
            header.onmousedown = dragMouseDown;
        } else {
            // Sinon, déplacez l'élément à partir de n'importe où à l'intérieur de l'élément :
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // Obtenir la position du curseur de la souris au démarrage :
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // Appeler une fonction chaque fois que le curseur se déplace :
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calculer la nouvelle position du curseur :
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Définir la nouvelle position de l'élément :
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // Arrêter de bouger quand le bouton de la souris est relâché :
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});
