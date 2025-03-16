document.addEventListener('DOMContentLoaded', () => {
    const animaux = [
        { id: 1, nom: 'Chien', prix: 300, stock: 10, image: 'chien.jpg' },
        { id: 2, nom: 'Chat', prix: 250, stock: 5, image: 'chat.jpg' },
        { id: 3, nom: 'Sugar Glider', prix: 450, stock: 8, image: 'sugar-glider.jpg' },
        { id: 4, nom: 'Poisson', prix: 150, stock: 20, image: 'poisson.jpg' },
    ];

    const nourriture = [
        { id: 1, nom: 'Croquettes pour chiens', prix: 45, stock: 10, image: 'croquettes.jpg' },
        { id: 2, nom: 'Humides chiens', prix: 15, stock: 10, image: 'humides.jpg' },
        { id: 3, nom: 'Récompenses chiens', prix: 5, stock: 10, image: 'recompenses.jpg' },
        { id: 4, nom: 'Compléments alimentaires chiens', prix: 150, stock: 10, image: 'complements.jpg' },
    ];

    const produits = [
        { id: 1, nom: 'Jouets chiens', prix: 25, stock: 10, image: 'jouets.jpg' },
        { id: 2, nom: 'Laisses', prix: 35, stock: 10, image: 'laisses.jpg' },
        { id: 3, nom: 'Couchage', prix: 55, stock: 10, image: 'couchage.jpg' },
        { id: 4, nom: 'Gamelles & Distributeurs', prix: 50, stock: 10, image: 'gamelles.jpg' },
    ];

    const sectionAnimaux = document.getElementById('animaux');
    const sectionNourriture = document.getElementById('nourriture');
    const sectionProduits = document.getElementById('produits');
    const panierContenu = document.getElementById('panier-contenu');
    const totalElement = document.getElementById('total');

    let panier = [];

    // Afficher les produits disponibles
    function afficherProduits() {
        sectionAnimaux.innerHTML = '';
        sectionNourriture.innerHTML = '';
        sectionProduits.innerHTML = '';

        animaux.forEach(animal => {
            const div = document.createElement('div');
            div.innerHTML = `
                <img src="images/${animal.image}" alt="${animal.nom}">
                <h3>${animal.nom}</h3>
                <p>Prix: ${animal.prix}€</p>
                <p>Stock: <span id="stock-${animal.nom.toLowerCase().replace(/ /g, '-')}" class="stock">${animal.stock}</span></p>
                <input type="number" id="quantite-${animal.nom.toLowerCase().replace(/ /g, '-')}" value="1" min="1" max="${animal.stock}" />
                <button onclick="ajouterAuPanier('${animal.nom}', ${animal.prix}, document.getElementById('quantite-${animal.nom.toLowerCase().replace(/ /g, '-')}).value)">Ajouter au panier</button>
            `;
            sectionAnimaux.appendChild(div);
        });

        // Répéter pour nourriture et produits...
    }

    // Fonction pour ajouter un produit au panier
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

        // Vérifier si le produit est déjà dans le panier
        const produitExistant = panier.find(item => item.nom === nom);

        if (produitExistant) {
            // Si le produit existe déjà, mettre à jour la quantité et le prix total
            produitExistant.quantite += quantiteInt;
            produitExistant.prixTotal = produitExistant.quantite * prix;
        } else {
            // Sinon, ajouter un nouvel élément au panier
            panier.push({
                nom: nom,
                prixUnitaire: prix,
                quantite: quantiteInt,
                prixTotal: quantiteInt * prix
            });
        }

        // Mettre à jour l'affichage du panier
        afficherPanier();
    };

    // Fonction pour afficher le panier
    function afficherPanier() {
        panierContenu.innerHTML = '';
        let totalGeneral = 0;

        panier.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${item.nom} - ${item.quantite} x ${item.prixUnitaire}€ = ${item.prixTotal}€</p>
            `;
            panierContenu.appendChild(div);
            totalGeneral += item.prixTotal;
        });

        // Afficher le total général
        totalElement.innerText = `Total: ${totalGeneral}€`;
    }

    // Initialisation
    afficherProduits();
});