// Vérifie la disponibilité de l'API Contacts Picker
const getContactsButton = document.getElementById('getContacts');
const contactsTable = document.getElementById('contactsTable').getElementsByTagName('tbody')[0];

getContactsButton.addEventListener('click', async () => {
  if (!('contacts' in navigator && 'ContactsManager' in window)) {
    alert('Votre navigateur ne supporte pas l\'API Contacts Picker.');
    return;
  }

  try {
    const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: true });

    // Affiche les contacts et inspecte les propriétés
    contactsTable.innerHTML = ''; // Vide le tableau
    contacts.forEach(contact => {
      console.log(contact); // Ajoutez cette ligne pour voir la structure du contact
      const row = contactsTable.insertRow();
      const nameCell = row.insertCell(0);
      const phoneCell = row.insertCell(1);
      nameCell.textContent = contact.name || 'Nom inconnu';

      // Vérifie la structure de contact.tel
      const phone = contact.tel && Array.isArray(contact.tel) && contact.tel.length > 0 ? contact.tel[0] : 'Numéro inconnu';
      phoneCell.textContent = phone;
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des contacts :', error);
  }
});


// Enregistrement du Service Worker pour la PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker enregistré avec succès.'))
    .catch(error => console.error('Erreur lors de l\'enregistrement du Service Worker :', error));
}
