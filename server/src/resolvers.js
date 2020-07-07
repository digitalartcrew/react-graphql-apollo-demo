 const contacts = [
		{ id: 1, firstName: "Nick", lastName: "Burney" },
		{ id: 2, firstName: "Donte", lastName: "Burney" },
		{ id: 3, firstName: "Khalon", lastName: "Burney" },
 ];

 export const resolvers = {
   Query: {
     contacts: () => contacts
   },
   Mutation: {
     addContact: (root, args) => {
       const newId = require('crypto').randomBytes(5).toString('hex');
       const newContact = { id: newId, firstName: args.firstName, lastName: args.lastName};
       contacts.push(newContact);
       
       return newContact;
     }
   }
 };