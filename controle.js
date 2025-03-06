document.addEventListener('DOMContentLoaded', () => {
    const animaux = [
        { id: 1, nom: 'Chien', prix: 300, stock: 10 },
        { id: 2, nom: 'Chat', prix: 250, stock: 5 },
        { id: 3, nom: 'Sugar Glider', prix: 450, stock: 8 },
        { id: 4, nom: 'Poisson', prix: 150, stock: 20 },
    ];

    const nourriture = [
        { id: 1, nom: 'Croquettes pour chiens', prix: 45, stock: 10 },
        { id: 2, nom: 'Humides chiens',        prix: 15, stock: 10 },
        { id: 3, nom: 'Récompenses chiens', prix: 5, stock: 10 },
        { id: 4, nom: 'Compléments alimentaires chiens', prix: 150, stock: 10 },
    ];

    const produits = [
        { id: 1, nom: 'Jouets chiens', prix: 25, stock: 10 },
        { id: 2, nom: 'Laisses', prix: 35, stock: 10 },
        { id: 3, nom: 'Couchage', prix: 55, stock: 10 },
        { id: 4, nom: 'Gamelles & Distributeurs', prix: 50, stock: 10 },
        { id: 5, nom: 'Shampoing', prix: 14, stock: 10 },
        { id: 6, nom: 'Parfums', prix: 17, stock: 10 },
        { id: 7, nom: 'Hygiènes', prix: 47, stock: 10 },
    ];

    const sectionAnimaux = document.getElementById('animaux');
    const sectionNourriture = document.getElementById('nourriture');
    const sectionProduits = document.getElementById('produits');
    const panierContenu = document.getElementById('panier-contenu');
    const totalElement = document.getElementById('total');

    let panier = [];

    function afficherProduits() {
        sectionAnimaux.innerHTML = '';
        sectionNourriture.innerHTML = '';
        sectionProduits.innerHTML = '';

        animaux.forEach(animal => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${animal.nom}</h3>
                             <p>Prix: ${animal.prix}€</p>
                             <p>Stock: <span id="stock-${animal.nom.toLowerCase().replace(/ /g, '-')}" class="stock">${animal.stock}</span></p>
                             <input type="number" id="quantite-${animal.nom.toLowerCase().replace(/ /g, '-')}" value="1" min="1" max="${animal.stock}" />
                             <button onclick="ajouterAuPanier('${animal.nom}', ${animal.prix}, document.getElementById('quantite-${animal.nom.toLowerCase().replace(/ /g, '-')}).value)">Ajouter au panier</button>`;
            sectionAnimaux.appendChild(div);
        });

        nourriture.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${item.nom}</h3>
                             <p>Prix: ${item.prix}€</p>
                             <p>Stock: <span id="stock-${item.nom.toLowerCase().replace(/ /g, '-')}" class="stock">${item.stock}</span></p>
                             <input type="number" id="quantite-${item.nom.toLowerCase().replace(/ /g, '-')}" value="1" min="1" max="${item.stock}" />
                             <button onclick="ajouterAuPanier('${item.nom}', ${item.prix}, document.getElementById('quantite-${item.nom.toLowerCase().replace(/ /g, '-')}).value)">Ajouter au panier</button>`;
            sectionNourriture.appendChild(div);
        });

        produits.forEach(produit => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${produit.nom}</h3>
                             <p>Prix: ${produit.prix}€</p>
                             <p>Stock: <span id="stock-${produit.nom.toLowerCase().replace(/ /g, '-')}" class="stock">${produit.stock}</span></p>
                             <input type="number" id="quantite-${produit.nom.toLowerCase().replace(/ /g, '-')}" value="1" min="1" max="${produit.stock}" />
                             <button onclick="ajouterAuPanier('${produit.nom}', ${produit.prix}, document.getElementById('quantite-${produit.nom.toLowerCase().replace(/ /g, '-')}).value)">Ajouter au panier</button>`;
            sectionProduits.appendChild(div);
        });
    }

    window.ajouterAuPanier = function(nom, prix, quantite) {
        const stockElement = document.querySelector(`#stock-${nom.toLowerCase().replace(/ /g, '-')}`);
        const stock = parseInt(stockElement.innerText);
        const quantiteInt = parseInt(quantite);

       if (quantiteInt > stock) {
            alert("Quantité demandée supérieure au stock disponible.");
            return;
        }

        // Mettre à jour le stock
        stockElement.innerText = stock - quantiteInt;

        // Ajouter l'article au panier
        const item = { nom, prix, quantite: quantiteInt };
        panier.push(item);
        afficherPanier();
    };

    function afficherPanier() {
        panierContenu.innerHTML = '';
        let total = 0;

        panier.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `${item.nom} - ${item.quantite} x ${item.prix}€ = ${item.quantite * item.prix}€`;
            panierContenu.appendChild(div);
            total += item.quantite * item.prix;
        });

        totalElement.innerText = `Total: ${total}€`;
    }

    // Initialiser l'affichage des produits
    afficherProduits();
});